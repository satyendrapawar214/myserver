import express from "express";
const app = express();

app.use(express.json());

// POST API
app.post("/sensor", (req, res) => {
    console.log("Data Received:", req.body);

    res.json({
        status: "OK",
        message: "Data received successfully",
        received: req.body
    });
});

// Test API
app.get("/", (req, res) => {
    res.send("4G Module Sensor Server Running...");
});

// Port for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
