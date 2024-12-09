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
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "script-src 'self' 'unsafe-inline' https://js.stripe.com"
    );
    next();
});

import userRoute from './routes/userRoute.js';
app.use('/user', userRoute);

// Handle 404 errors for unmatched routes
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Route not found",
    });
});
app.use(errorHandler);

export { app };
