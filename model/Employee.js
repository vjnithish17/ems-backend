const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  salary: Number,
  image: String
});

module.exports = mongoose.model("Employee", employeeSchema);
