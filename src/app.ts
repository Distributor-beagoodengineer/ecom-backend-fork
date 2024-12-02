import express from 'express';
import { connectDB } from './utils/features.js';
import { errorMiddleware } from './middlewares/error.js';
import { createServer } from 'http'; // Import to create HTTP server
import NodeCache from 'node-cache';
import {config} from 'dotenv';
import morgan from 'morgan';
import Stripe from 'stripe';
import cors from 'cors';
import {v2 as cloudinary} from 'cloudinary';
import {Cashfree} from 'cashfree-pg';

// Importing Routes
import userRoute from './routes/user.route.js';
import productRoute from './routes/products.route.js';
import orderRoute from './routes/orders.route.js';
import paymentRoute from './routes/payment.route.js';
import dashboardRoute from './routes/stats.route.js';

config({
    path: "./.env"
})

// Basic variables confid
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || "";
const stripeKey = process.env.STRIPE_KEY || "";
const clientURL = process.env.CLIENT_URL || "";

connectDB(mongoURI);

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// Cashfree config
Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.PRODUCTION;
Cashfree.XEnableErrorAnalytics = false;

export const stripe = new Stripe(stripeKey);
export const myCache = new NodeCache();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));

app.use(
    cors({
    origin: [clientURL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.get("/", (req, res) => {
    res.send("API is Working with /api/v1");
})

// Using Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/dashboard", dashboardRoute);

app.use("/uploads", express.static("uploads")); // Whenever I go to /uploads/anything route, it opens image from 'uploads' folder
app.use(errorMiddleware);


// Listen on the same port
app.listen(port, () => {
    console.log(`Server is working on localhost:${port}`);
});