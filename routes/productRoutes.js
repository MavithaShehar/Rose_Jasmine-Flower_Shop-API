const express = require("express");
const { createProduct, getAllProducts, updateProduct, deleteProduct, updateProductStatus } = require("../controllers/productController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", verifyToken, isAdmin, createProduct); // Correctly use controller functions
router.get("/", getAllProducts); // Correctly use controller functions
router.put("/:id", verifyToken, isAdmin, updateProduct); // Update
router.delete("/:id", verifyToken, isAdmin, deleteProduct); // Delete

module.exports = router;
