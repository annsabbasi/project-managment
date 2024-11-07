import { z } from 'zod';

const registrationSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters long"),
});

const validateRegistration = (req, res, next) => {
    const parsed = registrationSchema.safeParse(req.body);
    if (!parsed.success) {
        const errorMessages = parsed.error.errors.map(err => err.message).join(', ');
        return res.status(400).json({ error: errorMessages });
    }
    next();
};

export default validateRegistration;
