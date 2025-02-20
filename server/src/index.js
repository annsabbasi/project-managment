/* eslint-disable no-undef */
import connectDB from "./db/index.js";
import { app } from "./app.js";

const port = process.env.PORT || 6007;
const server = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`server port http://localhost:${port}/user/`);
        });
    } catch (error) {
        console.log("Connection failed at Index.js", error);
    }
};

server();
