const router = require("express").Router();
const auth = require("../middleware/auth");

const { getRentals, createRental } = require("../controllers/rentals");

const { validateRental } = require("../middleware/validation");

router.route("/").get(getRentals).post(auth, validateRental, createRental);

module.exports = router;
