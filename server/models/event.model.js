const mongoose = require("mongoose");
const User = require("../models/user.model");
const Neighborhood = require("../models/neighborhood.model");

const Event = mongoose.model(
    "Event",
    new mongoose.Schema({
        title: {
            type: String,
            required: [true, "Title is required!"],
            minlength: [2, "Title must be at least 2 characters long!"],
        },
        startDate:{
            type: Date,
            // required: [true, "Date is required!"]
        },
        endDate:{
            type: Date,
            // required: [true, "Date is required!"]
        },
        startTime:{
            type: String,
        },
        endTime:{
            type: String,
        },
        neighborhood: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Neighborhood"
        },
        theme: {
            type: String,
            required: [true, "Theme is required!"]
        },
        description: {
            type: String
        },
        isPaid: {
            type: Boolean
        },
        price: {
            type: Number
        },
        capacity: {
            type: Number
        },
        hostId: 
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            },
        neighborhoodId: 
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Neighborhood"
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
