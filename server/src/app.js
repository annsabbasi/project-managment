/* eslint-disable no-undef */
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credientials: true
}))

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());


export { app }