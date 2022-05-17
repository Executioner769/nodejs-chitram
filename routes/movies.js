const router = require("express").Router();
const auth = require("../middleware/auth");

const {
    getMovies,
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie,
} = require("../controllers/movies");

const { validateMovie } = require("../middleware/validation");

router.route("/").get(getMovies).post(auth, validateMovie, createMovie);

router
    .route("/:id")
    .get(getMovie)
    .put(auth, validateMovie, updateMovie)
    .delete(auth, deleteMovie);

module.exports = router;
