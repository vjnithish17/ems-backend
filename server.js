//                                  -------Import express & dotenv------
const express = require("express");
require("dotenv").config();


const authRoutes=require('./routes/authRoutes')
const employeeRoutes = require("./routes/employeeRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const cors= require("cors")
//                                 --------App create-------
const app = express();
console.log(process.env.PORT);

//                                  ------ Mongoose file solrom---------
const connectDB = require("./config/db");
connectDB();

//                                 -------json package add panrom--------
app.use(express.json());

app.use(cors());
//                                  --------Routes flow start ------>
app.use("/api/auth",authRoutes)
app.use("/api/employees", employeeRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/upload", uploadRoutes);

//                                  ------- starting path  -----------
app.get("/", (req, res) => {
  res.send("Server Running");
});


app.listen(process.env.PORT, () => {
  console.log(`Server Started on ${process.env.PORT}`);
});
