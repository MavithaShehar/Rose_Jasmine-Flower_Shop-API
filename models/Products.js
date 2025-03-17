const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    imageurl: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, required: true }
});

module.exports = mongoose.model("Product", ProductSchema);
