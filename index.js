import express from "express"
import dotenv from "dotenv";
import connectMongoDB from "./config/db-config.js";
import userrouter from "./routes/user-route.js"; // Import the routes file
import cookieParser from "cookie-parser";
import campaignrouter from "./routes/campaigns-route.js"
import paymentrouter from "./routes/payment-route.js"
import donationRoutes from './routes/donation-route.js'
import reportroutes from   './routes/report-routes.js'


const app = express()
const port =5000;

dotenv.config(); // ✅ Load environment variables BEFORE using them
connectMongoDB(); // ✅ Now process.env.DATABASE_URL is available


app.use(express.json()); // Middleware to parse JSON request body 
app.use(cookieParser());


// Use the userRoutes for all routes starting with '/user'
app.use('/user', userrouter); // This means the routes will be like /user/RegisterPage, /user/Login

//this is the campaignrouter
app.use('/api/campaigns', campaignrouter)

//this is the donationrotes
app.use('/api/payments' , paymentrouter)

//this is the donationrotes
app.use('/api/donations' , donationRoutes)

//this is the reportroutes
app.use('/api/reports' , reportroutes)





app.listen(port, () => {
  console.log(`Node + Express server is succefull ${port}`)
})
