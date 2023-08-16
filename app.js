const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const realEstateController = require("./controllers/realEstateController");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/properties", realEstateController);

app.get("/", (req, res) => {
  res.send("Welcome to Real estate platform.");
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found!");
});

module.exports = app;
