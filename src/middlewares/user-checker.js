const User = require("../mongo/models/user.js");
// const isDev = process.env.NODE_ENV === "development";
const CHECK_AUTH = Boolean(process.env.CHECK_AUTH);
const TEN_MINUTES = 1 * 60 * 1000

const getUserInfo = async (ctx, next) => {
  if (!ctx.session || !ctx?.from?.id) {
    return next()
  }

  if (!ctx.session.isChecked || ctx.session?.lastCheckedTime) {
    if (ctx.session?.lastCheckedTime && new Date().getTime() < ctx.session.lastCheckedTime + TEN_MINUTES) {
      ctx.session.isChecked = false;
      return next()
    }

    ctx.session.isChecked = true;
    ctx.session.lastCheckedTime = new Date().getTime();
    const user = await User.findOne({ telegram_chat_id: ctx.from.id });

    if (!user && CHECK_AUTH) {
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
