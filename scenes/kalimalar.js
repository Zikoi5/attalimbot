const {
  Markup,
  Scenes: { BaseScene },
} = require("telegraf");

const kalimalarScene = new BaseScene("KALIMALAR_SCENE");

const {
  kalimalar,
  kalimalarKeys,
  kalimalarTitles,
} = require("../common/kalimalar/files.js");

const KALIMANI_TANLANG = "Калималардан бирини танланг";

const messagesRemover = require("../utils/messages-remover.js");
const { BACK_BUTTON } = require("../common/buttons/back-button.js");

kalimalarScene.enter(async (ctx) => {
  ctx.scene.state.post_count = 1;
  const res = await ctx.reply(
    KALIMANI_TANLANG,
    Markup.keyboard([...kalimalarTitles, BACK_BUTTON], {
      columns: 2,
    }).resize()
  );

  ctx.scene.state.enter_text_message_id = res.message_id;

  return res;
});

kalimalarScene.leave((ctx) => {
  messagesRemover({ count: +ctx.scene.state.post_count || 0, ctx });
});

kalimalarScene.hears(BACK_BUTTON, async (ctx) => {
  const { message_id } = await ctx.reply("-", {
    reply_markup: { remove_keyboard: true },
  });

  await ctx.deleteMessage(message_id);
  await ctx.deleteMessage(ctx.scene.state.enter_text_message_id);
  ctx.scene.leave("KALIMALAR_SCENE");
});

kalimalarKeys.forEach((key) => {
  const fn = function (ctx) {
    messagesRemover({ count: +ctx.scene.state.post_count, ctx });
    kalimalar[key].handler(ctx);

    if (ctx.scene.state.post_count == 1) {
      ctx.scene.state.post_count = 4;
    }
  };
  kalimalarScene.hears(kalimalar[key].title, fn);
});

module.exports = kalimalarScene;
