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
import { app, BrowserWindow, dialog, ipcMain } from 'electron';

import WebSocket, { WebSocketServer } from 'ws';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let mainWindow;
let wss;
let receivedToken;



app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false,
        }
    });

    console.log("Electron App Running in Background");
    mainWindow.loadURL('http://localhost:5173/home');

    // ✅ Create a WebSocket server
    wss = new WebSocketServer({ port: 3001 }); // WebSocket server on port 3001
    console.log("WebSocket Server Started on ws://localhost:3001");

    wss.on('connection', (ws) => {
        console.log("React App Connected to Electron via WebSocket");

        ws.on('message', (message) => {
            receivedToken = message.toString();
            console.log('Received token from React:', message.toString());
        });
    });



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
            cron.schedule('*/2 * * * *', () => {
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

        // const token = process.env.AUTH_TOKEN; // Not Yet Set In .env
        const response = await axios.post(`${process.env.BACKEND_URL}/user/upload-screenshot`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${receivedToken}`
            }
        });
        console.log("Uploaded to backend:", response.data);
    } catch (err) {
        console.error("Backend upload failed:", err.response ? err.response.data : err);
    } finally {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        } else {
            console.log(`File ${filePath} not found, nothing to remove.`);
        }
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
