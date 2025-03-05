import { Department } from "../models/departments.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/userModel.js";

// Add a new department
const addDepartment = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        throw new apiError(400, "All fields are required.");
    }
    const newDepartment = await Department.create({
        title,
        description,
    });
    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                newDepartment,
                "Department Created Successfully!"
            )
        );
});

// Get all departments
const getDepartments = asyncHandler(async (req, res) => {
    const departments = await Department.find();
    if (!departments) {
        throw new apiError(404, "Departments not found.");
    }

    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                departments,
                "Departments Fetched Successfully!"
            )
        );
});

// Get a single department by ID
const getDepartmentById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const department = await Department.findById(id);
    if (!department) {
        throw new apiError(404, "Department not found.");
    }
    return res
        .status(200)
        .json(
            new apiResponse(200, department, "Department Fetched Successfully!")
        );
});

// Update a department
const updateDepartment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, title, description } = req.body;
    if (!name || !title || !description) {
        throw new apiError(400, "All fields are required.");
    }

    const updatedDepartment = await Department.findByIdAndUpdate(
        id,
        { name, title, description },
        { new: true }
    );
    if (!updatedDepartment) {
        throw new apiError(404, "Department not found.");
    }
    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                updatedDepartment,
                "Department Updated Successfully!"
            )
        );
});

// Delete a department
const deleteDepartment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedDepartment = await Department.findByIdAndDelete(id);
    if (!deletedDepartment) {
        throw new apiError(404, "Department not found.");
    }
    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                deletedDepartment,
                "Department Deleted Successfully!"
            )
        );
});

// get number of users in a department
const getNumberOfUsers = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // Find users associated with the department
    const users = await User.find({ department: id }).populate("department");
    if (!users) {
        throw new apiError(404, "No users found for this department.");
    }

    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                { count: users.length },
                "Number of Users Fetched Successfully!"
            )
        );
});
export {
    addDepartment,
    getDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
    getNumberOfUsers,
};
