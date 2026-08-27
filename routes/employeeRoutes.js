const express = require("express");
const router = express.Router();

const {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployees,
  getSingleEmployee,
  getDashboardStats
} = require("../controller/employeeController");

const { protect, adminOnly } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

router.post("/create", protect, adminOnly, upload.single("image"),
 createEmployee);
router.put("/:id", protect, adminOnly, updateEmployee);
router.delete("/:id", protect, adminOnly, deleteEmployee);

router.get("/stats/dashboard",protect, getDashboardStats);

router.get("/", protect,getEmployees);
router.get("/:id",protect, getSingleEmployee);

module.exports = router;
