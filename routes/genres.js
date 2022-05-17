const router = require("express").Router();
const auth = require("../middleware/auth");

const {
    getGenres,
    getGenre,
    createGenre,
    updateGenre,
    deleteGenre,
} = require("../controllers/genres");

const { validateGenre } = require("../middleware/validation");

router.route("/").get(getGenres).post(auth, validateGenre, createGenre);

router
    .route("/:id")
    .get(getGenre)
    .put(auth, validateGenre, updateGenre)
    .delete(auth, deleteGenre);

module.exports = router;
