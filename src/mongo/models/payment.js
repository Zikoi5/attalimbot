const { Schema, model } = require("mongoose");

const Payment = new Schema(
  {
    date: {
      type: Date,
    },
    user_id: {
      type: String,
      ref: "User",
    },
    amount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Payment", Payment);
