const {
  Markup,
  Scenes: { BaseScene },
} = require("telegraf");

const { NO_ACCESS_BUTTON } = require("../common/buttons/no-way-button.js");

// const { commandsList } = require("../help.js");

// console.log("commandsList", commandsList);

const mainScene = new BaseScene("MAIN_SCENE");

const BUTTONS = {
  DARSLAR_BTN: "📜 Дарслар",
  HARFLAR_BTN: "🔤 Ҳарфлар",
  KALIMALAR_BTN: "📄 Калималар",
  DUOLAR_BTN: "📄 Дуолар",
  // TALAFFUZ_BTN: "🔬 Калима топшириш",
  FURQON_BTN: "📔 Нур",
  VIKTORINA_BTN: "🌟 Викторина",
  PROFILE_BTN: "🆔 Маълумотларим",
};

const ANNOUNCE_BUTTON = "📢 Эълон жўнатиш";

const BUTTONS_LIST = Object.values(BUTTONS);

mainScene.enter(async (ctx) => {
  let combineButtonsList = BUTTONS_LIST;
  const is_admin = ctx.session.is_admin;

  if (is_admin) {
    combineButtonsList = [...combineButtonsList, ANNOUNCE_BUTTON];
  }

  const { message_id } = await ctx.reply(
    "Асосий бўлим",
    Markup.keyboard(combineButtonsList, {
      columns: 2,
    }).resize()
  );

  ctx.scene.state.welcome_msg_id = message_id;
});

mainScene.hears(ANNOUNCE_BUTTON, (ctx) => {
  if (!ctx.session.is_admin) {
    return ctx.reply(NO_ACCESS_BUTTON);
  }
  ctx.scene.enter("ELON_SCENE");
  ctx.scene.leave("MAIN_SCENE");
});

mainScene.hears(BUTTONS.PROFILE_BTN, (ctx) => {
  // if (!ctx.session.is_admin) {
  //   return ctx.reply(NO_ACCESS_BUTTON);
  // }

  ctx.scene.enter("PROFILE_SCENE");
  ctx.scene.leave("MAIN_SCENE");
});

mainScene.leave((ctx) => {
  return ctx.deleteMessage(ctx.scene.state.welcome_msg_id).catch(() => {});
});

module.exports = { MAIN_SCENE: mainScene, MAIN_BUTTONS: BUTTONS };
