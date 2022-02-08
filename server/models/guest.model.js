const mongoose = require("mongoose");
const User = require("../models/user.model");
const Event = require("../models/event.model");

const Guest = mongoose.model(
    "Guest",
    new mongoose.Schema({
        guest_id: 
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            },
        event_id: 
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event"
            }
    },
    { timestamps: true }
));

module.exports = Guest;