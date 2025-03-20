const mongoose = require("mongoose");

const AddsSchema = new mongoose.Schema({
    imageurl: { type: String, required: true },
    status: { type: String, required: true }
});

module.exports = mongoose.model("Adds", AddsSchema);
