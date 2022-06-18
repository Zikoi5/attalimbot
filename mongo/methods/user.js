const UserModel = require("../models/user");

const DEFAULT_LIMIT = 10;

module.exports = {
  async fetchUsersList(params) {
    const { limit = DEFAULT_LIMIT, skip = 0, ...props } = params || {};
    const users = await UserModel.find({ ...props }, { __v: 0, updated_at: 0 })
      .skip(+skip || 0)
      .limit(+limit);
    return users;
  },

  async storeUser({ ctx, contact } = {}) {
    const ctxUser = ctx?.message?.from || {};
    const user = await UserModel.findOne(
      { telegram_chat_id: ctx.message.from.id },
      { __v: 0 }
    );

    let res = null;

    const { id, username } = ctxUser;
    const { phone_number, first_name, last_name } = contact;

    if (user) {
      const currTime = new Date().getTime();

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
        phone_number,
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
