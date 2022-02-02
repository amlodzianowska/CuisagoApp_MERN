const mongoose = require("mongoose");

const Neighborhood = mongoose.model(
    "Neighborhood",
    new mongoose.Schema({
        neighName: {
            type: String,
            required: [true, "Title is required!"],
            minlength: [2, "Title must be at least 2 characters long!"],
        },
        url: {
            type: String,
            required: [true, "Title is required!"]
        }
    })
);

module.exports = Neighborhood;