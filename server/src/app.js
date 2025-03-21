/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN.split(","),
    credentials: true,
}));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

// For the Stripe
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "script-src 'self' 'unsafe-inline' https://js.stripe.com"
    );
    next();
});


// Routing of the App Starts Here...
import userRoute from './routes/userRoute.js';
import superAdminRoute from './routes/superAdminRoutes.js';

app.use('/user', userRoute);
app.use('/admin', superAdminRoute);
app.get("/", (req,res) => {
    res.status(200).send("Working successfull!")
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        message,
    });
});


app.use(errorHandler);

export { app };