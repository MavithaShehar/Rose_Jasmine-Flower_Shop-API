const express = require("express");
const { createAdd, getAllAdds, updateAdd, deleteAdd } = require("../controllers/addsController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", verifyToken, isAdmin, createAdd); // Correctly use controller functions
router.get("/", getAllAdds); // Correctly use controller functions
router.put("/:id", verifyToken, isAdmin, updateAdd); // Update
router.delete("/:id", verifyToken, isAdmin, deleteAdd); // Delete

module.exports = router;
