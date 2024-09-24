const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String, // store image URL or path
    },
    sellType: {
      type: String,
      enum: ["normal", "bidding"], // allowed values
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    categories: {
      type: [String],
      enum: ["decoration", "collective", "dailyuse"], // categories

      validate: {
        validator: function (value) {
          return value.length >= 1 && value.length <= 3;
        },
        message: "Select at least 1 and at most 3 categories.",
      },
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Products", productSchema);
module.exports = Products;
