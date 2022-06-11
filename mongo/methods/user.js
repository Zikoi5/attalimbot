const UserModel = require("../models/user");

module.exports = {
  async storeUser({ ctx, contact } = {}) {
    const ctxUser = ctx?.message?.from || {};
    const user = await UserModel.findOne(
      { telegram_chat_id: ctx.message.from.id },
      { __v: 0 }
    );

    let res = null;

    const { id, username } = ctxUser;
    const { phone_number, first_name, last_name } = contact;
    const currTime = new Date().getTime();

    if (user) {
      res = await UserModel.updateOne(
        { telegram_chat_id: id },
        {
          $set: { last_login_at: currTime },
        }
      );
    } else {
      res = await UserModel.create({
        telegram_chat_id: id,
        username,
        phone_number: phone_number,
        first_name,
        last_name,
      });
    }

    return Promise.resolve(res);
  },

  updateUser({ selector, data } = {}) {
    return UserModel.updateOne(selector, data);
  },
};