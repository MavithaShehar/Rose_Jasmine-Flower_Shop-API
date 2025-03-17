const Product = require("../models/Products");

// Add Product (Admin Only)
const createProduct = async (req, res) => {
    try {
        const { name, price, color, image } = req.body;
        if (!name || !price || !color || !image) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newProduct = new Product({ name, price, color, image });
        await newProduct.save();

        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get All Products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createProduct, getAllProducts };
