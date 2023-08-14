const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// const snackController = require("./controllers/snackController");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Welcome to Real estate platform.");
});

module.export = app;
