const { Schema, model } = require("mongoose");

const voiceRequest = new Schema(
  {
    username: {
      type: String,
    },

    telegram_chat_id: {
      type: String,
      required: true,
    },

    first_name: {
      type: String,
    },

    last_name: {
      type: String,
    },

    voice: {
      type: Object,
      required: true,
    },

    kalima_nomi: {
      type: String,
      required: true,
    },

    review_messages: []
  },
  {
    timestamps: true,
  }
);

module.exports = model("tilavatRequest", voiceRequest);
