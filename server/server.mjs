import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS

// API Proxy Endpoint
app.get("/api/vegetable-prices", async (req, res) => {
    const { date } = req.query;

    // Validate the date input
    if (!date) {
        return res.status(400).json({ error: "Date parameter is required" });
    }

    try {
        const apiUrl = `https://vegetablemarketprice.com/api/dataapi/market/karnataka/daywisedata?date=${date}`;
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data", details: error.message });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
