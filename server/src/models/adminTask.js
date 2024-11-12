import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    projectTitle: {
        type: String,
        // required: [true, "The project title is required"],
        maxlength: [40, "The title should be no longer than 40 characters"]
    },
    teamLeadName: {
        type: [String],  // An array to allow multiple team leads if needed
        required: [true, "Please type the name of the admin"]
    },
    clientName: {
        type: String,
    },
    description: {
        type: String,
        maxLength: [700, "The Description should be no longer than 700 characters"]
    },
    projectStatus: {
        type: String,
        default: 'pending',
        enum: ['pending', 'ended', 'Approved', 'Not Approved'],
    },
    profileImage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userinfos",
    },
    // members: {
    //     type: [String],  // Array to hold names or IDs of assigned members
    //     validate: [arrayLimit, "The task should have between 5 and 100 members"],
    // },
    startDate: {
        type: Date,  // Changed to Date type for easier date handling
        default: Date.now,
    },
    dueDate: {
        type: Date,  // Changed to Date type
        required: [true, 'The Due Date is required']
    },
    budget: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'In Progress',
        enum: ['In Progress', 'Completed', 'Approved', 'Not Approved']
    },
    points: {
        type: Number,
        default: 100
    }
}, { timestamps: true });

// Validator to enforce members count
// function arrayLimit(val) {
//     return val.length >= 5 && val.length <= 100;
// }

const adminTask = mongoose.model('userTask', taskSchema);

export { adminTask };






// import mongoose from 'mongoose';

// const taskSchema = new mongoose.Schema({
//     projectTitle: {
//         type: String,
//         required: true,
//         max: [40, "The Title should be no longer than the 40 characters"]
//     },
//     teamLeadName: {
//         type: [String],
//         required: [true, "Please type the name of the admin"],
//     },
//     clientName: {
//         type: String
//     },
//     description: {
//         type: String,
//         max: [40, "The Description should be no longer than the 700 characters"]
//     },
//     projectStatus: {
//         type: String,
//         default: 'pending',
//         enum: ['pending', 'ended', 'Approved', 'Not Approved'],
//     },
//     profileImage: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "userinfos",
//     },
//     members: {
//         type: Number,
//         max: 100,
//         min: 5,
//         default: 0
//     },
//     startDate: {
//         type: String,
//         default: '00:00:00',
//     },
//     dueDate: {
//         type: String,
//         required: [true, 'The Due Data is required']
//     },
//     budget: {
//         type: Number,
//         required: true
//     },
//     status: {
//         type: String,
//         default: 'pending',
//         enum: ['In Progress', 'Completed', 'Approved', 'Not Approved'],
//     },
// }, { timestamps: true });


// const adminTask = mongoose.model('userTask', taskSchema);

// export { adminTask } 