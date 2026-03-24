import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.post("/api/analyze", async (req, res) => {
  try {
    console.log("Incoming data:", req.body);

    const { description, title, requirements } = req.body;

    if (!description && !title && !requirements) {
      return res.status(400).json({
        error: "Please enter job details",
      });
    }

    const response = await axios.post(
      "http://localhost:5001/predict",
      req.body
    );
    res.json(response.data);

  } catch (error) {
    console.error("FULL ERROR:", error.message);
    if (error.response) {
      return res.status(error.response.status).json({
        error: error.response.data || "ML service error",
      });
    }

    res.status(500).json({
      error: "ML service not reachable",
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});