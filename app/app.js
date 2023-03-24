"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

// Routing
const main = require("./src/routes/main/main");
const notice = require("./src/routes/community/notice");

// App Setting
app.use(bodyParser.json()); // enable bodyParser to parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // enable 한글, blank to be included on url

app.use("/", main);
app.use("/notice", notice);

module.exports = app;