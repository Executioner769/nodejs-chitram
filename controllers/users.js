const _ = require("lodash");
const User = require("../models/user");
const asyncMiddleware = require("../middleware/async");

exports.whoAmI = asyncMiddleware(async (req, res, next) => {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).send(user);
});
