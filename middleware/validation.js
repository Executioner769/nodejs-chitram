const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// Validate genre using Joi
function genreValidation(genre) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
    });

    return schema.validate({
        name: genre.name,
    });
}

// Validate customer using Joi
function customerValidation(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(255).required(),
        phone: Joi.string().min(5).max(15).required(),
        isGold: Joi.boolean(),
    });

    return schema.validate({
        name: customer.name,
        phone: customer.phone,
        isGold: customer.isGold,
    });
}

// Validate movie using Joi
function movieValidation(movie) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required(),
    });
}

// Validate rental using Joi
function rentalValidation(rental) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
    });
}

// Validate user using Joi
function userValidation(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    });
}

exports.validateGenre = (req, res, next) => {
    const { error, value } = genreValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
};

exports.validateCustomer = (req, res, next) => {
    const { error, value } = customerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
};

exports.validateMovie = (req, res, next) => {
    const { error, value } = movieValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
};

exports.validateRental = (req, res, next) => {
    const { error, value } = rentalValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
};

exports.validateUser = (req, res, next) => {
    const { error, value } = userValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
};
