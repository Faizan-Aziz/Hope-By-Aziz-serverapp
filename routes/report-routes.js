import express from 'express';
import { authenticationMiddleware } from "../middleware/middleware.js";
import { CampaignModel } from "../models/campaign-model.js";
import { DonationModel } from '../models/donation-model.js';
import { Usermodel } from '../models/user-model.js';

const router = express.Router();

router.get('/admin-reports', authenticationMiddleware, async (req, res) => {
    try {
        const [totalUser, totalCampaign, donations] = await Promise.all([
            Usermodel.countDocuments({}),
            CampaignModel.countDocuments({}),
            DonationModel.find({}).populate('campaign').populate('user').sort({createdAt: -1}) || [] // Fallback to empty array
        ]);

        const response = {
            totalUser,
            totalCampaign,
            totalDonation: donations.length,
            totalAmount: donations.reduce((acc, donation) => acc + (donation.amount ), 0),
            lastFiveDonation: donations.slice(-5)
        };

        return res.status(200).json(response); // Send response

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get('/user-reports/:id', authenticationMiddleware, async (req, res) => {
    try {
        const [totalCampaign, donations] = await Promise.all([
            CampaignModel.countDocuments({}),
            DonationModel.find({user:req.params.id}).populate('campaign').sort({createdAt: -1}) || [] // Fallback to empty array
        ]);

        const response = {
            totalCampaign,
            totalDonation: donations.length,
            totalAmount: donations.reduce((acc, donation) => acc + (donation.amount ), 0),
            lastFiveDonation: donations.slice(-5)
        };

        return res.status(200).json(response); // Send response

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router;