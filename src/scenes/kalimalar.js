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

const { BACK_BUTTON } = require("../common/buttons/back-button.js");
const { removeCurrMessages } = require("../utils/request-chain-methods.js");

kalimalarScene.enter(async (ctx) => {
  const res = await ctx.reply(
    KALIMANI_TANLANG,
    Markup.keyboard([BACK_BUTTON, ...kalimalarTitles, BACK_BUTTON], {
      columns: 1,
    }).resize()
  );

  ctx.scene.state.enter_text_message_id = res.message_id;

  return res;
});

kalimalarScene.leave(async (ctx) => {
  // console.log("messages_to_delete", ctx.scene.state.messages_to_delete);
  await removeCurrMessages(ctx);
  ctx.scene.enter("MAIN_SCENE");
});

kalimalarScene.hears(BACK_BUTTON, async (ctx) => {
  await ctx.deleteMessage(ctx.message.message_id).catch(() => {});
  ctx.scene.leave("KALIMALAR_SCENE");
});

kalimalarKeys.forEach((key) => {
  const fn = function (ctx) {
    kalimalar[key].handler(ctx);
  };

  kalimalarScene.hears(kalimalar[key].title, fn);
});

module.exports = kalimalarScene;
