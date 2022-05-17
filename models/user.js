const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [5, "Name must be at least 3 characters long"],
        maxlength: [255, "Name must be less than 255 characters long"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        minlength: [5, "Email must be at least 3 characters long"],
        maxlength: [255, "Email must be less than 255 characters long"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 5,
        maxlength: 1024,
    },
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_KEY);
};

module.exports = mongoose.model("User", userSchema);
