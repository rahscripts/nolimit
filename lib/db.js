import mongoose from "mongoose";

let isConnected = false;

export default async function db() {
    if (isConnected) return;

    try {
        await mongoose.connect(process.env.MONGO_URL);
        isConnected=true;
        console.log("db connected")
    } catch(err) {
        console.log("Mongo error:", err);
    }
}