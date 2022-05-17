const mongoose = require("mongoose");
const Rental = require("../models/rental");
const Customer = require("../models/customer");
const Movie = require("../models/movie");
const asyncMiddleware = require("../middleware/async");

const Fawn = require("fawn");

Fawn.init(process.env.MONGO_URI);

exports.getRentals = asyncMiddleware(async (req, res) => {
    const rentals = await Rental.find().sort({ dateOut: -1 });
    res.status(200).send({
        rentals,
    });
});

exports.createRental = asyncMiddleware(async (req, res) => {
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send("Invalid customer");

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send("Invalid movie");

    if (movie.numberInStock === 0)
        return res.status(400).send("Movie not in stock");

    const rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
            isGold: customer.isGold,
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
        },
    });

    /*
    await rental.save();
    movie.numberInStock--;
    await movie.save();
    */

    try {
        new Fawn.Task()
            .save("rentals", rental)
            .update(
                "movies",
                { _id: movie._id },
                { $inc: { numberInStock: -1 } }
            )
            .run();

        res.status(201).send({
            rental,
        });
    } catch (error) {
        res.status(500).send({
            error,
        });
    }
});
