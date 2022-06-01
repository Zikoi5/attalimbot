const SmsCodeModel = require("../models/smsCode.js");

module.exports = {
  storeSmsCode({ id, code }) {
    return SmsCodeModel.create({
      telegram_chat_id: id,
      code,
      created_at: new Date().getTime(),
    });
  },
};
