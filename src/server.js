import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import connectDB from "./config/db.js";

connectDB();
const app = express();

app.get("/api/v1/", (req, res) => {  
    res.send("API is running...");
});
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});