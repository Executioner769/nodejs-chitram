const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a customer name"],
        minlength: 5,
        maxlength: 255,
    },
    isGold: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        required: [true, "Please add a phone number"],
        minlength: 5,
        maxlength: 15,
    },
});

module.exports = new mongoose.model("Customer", customerSchema);
