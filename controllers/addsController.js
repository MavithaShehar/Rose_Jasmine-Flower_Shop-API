const Adds = require("../models/Adds");

// Add Add (Admin Only)
const createAdd = async (req, res) => {
    try {
        const { imageurl, status } = req.body;
        if (!imageurl || !status) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newAdd = new Adds({ imageurl , status});
        await newAdd.save();

        res.status(201).json({ message: "Add added successfully", add: newAdd });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get All Adds
const getAllAdds = async (req, res) => {
    try {
        const adds = await Adds.find(); // Corrected to 'Adds' instead of 'Product'
        res.status(200).json(adds); // Return the adds, not products
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update Add
const updateAdd = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAdd = await Adds.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedAdd) {
            return res.status(404).json({ message: "Add not found" });
        }

        res.status(200).json({ message: "Add updated successfully", add: updatedAdd });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete Add
const deleteAdd = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAdd = await Adds.findByIdAndDelete(id);

        if (!deletedAdd) {
            return res.status(404).json({ message: "Add not found" });
        }

        res.status(200).json({ message: "Add deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createAdd, getAllAdds, updateAdd, deleteAdd };
