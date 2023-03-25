"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

// Routing
const main = require("./src/routes/main/main");
const nanumteo = require("./src/routes/nanumteo/nanumteo");
const notice = require("./src/routes/community/notice");
const facility = require("./src/routes/community/facility");
const free = require("./src/routes/community/free");
const gallery = require("./src/routes/community/gallery");

// App Setting
app.use(bodyParser.json()); // enable bodyParser to parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // enable 한글, blank to be included on url

app.use("/", main);
app.use("/nanumteo", nanumteo);
app.use("/notice", notice);
app.use("/facility", facility);
app.use("/free", free);
app.use("/gallery", gallery);

module.exports = app;