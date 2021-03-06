const mongoose = require("mongoose");
const User = require("../models/user.model");
const Event = require("../models/event.model");

const Comment = mongoose.model(
    "Comment",
    new mongoose.Schema({
        text: {
            type: String,
            required: [true, "Comment must be at least 1 character long!"],
        },
        author_id: 
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

module.exports = Comment;