import {authenticationMiddleware} from "../middleware/middleware.js"
import express from 'express' 
import Stripe from 'stripe';
const router =express.Router();
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Initialize Stripe



router.post("/create-payment-intent",authenticationMiddleware,async(req,res) =>{

    try {

        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount *100, //what ever the payment user enter the stripe accept it in the cent so make sure to multiply it 100 so that it is equal to the dollar
            currency: 'usd',
            automatic_payment_methods: {
              enabled: true,
            },
            description : "Hope-By-Aziz",
          });

          res.status(200).json({ clientSecret: paymentIntent.client_secret });
        //  The clientSecret is a unique string that represents the PaymentIntent on the client side.
        //  It is used to securely confirm the payment on the frontend without exposing sensitive information like your Stripe secret key.

    } catch (error) {
        
        return res.status(500).json({message: error.message})

    }

})

export default router;

