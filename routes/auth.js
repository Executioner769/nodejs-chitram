const router = require("express").Router();

const authController = require("../controllers/auth");

const { registerUser, loginUser } = authController;

router.route("/register").post(authController.registerUser);

router.route("/login").post(authController.loginUser);

module.exports = router;
