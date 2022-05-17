const { default: mongoose } = require("mongoose");
const { Genre } = require("../models/genre");
const asyncMiddleware = require("../middleware/async");

exports.getGenres = asyncMiddleware(async (req, res, next) => {
    const genres = await Genre.find().sort("name");
    res.status(200).send({
        genres,
    });
});

exports.getGenre = asyncMiddleware(async (req, res, next) => {
    // Object Id Validation
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send("Invalid ID");

    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send("Genre not found");

    res.status(200).send({
        genre,
    });
});

exports.createGenre = asyncMiddleware(async (req, res, next) => {
    const genre = new Genre({
        ...req.body,
    });
    await genre.save();
    res.status(201).send({
        genre,
    });
});

exports.updateGenre = asyncMiddleware(async (req, res, next) => {
    // Object Id Validation
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send("Invalid ID");
    const genre = await Genre.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!genre) return res.status(404).send("Genre not found");

    res.status(200).send({
        genre,
    });
});

exports.deleteGenre = asyncMiddleware(async (req, res, next) => {
    // Object Id Validation
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send("Invalid ID");
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send("Genre not found");

    res.status(200).send({
        genre,
    });
});
