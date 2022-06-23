const { Schema, model } = require("mongoose");

const User = new Schema(
  {
    username: {
      type: String,
      sparse:true
    },
    phone_number: {
      type: String,
      // unique: true,
      sparse:true
    },
    telegram_chat_id: {
      type: String,
    },

    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },

    last_login_at: {
      type: Date,
    },

    phone_number_verified: {
      type: Boolean,
    },

    working_hours: {
      type: Array
    },

    cash: {
      type: Number,
      default: 0
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", User);
