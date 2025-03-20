const Product = require("../models/Products");

// Add Product (Admin Only)
const createProduct = async (req, res) => {
    try {
        const { name, price, color, imageurl, category, status } = req.body;
        if (!name || !price || !color || !imageurl || !category || !status) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newProduct = new Product({ name, price, color, imageurl, category, status });
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

// Update Product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update Product status
const updateProductStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // Assuming the new status comes from the request body

        // Only update the status field
        const updatedProduct = await Product.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product status updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createProduct, getAllProducts, updateProduct, deleteProduct, updateProductStatus };
