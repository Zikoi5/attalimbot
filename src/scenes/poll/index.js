const {
  Markup,
  Scenes: { BaseScene },
} = require("telegraf");

const { BACK_BUTTON } = require("../../common/buttons/back-button.js");
const { removeCurrMessages } = require("../../utils/request-chain-methods.js");

const pollScene = new BaseScene("POLL_SCENE");

// eslint-disable-next-line no-unused-vars
const [QOSHISH_BTN, ROYXAT_BTN, TESTDAN_OTISH_BTN] = [
  "➕ Қўшиш",
  "📦 Рўйхат",
  "🎓 Тестдан ўтиш",
];

const SCENE_ADMIN_MARKUP_BUTTONS = [
  QOSHISH_BTN,
  // ROYXAT_BTN,
  TESTDAN_OTISH_BTN,
];

pollScene.enter(async (ctx) => {
  const is_admin = ctx.session.is_admin;

  if (!is_admin) {
    ctx.scene.enter("POLL:GROUP_SCENE");
    // ctx.scene.enter("POLL:BEGIN_SCENE");
    return ctx.scene.leave("POLL_SCENE");
  }

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
  await ctx.deleteMessage(ctx.message.message_id).catch(() => {});

  ctx.scene.leave("POLL_SCENE");
  ctx.scene.enter("MAIN_SCENE");
});

pollScene.hears(QOSHISH_BTN, (ctx) => {
  ctx.scene.enter("POLL:ADD_SCENE");
});

pollScene.hears(TESTDAN_OTISH_BTN, (ctx) => {
  ctx.scene.enter("POLL:GROUP_SCENE");
  return ctx.scene.leave("POLL_SCENE");
});

pollScene.leave(async (ctx) => {
  await removeCurrMessages(ctx);
  // ctx.scene.enter("MAIN_SCENE");
});

module.exports = pollScene;
