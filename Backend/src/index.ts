import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const app = express();
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// );
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("AQICheck Backend is running!");
});

app.get("/api/aqi/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const url = `https://api.waqi.info/feed/${city}/?token=${process.env.AQICN_TOKEN}`;

    console.log("URL:", url);

    const response = await axios.get(url);
    return res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AQI API request failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// http://api.waqi.info/feed/pune/?token=d68fb8477575cd93ad4b9ca96f8f3c130b40050e
