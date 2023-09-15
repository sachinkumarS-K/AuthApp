const express = require("express");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./config/db.js");
require("dotenv").config();
const user = require("./route/user.js")


const app = express();
app.use(express.json());
app.use(cookieParser());
dbConnect();

app.use("/api/v1",user);

module.exports = app ;
