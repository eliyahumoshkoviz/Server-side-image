const express = require("express");
const cors = require("cors");
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());

//make connect to database
require("./db/db.connect").connect();

const userRouter = require("./user/user.router");
const LogRouter = require("./login/login.router");
const registrationRouter = require("./registration/registration.router");

app.use("/registration", registrationRouter);
app.use("/login", LogRouter);
app.use("/user", userRouter);

app.listen(8000, () => console.log("### Server is up ###"));
