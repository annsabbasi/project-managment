/* eslint-disable no-undef */
import { userPlan } from "../models/userPlans.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Stripe from 'stripe'

const stripe = Stripe("-------Add you Stripe SECRET_KEY HERE!!!------")

const createSubscriptionCheckout = asyncHandler(async (req, res) => {
    const { plan, price, features } = req.body;
    // const value = req.body; 
    console.log("This is the createSubscriptionCheckoit", plan, price, features)


    try {
        const session = await stripe.checkout.session.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: { name: plan },
                        unit_amount: price * 100, // Convert to cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/error"
        })

        res.status(200).json({ plan, price, features })
    } catch (error) {
        console.log("Error from the create Subscription Checkout (userPlanController)", error)
    }
})

export { createSubscriptionCheckout }



















// const getAllPlan = asyncHandler(async (req, res) => {
//     const plan = await userPlan.find();
//     return res.status(200).json(new apiResponse(200, plan, "Task created successfully."))
// })


// const createPlan = asyncHandler(async (req, res) => {
//     const { name, description, accessLevel } = req.body;
//     const plan = new userPlan({ name, description, accessLevel })
//     await plan.save();
//     return res.status(200).json(new apiResponse(200, plan, "Task created successfully."))
// })

// export { getAllPlan, createPlan }