import mongoose, { Schema } from 'mongoose';

const planSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    accessLevel: {
        type: String,
        enum: ['basic', 'premium', 'admin-only'],
        default: 'basic',
        required: true
    }
})

// basic=10 premium=50 custom=enterManually 
const userPlan = mongoose.model('userplan', planSchema);

export { userPlan }