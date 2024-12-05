/* eslint-disable no-undef */
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    // methods: ['GET', 'POST'],
    credentials: true,
}));

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

// The Routes are imported & used here...
import userRoute from './routes/userRoute.js'
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "script-src 'self' 'unsafe-inline' https://js.stripe.com"
    );
    next();
});

app.use('/user', userRoute)

export { app }