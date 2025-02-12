import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const tempDir = path.join(__dirname, "../../public/temp");
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

export const upload = multer({ storage });






// fs.mkdirSync() is for making directories.
// fs.writeFileSync() is for writing data (like your screenshots) to files.


// import multer from 'multer';
// import path from 'path';

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // cb(null, "../../public/temp")
//         const tempDir = path.join(__dirname, "../../public/temp");
//         cb(null, tempDir);
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// })

// export const upload = multer({ storage })