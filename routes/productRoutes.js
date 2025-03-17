const express = require("express");
const { createProduct, getAllProducts } = require("../controllers/productController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", verifyToken, isAdmin, createProduct); // Correctly use controller functions
router.get("/", getAllProducts); // Correctly use controller functions

module.exports = router;
