const {
  Markup,
  Scenes: { BaseScene },
} = require("telegraf");

const duolarScene = new BaseScene("DUOLAR_SCENE");

const {
  duolar,
  duolarKeys,
  duolarTitles,
} = require("../common/duolar/files.js");

const TANLANG = "Танланг";

const { BACK_BUTTON } = require("../common/buttons/back-button.js");
const { removeCurrMessages } = require("../utils/request-chain-methods.js");

duolarScene.enter(async (ctx) => {
  const res = await ctx.reply(
    TANLANG,
    Markup.keyboard([BACK_BUTTON, ...duolarTitles, BACK_BUTTON], {
      columns: 1,
    }).resize()
  );

  ctx.scene.state.enter_text_message_id = res.message_id;

  return res;
});

duolarScene.leave(async (ctx) => {
  // console.log("messages_to_delete", ctx.scene.state.messages_to_delete);
  await removeCurrMessages(ctx);
  ctx.scene.enter("MAIN_SCENE");
});

duolarScene.hears(BACK_BUTTON, async (ctx) => {
  await ctx.deleteMessage(ctx.message.message_id).catch(() => {});
  ctx.scene.leave("DUOLAR_SCENE");
});

duolarKeys.forEach((key) => {
  const fn = function (ctx) {
    duolar[key].handler(ctx);
  };

  duolarScene.hears(duolar[key].title, fn);
});

module.exports = duolarScene;
