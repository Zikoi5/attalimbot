const {
  Markup,
  Scenes: { BaseScene },
} = require("telegraf");

const {
  harflar,
  harflarKeys,
  harflarTitles,
} = require("../common/harflar/files.js");
const messagesRemover = require("../utils/messages-remover.js");

const harflarScene = new BaseScene("HARFLAR_SCENE");

const ILTIMOS_HARF_TANLANG = "Қуйидаги ҳарфлардан бирини танланг";
const { BACK_BUTTON } = require("../common/buttons/back-button.js");

harflarKeys.forEach((key) => {
  const fn = function (ctx) {
    messagesRemover({ count: +ctx.scene.state.post_count, ctx });
    harflar[key].handler(ctx);

    if (ctx.scene.state.post_count == 1) {
      ctx.scene.state.post_count = 3;
    }
  };
  harflarScene.hears(harflar[key].title, fn);
});

harflarScene.enter(async (ctx) => {
  ctx.scene.state.post_count = 1;
  const res = await ctx.reply(
    ILTIMOS_HARF_TANLANG,
    Markup.keyboard([BACK_BUTTON, ...harflarTitles, BACK_BUTTON], {
      columns: 1,
    }).resize()
  );

  ctx.scene.state.enter_text_message_id = res.message_id;

  return res;
});

harflarScene.leave((ctx) => {
  messagesRemover({ count: +ctx.scene.state.post_count || 0, ctx });
});

harflarScene.hears(BACK_BUTTON, async (ctx) => {
  const { message_id } = await ctx.reply("-", {
    reply_markup: { remove_keyboard: true },
  });

  await ctx.deleteMessage(message_id);
  await ctx.deleteMessage(ctx.scene.state.enter_text_message_id);
  ctx.scene.leave("HARFLAR_SCENE");
});

// harflarScene.leave((ctx) => {
//   console.log("leave", ctx.scene);
// });

module.exports = harflarScene;
