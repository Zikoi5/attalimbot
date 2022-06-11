const User = require("../mongo/models/user.js");
const isDev = process.env.NODE_ENV === "development";

const getUserInfo = async (ctx, next) => {
  if (!ctx.session.isChecked) {
    ctx.session.isChecked = true;
    const user = await User.find({ telegram_chat_id: ctx.from.id });

    if (isDev) {
      console.log("user", user);
    }

    if (!user || !user?.length) {
      // ctx.session.language = user.language;
      // ctx.i18n.locale(user.language);
      ctx.reply("Ботда рўйхатдан ўтинг");
      return ctx.scene.enter("AUTH_SCENE");
    }
  }

  return next();
};

module.exports = getUserInfo;
