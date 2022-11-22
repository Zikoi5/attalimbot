const { Schema, model } = require("mongoose");

const smsCode = Schema({
  code: {
    type: String,
    required: true,
  },

  telegram_chat_id: {
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
  },
});

module.exports = model("SmsCode", smsCode);
