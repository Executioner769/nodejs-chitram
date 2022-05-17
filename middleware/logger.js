const winston = require("winston");
require("winston-mongodb");

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: "combined.log",
            level: "info",
        }),
        new winston.transports.MongoDB({
            db: process.env.MONGO_URI,
            level: "info",
        }),
        new winston.transports.File({ filename: "error.log", level: "error" }),
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: "exceptions.log",
            level: "error",
        }),
    ],
    rejectionHandlers: [
        new winston.transports.File({
            filename: "rejections.log",
            level: "error",
        }),
    ],
});

module.exports = logger;
