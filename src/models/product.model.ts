import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    // _id: {
    //     type: String,
    //     required: [true, "Please enter ID"]
    // },
    name: {
        type: String,
        required: [true, "Please enter Name"]
    },
    photo: {
        type: String,
        required: [true, "Please add Photo"]
    },
    price: {
        type: Number,
        required: [true, "Please add Price"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter Stock"]
    },
    category: {
        type: String,
        required: [true, "Please enter Product Category"],
        trim: true
    },
}, {timestamps: true});

export const Product = mongoose.model("Product", schema);