const {
  Markup,
  Scenes: { BaseScene },
} = require("telegraf");

const {
  harflar,
  harflarKeys,
  harflarTitles,
} = require("../common/harflar/files.js");

const harflarScene = new BaseScene("HARFLAR_SCENE");

const ILTIMOS_HARF_TANLANG = "Қуйидаги ҳарфлардан бирини танланг";

const { BACK_BUTTON } = require("../common/buttons/back-button.js");
const { removeCurrMessages } = require("../utils/request-chain-methods.js");

harflarKeys.forEach((key) => {
  const fn = async function (ctx) {
    harflar[key].handler(ctx);
  };

  harflarScene.hears(harflar[key].title, fn);
});

harflarScene.enter(async (ctx) => {
  const res = await ctx.reply(
    ILTIMOS_HARF_TANLANG,
    Markup.keyboard([BACK_BUTTON, ...harflarTitles, BACK_BUTTON], {
      columns: 1,
    }).resize()
  );

  ctx.scene.state.enter_text_message_id = res.message_id;

  return res;
});

harflarScene.leave(async (ctx) => {
  // console.log("messages_to_delete", ctx.scene.state.messages_to_delete);
  await removeCurrMessages(ctx);
  ctx.scene.enter("MAIN_SCENE");
});

harflarScene.hears(BACK_BUTTON, async (ctx) => {
  await ctx.deleteMessage(ctx.message.message_id).catch(() => {});
  ctx.scene.leave("HARFLAR_SCENE");
});

// harflarScene.leave((ctx) => {
//   console.log("leave", ctx.scene);
// });

module.exports = harflarScene;
