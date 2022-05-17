const Movie = require("../models/movie");
const { Genre } = require("../models/genre");
const asyncMiddleware = require("../middleware/async");

exports.getMovies = asyncMiddleware(async (req, res, next) => {
    const movies = await Movie.find().sort("title");
    res.status(200).send({
        movies,
    });
});

exports.createMovie = asyncMiddleware(async (req, res, next) => {
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("Invalid Genre");

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    });
    await movie.save();
    res.status(201).send({
        movie,
    });
});

exports.getMovie = asyncMiddleware(async (req, res, next) => {
    // Object Id Validation
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send("Invalid ID");
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("Movie not found");
    res.status(200).send({
        movie,
    });
});

exports.updateMovie = asyncMiddleware(async (req, res, next) => {
    // Object Id Validation
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send("Invalid ID");

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("Invalid Genre");

    const movie = await Movie.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );
    if (!movie) return res.status(404).send("Movie not found");
    res.status(200).send({
        movie,
    });
});

exports.deleteMovie = asyncMiddleware(async (req, res, next) => {
    // Object Id Validation
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send("Invalid ID");
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).send("Movie not found");
    res.status(200).send({
        movie,
    });
});
