import { z } from 'zod';


// Register Zod Schema Validation
export const generateRegisterSchema = (fields) => {
    const fieldsSchema = {
        name: z.string().min(1, "Name is required").min(3, "Name must be at least 3 characters"),
        email: z.string().min(1, "Email is required").email("Invalid email format"),
        password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters long"),
        confirmPassword: z.string().min(1, "Confirm password is required")
    };

    const selectedFields = Object.fromEntries(
        fields.map(field => [field, fieldsSchema[field]])
    );
    return z.object(selectedFields).refine(data => data.password === data.confirmPassword, {
        message: "Passwords does not match",
        path: ["confirmPassword"],
    });
};

export const validateRegisterFields = (fields) => (req, res, next) => {
    const schema = generateRegisterSchema(fields);

    // Check for empty fields
    const emptyFields = fields.filter(field => !req.body[field]);
    if (emptyFields.length > 0) {
        return res.status(400).json({
            error: "All fields are required",
            missingFields: emptyFields,
        });
    }

    // Validate schema
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
        const errorMessages = parsed.error.errors.map(err => err.message);
        return res.status(400).json({ errors: errorMessages });
    }
    next();
};


// Register Zod Schema Validation
export const generateCompanyRegisterSchema = (fields) => {
    const fieldsSchema = {
        companyName: z.string().min(1, "Company Name is required").min(3, "Company Name must be at least 3 characters"),
        email: z.string().min(1, "Email is required").email("Invalid email format"),
        password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters long"),
        confirmPassword: z.string().min(1, "Confirm password is required")
    };

    const selectedFields = Object.fromEntries(
        fields.map(field => [field, fieldsSchema[field]])
    );
    return z.object(selectedFields).refine(data => data.password === data.confirmPassword, {
        message: "Passwords does not match",
        path: ["confirmPassword"],
    });
};

export const validateRegisterFieldsCompany = (fields) => (req, res, next) => {
    const schema = generateCompanyRegisterSchema(fields);

    // Check for empty fields
    const emptyFields = fields.filter(field => !req.body[field]);
    if (emptyFields.length > 0) {
        return res.status(400).json({
            error: "All fields are required",
            missingFields: emptyFields,
        });
    }

    // Validate schema
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
        const errorMessages = parsed.error.errors.map(err => err.message);
        return res.status(400).json({ errors: errorMessages });
    }
    next();
};



// Login Zod Schema Validation
export const loginSchema = z.object({
    name: z.string().or(z.string().optional()),
    email: z.string().email("Invalid email format").optional(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});
// }).refine((value) => value.length < 0, { message: "All fields required" });