const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: Buffer
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true,
    },
    userCarts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
})

const Item = mongoose.model("Item", itemSchema)

module.exports = Item