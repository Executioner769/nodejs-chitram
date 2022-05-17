const mongoose = require("mongoose");
const dbDebugger = require("debug")("app:db");

module.exports = async function connectDB() {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        const conn = await mongoose.connect(process.env.MONGO_URI, options);
        dbDebugger("Database connected");
    } catch (error) {
        dbDebugger(error);
    }
};
