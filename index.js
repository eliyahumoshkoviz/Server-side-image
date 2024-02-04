const express = require("express");
const cors = require("cors");
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());

//יוצר חיבור למאגר נתונים
require("./db/db.connect").connect();

const userRouter = require("./user/user.router");
app.use("/user", userRouter);

app.listen(8000, () => console.log("### Server is up ###"));
