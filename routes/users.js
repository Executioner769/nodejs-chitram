const router = require("express").Router();
const auth = require("../middleware/auth");
const { whoAmI } = require("../controllers/users");

router.route("/me").get(auth, whoAmI);

module.exports = router;
