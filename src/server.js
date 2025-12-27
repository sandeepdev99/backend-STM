import dotenv from "dotenv";
dotenv.config();
// import "./config/mongoose.js"
import connectDB from "./config/db.js";
import app from "./app.js"


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

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
