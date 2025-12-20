import express from "express";
import dotenv from "dotenv";
import "./config/mongoose.js" 
import connectDB from "./config/db.js";
dotenv.config({ path: "./.env" });
connectDB()
.then(
  () => {
    app.on("error", () =>{
      console.log("something wrong on connection to the database");
    })
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running on port: ${process.env.PORT}`);
    })
  }
)
.catch(
  (err) => {
    console.log("mongo db connection failed!!", err)
  }
)

const app = express();

app.get("/api/v1/", (req, res) => {  
    res.send("API is running...");
});
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});