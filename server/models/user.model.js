const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required!"],
            minlength: [2, "Username must be at least 2 characters long!"],
        },
        profilePicUrl: {
            type: String
        },
        email: {
            type: String,
            required: [true, "Email is required!"],
            validate: {
                validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Please enter a valid email!"
            }
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters long!"],
        },
        birthday:{
            type: Date
        },
        neighborhood_id: 
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Neighborhood",
            required: [true, "Select neighborhood!"]
            },
        foodPreferences: {
            type: String
        },
        about: {
            type: String
        }
        // myevent_id: [
        //     {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Event"
        //     }
        // ],
    },
    { timestamps: true }
);

UserSchema.virtual('confirmPassword')
    .get( function(){
        return this._confirmPassword
    })
    .set(function(value){
        this._confirmPassword = value
});

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords must match!')
    }
    next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    })
    .catch(err=> {
        console.log("Hashing went wrong", err)
        next();
    })
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
