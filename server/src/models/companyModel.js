/* eslint-disable no-undef */
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ROLES } from '../config/roles.js';

const CompanySchema = new Schema({
    companyName: {
        type: String,
        required: [true, 'Company name field is required'],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email field is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password field is required'],
    },
    confirmPassword: {
        type: String,
        select: false
    },
    avatar: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQNvWDvQb_rCtRL-p_w329CtzHmfzfWP0FIw&s'
    },
    JoinedOn: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        enum: Object.values(ROLES),
        default: ROLES.ADMIN
    },
    plan: {
        type: String,
        enum: ['basic', 'standard', 'premium', 'null'],
        default: 'null',
        required: true
    },
    requestedAt: {
        type: Date,
        default: Date.now
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true })


// Hashing Bcrypt Password 
CompanySchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})
CompanySchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}


// Confirmation Password
CompanySchema.pre("validate", function () {
    if (this.confirmPassword) {
        this.confirmPassword = undefined
    }
})


// Generate Access Token for Login
CompanySchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        companyName: this.companyName,
        email: this.email
    }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_JWT_EXPIRY })
}


// Refresh Token Without Login Again
CompanySchema.methods.refreshAccessToken = function () {
    return jwt.sign({
        _id: this._id,
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })
}


const Company = mongoose.model("CompanyInfo", CompanySchema)
export { Company }