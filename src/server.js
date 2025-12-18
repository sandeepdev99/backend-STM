import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
console.log("Server is running on port", process.env.PORT);
const app = express();

app.get("/api/v1/", (req, res) => {  
    
});
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});