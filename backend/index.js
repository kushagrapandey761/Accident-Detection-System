import express from "express"
import pg from "pg";
import cors from "cors"
import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

import upload from "./mutler.js";


import dotenv from "dotenv"
import "dotenv/config";
const {Pool} = pg;

const app = express();
const port = 3001;
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "accident",
  password: "h7VNCJ@1",
  port: 5432,
});


app.get("/api/videos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM videos");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching videos" });
  }
});

app.post("/upload-video", upload.single("video"), async (req, res) => {
  const { locationUrl } = req.body;

  try {
    
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
    });

    
    fs.unlinkSync(req.file.path);

    
    const query = `
      INSERT INTO videos (video_link, location_link)
      VALUES ($1, $2) RETURNING *;
    `;
    const values = [result.secure_url, locationUrl];

    const dbResponse = await pool.query(query, values);

    res.status(200).json({
      message: "Video uploaded successfully",
      videoDetails: dbResponse.rows[0],
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to upload video or save details" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
