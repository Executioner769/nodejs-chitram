const User = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncMiddleware = require("../middleware/async");

exports.registerUser = asyncMiddleware(async (req, res, next) => {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email: email });
    if (user) return res.status(400).send("User already exists");

    user = new User({
        name,
        email,
        password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).send(_.pick(user, ["_id", "name", "email"]));
});

exports.loginUser = asyncMiddleware(async (req, res, next) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email: email });
    if (!user) return res.status(400).send("Invalid email or password");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
        return res.status(400).send("Invalid email or password");

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send(
        _.pick(user, ["_id", "name", "email"])
    );
});
