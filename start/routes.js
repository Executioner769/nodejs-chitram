const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const auth = require("../routes/auth");
const users = require("../routes/users");
const errorHandler = require("../middleware/error");

module.exports = function (app) {
    // Routes for /api/genres
    app.use("/api/genres", genres);

    // Routes for /api/customers/
    app.use("/api/customers", customers);

    // Routes for /api/movies
    app.use("/api/movies", movies);

    // Routes for /api/rentals
    app.use("/api/rentals", rentals);

    // Routes for /api/auth
    app.use("/api/auth", auth);

    // Routes for /api/users
    app.use("/api/users", users);

    app.use(errorHandler); // Error handler middleware
};
