const User = require("../mongo/models/user.js");
// const isDev = process.env.NODE_ENV === "development";
const CHECK_AUTH = Boolean(process.env.CHECK_AUTH);

const getUserInfo = async (ctx, next) => {
  if (!ctx.session.isChecked) {
    ctx.session.isChecked = true;
    const user = await User.findOne({ telegram_chat_id: ctx.from.id });

    // if (isDev) {
    //   console.log("user", user);
    // }

    if (!user && CHECK_AUTH) {
      // ctx.session.language = user.language;
      // ctx.i18n.locale(user.language);
      ctx.reply("Ботда рўйхатдан ўтинг");
      return ctx.scene.enter("AUTH_SCENE");
    }

    const currTime = new Date().getTime();

    await User.updateOne(
      { telegram_chat_id: +user.telegram_chat_id },
      {
        $set: { last_login_at: currTime },
      }
    );

    ctx.session.is_admin = !!user.is_admin;
  }

  return next();
};

module.exports = getUserInfo;
