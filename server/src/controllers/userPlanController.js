import { asyncHandler } from "../utils/asyncHandler.js";
import Stripe from 'stripe';

const stripe = Stripe("sk_test_51QSBs2F1BVeaeMn2zhPaHbSmtv7cnQWXGXlMooMPGizgDTMmEgcTLQ9j9mHavfF4M7BsOG6WKNX6M3tUGOVHoQlW00uESxXwlO")
const createSubscriptionCheckout = asyncHandler(async (req, res) => {
    const { plan, price } = req.body;
    // Fetching the list of customers
    // const customers = await stripe.customers.list();
    // console.log("This is the Customer List:", customers);
    try {

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: plan,
                        },
                        unit_amount: price * 100, // Convert to cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/referrals',
        });

        res.json({ url: session.url });
    } catch (error) {
        console.log("Error from the createSubscriptionCheckout (userPlanController)", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export { createSubscriptionCheckout };





// const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: [
//         {
//             price_data: {
//                 currency: "usd",
//                 product_data: { name: plan },
//                 unit_amount: price * 100,
//             },
//             quantity: 1,
//         }
//     ],
//     mode: "payment",
//     success_url: "http://localhost:5173/success",
//     cancel_url: "http://localhost:5173/cancel",
// })

// // res.status(200).json({ plan, price, features });
// res.status(200).json({ id: session.id });












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