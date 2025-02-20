// ------------- THIS IS FOR THE TEST PURPOSE -------------

import { z } from "zod";
export const generateSchema = (fields) => {
    const fieldSchemas = {
        name: z
            .string()
            .min(1, "Name is required")
            .min(3, "Name must be at least 3 characters long"),
        email: z
            .string()
            .min(1, "Email is required")
            .email("Invalid email format"),
        password: z
            .string()
            .min(1, "Password is required")
            .min(8, "Password must be at least 8 characters long"),
        confirmPassword: z.string().min(1, "Confirm password is required"),
    };

    const selectedFields = Object.fromEntries(
        fields.map((field) => [field, fieldSchemas[field]])
    );

    return z
        .object(selectedFields)
        .refine((data) => data.password === data.confirmPassword, {
            message: "Passwords must match",
            path: ["confirmPassword"],
        });
};

export const validateFields = (fields) => (req, res, next) => {
    const schema = generateSchema(fields);

    // Phase 1: Check for empty fields
    const emptyFields = fields.filter((field) => !req.body[field]);
    if (emptyFields.length > 0) {
        return res.status(400).json({
            error: "All fields are required",
            missingFields: emptyFields,
        });
    }

    // Phase 2: Validate schema
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
        const errorMessages = parsed.error.errors.map((err) => err.message);
        return res.status(400).json({ errors: errorMessages });
    }

    next();
};
// Example to implement in Route
// router.route('/signup').post(validateFields(['name', 'email', 'password', 'confirmPassword']), registerUser);
