/* eslint-disable no-undef */
import jwt from 'jsonwebtoken'
import { Company } from "../models/companyModel.js";

import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// Generate Access & Refresh Token of Company
const generateAccessTokenAndRefreshToken = async (tokenId) => {
    const company = await Company.findById(tokenId);
    if (!company) throw new apiError(404, "Company not found");

    const accessToken = company.generateAccessToken();
    const refreshToken = company.refreshAccessToken();

    company.refreshToken = refreshToken;
    await company.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
}


// To Refresh company Login Access Token
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
        throw new apiError(401, "UnAuthorized Request")
    }
    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET
        )
        const company = await Company.findById(decodedToken._id).select("-password");
        if (!company) {
            throw new apiError(401, "Invalid Refresh Token")
        }
        if (incomingRefreshToken !== company?.refreshToken) {
            throw new apiError(401, "Invalid or Expires Refresh Token")
        }

        // const options = {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'Strict',
        // }
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'Strict',
            maxAge: 12 * 24 * 60 * 60 * 1000, // 12 days in milliseconds
        };
        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(company?._id);
        console.log("Successfully refreshed The AccessToken", accessToken)

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new apiResponse(200, { accessToken, refreshToken }, "Access Token Refreshed Successfukky"))
    } catch (error) {
        console.error("Error from refreshAccessToken", error);

        if (error.name === "TokenExpiredError") {
            // Clear refresh token from database and cookies
            const decodedToken = jwt.decode(incomingRefreshToken);
            if (decodedToken?._id) {
                const company = await Company.findById(decodedToken._id);
                if (company) {
                    company.refreshToken = null;
                    await company.save();
                }
            }
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
        }
        return res.status(401).json({ message: "Refresh Token Expired" })
        // throw new apiError(401, error?.message || "Refresh Token Expired or Invalid");
    }
})



// To Register a Person
const registerCompany = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const existedCompany = await Company.findOne({ $or: [{ email }, { name }] });
    if (existedCompany) {
        return res.status(400).json({ error: "Company with given credentials already exists" });
    }
    const registerCompany = await Company.create({ name, email, password });
    const createdCompany = await Company.findById(registerCompany._id).select("-password -refreshToken");

    if (!createdCompany) {
        throw new Error("Something went wrong while registering the company");
    }
    return res.status(200).json({
        message: "Company registered successfully",
        company: createdCompany,
    });
});



// To Login a Person
const loginCompany = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if ((!name || !email) && !password) {
        throw new apiError(404, "All fields are required")
    }
    const company = await Company.findOne({ $or: [{ name }, { email }] });
    if (!company) {
        throw new apiError(404, "Company not found");
    }
    const isPasswordCorrect = await company.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new apiError("Password is incorrect");
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(company._id);
    const loggedInCompany = await Company.findById(company._id).select("-password")
    // const options = {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: 'Strict',
    // };
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'Strict',
        maxAge: 12 * 24 * 60 * 60 * 1000,
    };
    return res.status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(
            new apiResponse(200, {
                company: loggedInCompany,
                accessToken,
                refreshToken,
            }, "Company logged in successfully")
        );
});



// To Logout a Person
const logoutCompany = asyncHandler(async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true
    }
    res.clearCookie('accessToken', options)
    res.clearCookie('refreshToken', options)
    return res.status(200).json(
        new apiResponse(200, true, "Company logged out successfully")
    )
})



// To get Logged In company Details
const getCompanyData = asyncHandler(async (req, res) => {
    const company = await Company.findById(req.company.id).select("-password");
    res.status(200).json(
        new apiResponse(200, company, "Company data fetched successfully")
    )
})



// Get Data of Logged In Company
const getAllData = asyncHandler(async (req, res) => {
    const data = await Company.find();
    if (data.length === 0) {
        throw new apiError(404, "No company found");
    }
    return res.status(200).json(
        new apiResponse(200, data, "Data Fetched Successfully")
    )
})


// For The Testing Purpose To Get the Company Data
const getCompanyProfile = asyncHandler(async (req, res) => {
    const token = req.cookies?.accessToken;
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        const findCompany = await Company.findById(verify._id).select("-password -refreshToken");
        if (!findCompany) {
            throw new apiError(404, "Company Not Found!");
        }
        res.status(200).json(new apiResponse(200, findCompany, "Company data fetched successfully!"));
    } catch (error) {
        console.log("ERROR from (CompanyController.js) getCompanyProfile", error)
    }
})


export {
    registerCompany,
    loginCompany,
    getAllData,
    logoutCompany,
    refreshAccessToken,
    getCompanyData,
    getCompanyProfile
}