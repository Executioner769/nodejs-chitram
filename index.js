require("dotenv").config();
const express = require("express");
const connectDB = require("./db/db-config");
const startupDebugger = require("debug")("app:startup");
const app = express();
// Connect to the database
const db = connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Routes for /
app.get("/", (req, res) => {
    res.render("index", {
        title: "My Express App",
        message: "Welcome to the Home Page",
    });
});

require("./start/routes")(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    startupDebugger(`Server Started on ${port}`);
});
