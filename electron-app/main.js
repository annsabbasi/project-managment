import { app, BrowserWindow, dialog } from 'electron';
import path from 'path';
import fs from 'fs';
import screenshot from 'screenshot-desktop';
import cron from 'node-cron';
import axios from 'axios';
import FormData from 'form-data';
import { fileURLToPath } from 'url';

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import dotenv from 'dotenv';
dotenv.config();

// Handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;


app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false, // Hide the window (background process)
        webPreferences: {
            nodeIntegration: true
        }
    });

    console.log("Electron App Running in Background");

    // Ask for permission once
    requestPermission().then((granted) => {
        if (granted) {
            console.log("Permission granted! Screenshots will be taken.");

            // Capture 3 screenshots per hour
            cron.schedule('*/2 * * * *', () => {
                takeScreenshot();
            });
        } else {
            console.log("Permission denied! Screenshots will not be taken.");
        }
    });
});

async function requestPermission() {
    const choice = await dialog.showMessageBox({
        type: "question",
        buttons: ["Allow", "Deny"],
        title: "Screen Capture Permission",
        message: "Do you allow this app to capture screenshots in the background?",
    });

    return choice.response === 0; // 0 = "Allow", 1 = "Deny"
}

async function takeScreenshot() {
    const timestamp = Date.now();
    const filePath = path.join(__dirname, `screenshot_${timestamp}.png`);

    try {
        const img = await screenshot();
        fs.writeFileSync(filePath, img);
        console.log(`Screenshot saved: ${filePath}`);

        // Upload to backend
        await uploadToBackend(filePath);
    } catch (err) {
        console.error("Error taking screenshot:", err);
    }
}

async function uploadToBackend(filePath) {
    try {
        const formData = new FormData();
        formData.append('image', fs.createReadStream(filePath));

        // Retrieve the token from environment variables or a secure storage
        const token = process.env.AUTH_TOKEN; // Ensure this is set in your .env file or replace it with the actual token.

        const response = await axios.post(`${process.env.BACKEND_URL}/user/upload-screenshot`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}` // Add the authorization header
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
