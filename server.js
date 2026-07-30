//                                  -------Import express & dotenv------
const express = require("express");
require("dotenv").config();

const authRoutes=require('./routes/authRoutes')

//                                 --------App create-------
const app = express();
console.log(process.env.PORT);

//                                  ------ Mongoose file solrom---------
const connectDB = require("./config/db");
connectDB();

//                                 -------json package add panrom--------
app.use(express.json());

//                                  --------Routes flow start ------>
app.use("/api/auth",authRoutes)

//                                  ------- starting path  -----------
app.get("/", (req, res) => {
  res.send("Server Running");
});


app.listen(process.env.PORT, () => {
  console.log(`Server Started on ${process.env.PORT}`);
});
