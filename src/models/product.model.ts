import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    // _id: {
    //     type: String,
    //     required: [true, "Please enter ID"]
    // },
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    photos: [
      {
        key: {
          type: String,
          required: [true, "Please enter Key"],
        },
        url: {
          type: String,
          required: [true, "Please enter URL"],
        },
      },
    ],
    price: {
      type: Number,
      required: [true, "Please add Price"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter Stock"],
    },
    category: {
      type: String,
      required: [true, "Please enter Product Category"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please enter Description"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", schema);
