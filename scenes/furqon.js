const {
  Markup,
  Scenes: { BaseScene },
} = require("telegraf");

const furqonScene = new BaseScene("FURQON_SCENE");

const {
  suralar,
  suralarKeys,
  suralarTitles,
} = require("../common/furqon/files.js");

const SURANI_TANLANG = "Суралардан бирини танланг";

const { BACK_BUTTON } = require("../common/buttons/back-button.js");
const { removeCurrMessages } = require("../utils/request-chain-methods.js");

furqonScene.enter(async (ctx) => {
  const res = await ctx.reply(
    SURANI_TANLANG,
    Markup.keyboard([BACK_BUTTON, ...suralarTitles, BACK_BUTTON], {
      columns: 1,
    }).resize()
  );

  ctx.scene.state.enter_text_message_id = res.message_id;

  return res;
});

furqonScene.leave(async (ctx) => {
  // console.log("messages_to_delete", ctx.scene.state.messages_to_delete);
  await removeCurrMessages(ctx);
  ctx.scene.enter("MAIN_SCENE");
});

furqonScene.hears(BACK_BUTTON, async (ctx) => {
  const { message_id } = await ctx.reply("-", {
    reply_markup: { remove_keyboard: true },
  });

  await ctx.deleteMessage(ctx.message.message_id).catch(() => {});
  await ctx.deleteMessage(message_id).catch(() => {});
  await ctx
    .deleteMessage(ctx.scene.state.enter_text_message_id)
    .catch(() => {});
  ctx.scene.leave("FURQON_SCENE");
});

suralarKeys.forEach((key) => {
  const fn = function (ctx) {
    suralar[key].handler(ctx);
  };

  furqonScene.hears(suralar[key].title, fn);
});

module.exports = furqonScene;
