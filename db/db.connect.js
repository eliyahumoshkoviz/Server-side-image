const mongoose = require("mongoose");

async function connect() {
    try {
        mongoose
        //מחזיק את הקישור למאגר נתונים
            .connect(process.env.URL_MONGO)
            .then((res) => console.log("**** connect success ****"));
    } catch (arr) {
        console.log("DB - Error : ", err);
    }
}

module.exports = { connect };
