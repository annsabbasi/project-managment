import multer from "multer";
import fs from "fs";

const tempDir = "/tmp/uploads"; // Use Vercel's writable directory

// Ensure the directory exists before writing files
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

export const upload = multer({ storage });