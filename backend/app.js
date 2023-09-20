const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "/frontend")));
app.use(cookieParser());

module.exports = app;
