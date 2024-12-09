/* eslint-disable no-undef */
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ROLES } from '../config/roles.js';

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name field is required'],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'email field is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'please provide a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'password field is required'],
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
        default: ROLES.USER
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
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})
UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}


// Confirmation Password
UserSchema.pre("validate", function () {
    if (this.confirmPassword) {
        this.confirmPassword = undefined
    }
})


// Generate Access Token for Login
UserSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email
    }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_JWT_EXPIRY })
}


// Refresh Token Without Login Again
UserSchema.methods.refreshAccessToken = function () {
    return jwt.sign({
        _id: this._id,
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })
}


const User = mongoose.model("UserInfo", UserSchema)
export { User }