import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiError } from "../../utils/apiError.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../../utils/cloudinary.js";
import { uploadSinglePdf } from "../../models/Video_SubTask/pdfUpload.js";
import { apiResponse } from "../../utils/apiResponse.js";

const uploadPdfController = asyncHandler(async (req, res) => {
    const file = req.file;
    const { description } = req.body;

    if (!description) {
        throw new apiError("PDF description not provided");
    }
    if (!file) {
        throw new apiError("No PDF file uploaded");
    }

    if (file.size > 10 * 1024 * 1024) {
        throw new apiError("PDF size is greater than 10MB");
    }

    // Upload the file to Cloudinary
    const localFilePath = file.path;
    const uploadResult = await uploadOnCloudinary(localFilePath);

    if (!uploadResult) {
        throw new apiError("Failed to upload PDF to Cloudinary");
    }

    const pdfUrl = uploadResult.secure_url;

    const newPdfSubTask = await uploadSinglePdf.create({
        description,
        pdf: pdfUrl,
    });

    res.status(200).json(
        new apiResponse(200, newPdfSubTask, "PDF uploaded successfully")
    );
});

const getAllPdfController = asyncHandler(async (req, res) => {
    const pdfData = await uploadSinglePdf.find({});
    if (!pdfData.length) {
        throw new apiError("No PDFs found");
    }
    res.status(200).json(
        new apiResponse(200, pdfData, "Uploaded PDFs fetched successfully")
    );
});



const deletePdfController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const pdfRecord = await uploadSinglePdf.findById(id);
    if (!pdfRecord) {
        throw new apiError("PDF not found");
    }

    const pdfUrl = pdfRecord.pdf;
    const publicId = pdfUrl.split('/').pop().split('.')[0];

    const cloudinaryResponse = await deleteFromCloudinary(publicId);
    if (!cloudinaryResponse.result === "ok") {
        throw new apiError("Failed to delete PDF from Cloudinary");
    }

    await uploadSinglePdf.findByIdAndDelete(id);
    res.status(200).json(new apiResponse(200, {}, "PDF deleted successfully"));
});

export { uploadPdfController, getAllPdfController, deletePdfController };
