const mongoose = require("mongoose");
const User = require("../models/user.model");

const Event = mongoose.model(
    "Event",
    new mongoose.Schema({
        title: {
            type: String,
            required: [true, "Title is required!"],
            minlength: [2, "Title must be at least 2 characters long!"],
        },
        date:{
            type: Date,
            // required: [true, "Date is required!"]
        },
        neighborhood: {
            type: String,
            // required: [true, "Neighborhood is required!"]
        },
        theme: {
            type: String,
            required: [true, "Theme is required!"]
        },
        description: {
            type: String
        },
        capacity: {
            type: Number
        },
        hostId: 
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            }
        // guests: [
        //     {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "User"
        //     }
        // ]
    },
    { timestamps: true }
));

module.exports = Event;
