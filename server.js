import express from "express";
import dotenv from "dotenv"; // Recommended for managing environment variables

// Load environment variables from .env file (if used locally)
dotenv.config();

const app = express();

// Middleware to parse incoming JSON payloads
app.use(express.json());

// --- POST API for Sensor Data ---
app.post("/sensor", (req, res) => {
    const data = req.body;

    // 1. Basic validation check for essential data
    if (!data || !data.deviceId || typeof data.value === 'undefined') {
        console.error("ERROR: Invalid data received. Body:", data);
        return res.status(400).json({
            status: "Error",
            message: "Invalid payload. 'deviceId' and 'value' are required.",
        });
    }

    // 2. Successful Data Handling & Logging
    const timestamp = new Date().toISOString();
    
    // In a real application, you would save 'data' to a database here
    // Example: saveToDatabase(data);
    
    console.log(`[${timestamp}] DATA RECEIVED: Device ID: ${data.deviceId}, Value: ${data.value}`);
    
    // 3. Send successful response
    res.status(200).json({
        status: "OK",
        message: "Data received and processed successfully",
        received: data,
        timestamp: timestamp
    });
});

// --- Test API / Health Check ---
app.get("/", (req, res) => {
    // Return status 200 (OK) with a message
    res.status(200).send("4G Module Sensor Server Running and Operational! 🟢");
});

// --- Generic Error Handling Middleware ---
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).send('Something broke!');
});

// --- Start the Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${app.get('env')} mode.`);
});
