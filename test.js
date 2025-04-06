import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/searchengine")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Failed to connect:", err.message));
