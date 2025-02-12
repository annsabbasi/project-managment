/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';
import axios from 'axios';
import cron from 'node-cron';
import FormData from 'form-data';
import screenshot from 'screenshot-desktop';
import { fileURLToPath } from 'url';
import { app, BrowserWindow, dialog } from 'electron';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    console.log("Electron App Running in Background");


    // For The User Choice To Access The SnapShot
    async function requestPermission() {
        const choice = await dialog.showMessageBox({
            type: "question",
            buttons: ["Allow", "Deny"],
            title: "Screen Capture Permission",
            message: "Do you allow this app to capture screenshots in the background?",
        });
        // 0 = "Allow", 1 = "Deny"
        return choice.response === 0;
    }


    // Take SnapShot Functionality
    async function takeScreenshot() {
        const timestamp = Date.now();
        const screenShotDir = path.join(__dirname, 'screenshots');
        fs.mkdirSync(screenShotDir, { recursive: true });

        const filePath = path.join(screenShotDir, `screenshots_${timestamp}.png`);
        try {
            const img = await screenshot();
            fs.writeFileSync(filePath, img);
            console.log(`Screenshot saved: ${filePath}`);
            await uploadToBackend(filePath);
        } catch (err) {
            console.error("Error taking screenshot:", err);
        }
    }


    // Ask The User Permission Only For Once
    requestPermission().then((granted) => {
        if (granted) {
            console.log("Permission granted! Screenshots will be taken.");
            cron.schedule('*/15 * * * *', () => {
                takeScreenshot();
            });
        } else {
            console.log("Permission denied! Screenshots will not be taken.");
        }
    });
});




async function uploadToBackend(filePath) {
    try {
        const formData = new FormData();
        formData.append('image', fs.createReadStream(filePath));

        const token = process.env.AUTH_TOKEN; // Not Yet Set In .env
        const response = await axios.post(`${process.env.BACKEND_URL}/user/upload-screenshot`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });
        fs.unlinkSync(filePath);
        console.log("Uploaded to backend:", response.data);
    } catch (err) {
        console.error("Backend upload failed:", err.response ? err.response.data : err);
    }
}


// async function uploadToBackend(filePath) {
//     try {
//         const formData = new FormData();
//         formData.append('image', fs.createReadStream(filePath));

//         // const response = await axios.post(`${process.env.BACKEND_URL}/upload`, formData, {
//         const response = await axios.post(`${process.env.BACKEND_URL}/user/upload-screenshot`, formData, {
//             headers: { 'Content-Type': 'multipart/form-data' }
//         });

//         console.log("Uploaded to backend:", response.data);
//     } catch (err) {
//         console.error("Backend upload failed:", err);
//     }
// }
