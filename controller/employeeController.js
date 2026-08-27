const Employee = require("../model/Employee");

//                                       ------------- Create employee-------------
const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create({
      name: req.body.name,
      email: req.body.email,
      department: req.body.department,
      salary: req.body.salary,
      image: req.file ? req.file.filename : null,
    });

    res.status(201).json(employee);
  } catch (error) {
    console.log("CREATE EMPLOYEE ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};
//                                       ------------- Read All employee-------------
const getEmployees = async (req, res) => {
  const serach = req.query.serach || "";

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const sortFiled = req.query.sort || "name";

  const employees = await Employee.find({
    name: {
      $regex: serach,
      $options: "i",
    },
  })
    .skip(skip)
    .limit(limit)
    .sort(sortFiled);

  res.json(employees);
};
//                                       ------------- Read one employee-------------
const getSingleEmployee = async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.json(employee);
};
//                                       ------------- Update employee-------------
const updateEmployee = async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(employee);
};
//                                       ------------- Delete employee-------------
const deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);

  res.json({
    message: "Employee Deleted",
  });
};
//                                      ----------------Dashboard -----------------
const getDashboardStats = async (req, res) => {
  const totalEmployees = await Employee.countDocuments();

  const employees = await Employee.find();
  const departments = await Employee.distinct("department");
  const departmentCount=departments.length
  const totalSalary = employees.reduce((total, emp) => total + emp.salary, 0);

  res.json({
    totalEmployees,
    totalSalary,
    departmentCount
  });
};

module.exports = {
  createEmployee,
  getEmployees,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
  getDashboardStats,
};
