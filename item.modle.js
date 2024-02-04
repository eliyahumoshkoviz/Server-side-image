const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    barcode: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
    },
    emoji: {
        type: String,
    },
    sale: {
        type: String,
    },
    category: {
        type: String,
    },
});

const itemModel = mongoose.model("item", itemSchema);

const itemsArray = [
    {
        barcode: "123456789",
        name: "מוצר 1",
        price: 20.99,
        image: "image1.jpg",
        emoji: "😊",
        sale: "10% הנחה",
        category: "קטגוריה 1",
    },
    {
        barcode: "987654321",
        name: "מוצר 2",
        price: 15.5,
        image: "image2.jpg",
        emoji: "🌟",
        sale: "לא פעיל",
        category: "קטגוריה 2",
    },
    {
        barcode: "111222333",
        name: "מוצר 3",
        price: 50,
        image: "image3.jpg",
        emoji: "🎉",
        sale: "20% הנחה",
        category: "קטגוריה 1",
    },
    {
        barcode: "444555666",
        name: "מוצר 4",
        price: 10.99,
        image: "image4.jpg",
        emoji: "🍔",
        sale: "5% הנחה",
        category: "קטגוריה 3",
    },
    {
        barcode: "777888999",
        name: "מוצר 5",
        price: 30.5,
        image: "image5.jpg",
        emoji: "🎁",
        sale: "לא פעיל",
        category: "קטגוריה 2",
    },
];

// let addItem = async () => {
//     await itemModel.create(itemsArray);
// };

// addItem()
//     .then((result) => console.log(result))
//     .catch((error) => console.error(error));

module.exports = { itemModel };
