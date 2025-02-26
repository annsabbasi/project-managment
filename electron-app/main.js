/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';
import axios from 'axios';
import FormData from 'form-data';
import screenshot from 'screenshot-desktop';
import { fileURLToPath } from 'url';
import { app, BrowserWindow, dialog } from 'electron';
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

    wss = new WebSocketServer({ port: 3001 });
    console.log("WebSocket Server Started on ws://localhost:3001");

    wss.on('connection', (ws) => {
        console.log("React App Connected to Electron via WebSocket");
        ws.on('message', (message) => {
            receivedToken = message.toString();
            console.log('Received token from React:', receivedToken);
        });
    });

    async function requestPermission() {
        const choice = await dialog.showMessageBox({
            type: "question",
            buttons: ["Allow", "Deny"],
            title: "Screen Capture Permission",
            message: "Do you allow this app to capture screenshots in the background?",
        });
        return choice.response === 0;
    }

    async function takeScreenshot() {
        const timestamp = Date.now();
        const screenShotDir = path.join(__dirname, 'screenshots');
        fs.mkdirSync(screenShotDir, { recursive: true });
        const filePath = path.join(screenShotDir, `screenshot_${timestamp}.png`);

        try {
            const img = await screenshot();
            fs.writeFileSync(filePath, img);
            console.log(`Screenshot saved: ${filePath}`);
            await uploadToBackend(filePath);
        } catch (err) {
            console.error("Error taking screenshot:", err);
        }
    }

    async function uploadToBackend(filePath) {
        try {
            const formData = new FormData();
            formData.append('image', fs.createReadStream(filePath));

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
            }
        }
    }

    async function shouldTakeScreenshot() {
        try {
            const response = await axios.get(`${process.env.BACKEND_URL}/user/check-status`, {
                headers: { 'Authorization': `Bearer ${receivedToken}` }
            });
            console.log("Response from shoulfTakeScreenShot", response.data)
            const { isRunning, isCheckedOut, checkIn } = response.data.data;

            return isRunning && !isCheckedOut && checkIn;
        } catch (error) {
            console.error('Failed to check timer status:', error.response ? error.response.data : error);
            return false;
        }
    }

    requestPermission().then((granted) => {
        if (granted) {
            console.log("Permission granted! Screenshots will be taken randomly 4 times an hour.");

            function scheduleRandomScreenshots() {
                const intervals = [];
                for (let i = 0; i < 12; i++) {
                    const delayMinutes = Math.floor(Math.random() * 60);
                    intervals.push(delayMinutes);
                }
                intervals.sort((a, b) => a - b);

                intervals.forEach((minute) => {
                    setTimeout(async () => {
                        if (await shouldTakeScreenshot()) {
                            await takeScreenshot();
                        } else {
                            console.log("Skipping screenshot, user is not checked in or timer not running.");
                        }
                    }, minute * 60 * 1000);
                });

                setTimeout(scheduleRandomScreenshots, 60 * 60 * 1000);
            }

            scheduleRandomScreenshots();
        } else {
            console.log("Permission denied! Screenshots will not be taken.");
        }
    });
});