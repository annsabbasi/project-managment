import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
            trim: true,
        },
        pdf: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const uploadSinglePdf = mongoose.model("UploadSinglePdf", pdfSchema);
