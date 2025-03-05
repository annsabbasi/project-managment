import { User } from "../../models/userModel.js";
import Plan from "../../models/SuperAdmin/Plans.js";
import Subscription from "../../models/SuperAdmin/Subscriptions.js";

export const getDashboardData = async (req, res) => {
    try {
        // Fetch user activity summary
        const activeUsers = await User.countDocuments({
            isActive: true,
            role: "admin",
        });
        const inactiveUsers = await User.countDocuments({
            isActive: false,
            role: "admin",
        });
        const totalUsers = await User.countDocuments({ role: "user" });
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        // Aggregate subscriptions per month for the current year
        const subscriptionData = await Subscription.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${currentYear}-01-01`),
                        $lt: new Date(`${currentYear + 1}-01-01`),
                    },
                    status: { $eq: "active" },
                },
            },
            {
                $group: {
                    _id: { month: { $month: "$createdAt" } },
                    subscriptions: { $sum: 1 },
                },
            },
            { $sort: { "_id.month": 1 } },
        ]);

        // Aggregate users per month for the current year
        const userData = await User.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${currentYear}-01-01`),
                        $lt: new Date(`${currentYear + 1}-01-01`),
                    },
                    role: { $eq: "admin" },
                },
            },
            {
                $group: {
                    _id: { month: { $month: "$createdAt" } },
                    users: { $sum: 1 },
                },
            },
            { $sort: { "_id.month": 1 } },
        ]);

        // Map data to ensure all months are present for line chart
        const formattedLineData = Array.from({ length: 12 }, (_, i) => ({
            name: new Date(0, i).toLocaleString("default", { month: "short" }),
            subscriptions:
                subscriptionData.find((d) => d._id.month === i + 1)
                    ?.subscriptions || 0,
            companies: userData.find((d) => d._id.month === i + 1)?.users || 0,
        }));

        // Fetch revenue by plans grouped by plan title
        const revenueByPlans = await Plan.aggregate([
            {
                $lookup: {
                    from: "subscriptions",
                    localField: "_id",
                    foreignField: "plan",
                    as: "subscriptions",
                },
            },
            { $unwind: "$subscriptions" },
            {
                $group: {
                    _id: "$title",
                    revenue: { $sum: "$price" },
                },
            },
        ]);

        // Calculate total revenue from all plans
        const totalRevenue = revenueByPlans.reduce(
            (acc, curr) => acc + curr.revenue,
            0
        );

        // monthly revenue aggregation with a lookup to get the plan price from the "plans" collection
        const monthlyRevenueAgg = await Subscription.aggregate([
            {
                $match: {
                    startAt: {
                        $gte: new Date(`${currentYear}-01-01`),
                        $lt: new Date(`${currentYear + 1}-01-01`),
                    },
                },
            },
            {
                $lookup: {
                    from: "plans",
                    localField: "plan",
                    foreignField: "_id",
                    as: "planData",
                },
            },
            { $unwind: "$planData" },
            {
                $project: {
                    month: { $month: "$startAt" },
                    price: "$planData.price",
                },
            },
            {
                $group: {
                    _id: "$month",
                    revenue: { $sum: "$price" },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        const currentmonthlyRevenueAgg = await Subscription.aggregate([
            {
                $match: {
                    startAt: {
                        $gte: new Date(currentYear, currentMonth, 1), // Start of the current month
                        $lt: new Date(currentYear, currentMonth + 1, 1), // Start of the next month
                    },
                },
            },
            {
                $lookup: {
                    from: "plans",
                    localField: "plan",
                    foreignField: "_id",
                    as: "planData",
                },
            },
            { $unwind: "$planData" },
            {
                $project: {
                    price: "$planData.price", // Get the price from the "plans" collection
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$price" }, // Sum the price to get the total revenue for the current month
                },
            },
        ]);

        const currentMonthRevenue =
            currentmonthlyRevenueAgg.length > 0
                ? currentmonthlyRevenueAgg[0].totalRevenue
                : 0;

        const formattedImportantData = Array.from({ length: 12 }, (_, i) => {
            const revenueObj = monthlyRevenueAgg.find(
                (item) => item._id === i + 1
            );
            return {
                name: new Date(0, i).toLocaleString("default", {
                    month: "short",
                }),
                value: revenueObj ? revenueObj.revenue : 0,
            };
        });

        res.status(200).json({
            pie: [
                { name: "Active Companies", value: activeUsers },
                { name: "Inactive Companies", value: inactiveUsers },
            ],
            bar: revenueByPlans.map((plan) => ({
                name: plan._id,
                revenue: plan.revenue,
            })),
            line: formattedLineData,
            important: formattedImportantData,
            totalRevenue,
            totalUsers,
            currentMonthRevenue,
        });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
