const {
  Markup,
  Scenes: { BaseScene },
} = require("telegraf");

// const Poll = require("../mongo/models/poll.js");

const { BACK_BUTTON } = require("../../common/buttons/back-button.js");
const { removeCurrMessages } = require("../../utils/request-chain-methods.js");

const pollScene = new BaseScene("POLL_SCENE");

const [QOSHISH_BTN, ROYXAT_BTN, TESTDAN_OTISH_BTN] = [
  "➕ Қўшиш",
  "📦 Рўйхат",
  "🎓 Тестдан ўтиш",
];

const SCENE_ADMIN_MARKUP_BUTTONS = [QOSHISH_BTN, ROYXAT_BTN, TESTDAN_OTISH_BTN];

pollScene.enter(async (ctx) => {
  const res = await ctx.reply(
    "Бўлимни танланг",
    Markup.keyboard([...SCENE_ADMIN_MARKUP_BUTTONS, BACK_BUTTON], {
      columns: 2,
    }).resize()
  );

  ctx.scene.state.enter_text_message_id = res.message_id;

  return res;
});


pollScene.hears(BACK_BUTTON, async (ctx) => {
  const { message_id } = await ctx.reply("-", {
    reply_markup: { remove_keyboard: true },
  });

  await ctx.deleteMessage(ctx.message.message_id).catch(() => {});
  await ctx.deleteMessage(message_id).catch(() => {});
  await ctx
    .deleteMessage(ctx.scene.state.enter_text_message_id)
    .catch(() => {});

  ctx.scene.leave("POLL_SCENE");
});

pollScene.hears(QOSHISH_BTN, (ctx) => {
  ctx.scene.enter("POLL:ADD_SCENE");
});

pollScene.leave(async (ctx) => {
  await removeCurrMessages(ctx);
  // ctx.scene.enter("MAIN_SCENE");
});

module.exports = pollScene;
