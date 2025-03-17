const express = require("express");
const Item = require("../models/Products");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Add Item (Only Admin)
router.post("/add", verifyToken, isAdmin, async (req, res) => {
    const { name, price, color, image } = req.body;
    const newItem = new Item({ name, price, color, image });
    await newItem.save();
    res.json({ message: "Item added successfully" });
});

// Get All Items
router.get("/", async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

module.exports = router;
