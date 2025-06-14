import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import shortid from "shortid";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

await mongoose.connect(mongoUri);

const urlSchema = mongoose.Schema({
  originalUrl: { type: String, required: true, unique: true },
  shortUrl: { type: String, required: true, unique: true },
});

const Url = mongoose.model("Url", urlSchema);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Shorten URL
// TODO: Zod for validations
app.post("/api/shorten", async (req, res) => {
  const { originalUrl } = req.body;
  try {
    const existingUrl = await Url.findOne({ originalUrl });
    if (existingUrl) {
      console.log("URL already exists in the database", existingUrl);
      return res
        .status(200)
        .json({ originalUrl, shortUrl: existingUrl.shortUrl });
    }
    const shortUrl = shortid.generate(); // Generate a unique short URL
    const newUrl = new Url({ originalUrl, shortUrl });
    console.log("Creating new URL entry", newUrl);
    await newUrl.save();
    res.status(201).json({ originalUrl, shortUrl });
  } catch (err) {
    res.status(500).json({ error: "Error creating short URL", err });
  }
});

// Redirect to original URL
app.get("/api/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const url = await Url.findOne({ shortUrl });
    if (url) {
      return res.redirect(url.originalUrl);
    }
    return res.status(404).json({ error: "Short URL not found" });
  } catch (err) {
    return res.status(500).json({ error: "Error fetching original URL", err });
  }
});
