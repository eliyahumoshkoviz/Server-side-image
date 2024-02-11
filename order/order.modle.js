const mongoose = require("mongoose");
require("./item.modle");
require("../user/usre.modle");

const orderSchema = new mongoose.Schema({
    userId: {
        //Creating a field that, when the requested value is entered,
        // will retrieve the data from the reference you entered
        type: mongoose.SchemaTypes.ObjectId,

        //Reference to the database from which the data is taken
        ref: "user",
        required: true,
    },
    items: [
        {
            itemId: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "item",
            },
            amount: {
                type: Number,
            },
        },
    ],
    orderDate: {
        type: Date,
        default: Date.now,
    },
});

const orderModel = mongoose.model("order", orderSchema);

//Creating an object with the required data
let order = {
    userId: "65b63ebac1550c77d6d39e37",
    items: [
        { itemId: "65b8e2e19de86e708a2c4a56", amount: 3 },
        { itemId: "65b8e2e19de86e708a2c4a57", amount: 1 },
        { itemId: "65b8e2e19de86e708a2c4a58", amount: 8 },
    ],
};

const addOrder = async () => {
    let newOrder = await orderModel.create(order);

    let result = await orderModel
    //Finding the object we just created
        .findOne({ _id: newOrder._id })
        //Gives an instruction to access the required database
        // with the data entered in the field
        .populate("userId")
        .populate("items.itemId");
    console.log("details of user " + result.userId);
    console.log("details of item " + result.items);
};

module.exports = { orderModel, addOrder };
