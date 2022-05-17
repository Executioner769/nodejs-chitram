const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a genre name"],
        minlength: 5,
        maxlength: 50,
    },
});

exports.Genre = new mongoose.model("Genre", genreSchema);

exports.genreSchema = genreSchema;
