const {
  Markup,
  Scenes: { BaseScene },
} = require("telegraf");

const User = require("../mongo/models/user.js");
const { BACK_BUTTON } = require("../common/buttons/back-button.js");
const { removeCurrMessages } = require("../utils/request-chain-methods.js");

const profileScene = new BaseScene("PROFILE_SCENE");

profileScene.enter(async (ctx) => {
  const user = await User.findOne({ telegram_chat_id: ctx.message.from.id });

  // console.log("user", user);

  if (!user) {
    return ctx.reply(
      "Ҳеч қандай маълумот топилмади.",
      Markup.keyboard([BACK_BUTTON]).resize()
    );
  }

  const full_name = [user.first_name, user.last_name].filter(Boolean).join(" ");
  const userCreatedAt =
    (user.createdAt && $dayjs(user.createdAt).format("DD MMM YYYY HH:mm:ss")) ||
    "";

  const userLastLogin =
    (user.last_login_at &&
      $dayjs(user.last_login_at).format("DD MMM YYYY HH:mm:ss")) ||
    "";

  ctx.replyWithMarkdown(
    `Телефон рақами:\n${user.phone_number}\n\nФ.И.О:\n${full_name}\n\nРўйхатдан ўтилган сана:\n${userCreatedAt}\n\nБотдан охирги фойдаланилган вақт:\n${userLastLogin}\n\n`,
    {
      protect_content: true,
      ...Markup.keyboard([BACK_BUTTON]).resize(),
    }
  );
});

profileScene.hears(BACK_BUTTON, async (ctx) => {
  await ctx.deleteMessage(ctx.message.message_id).catch(() => {});
  ctx.scene.leave("PROFILE_SCENE");
});

profileScene.leave(async (ctx) => {
  // console.log("messages_to_delete", ctx.scene.state.messages_to_delete);
  await removeCurrMessages(ctx);
  ctx.scene.enter("MAIN_SCENE");
});

module.exports = profileScene;
