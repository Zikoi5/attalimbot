const {
  Markup,
  Scenes: { BaseScene },
} = require("telegraf");

// const { commandsList } = require("../help.js");

// console.log("commandsList", commandsList);

const mainScene = new BaseScene("MAIN_SCENE");

const BUTTONS = {
  DARSLAR_BTN: "📜 Дарслар",
  HARFLAR_BTN: "🔤 Ҳарфлар",
  KALIMALAR_BTN: "📄 Калималар",
  // TALAFFUZ_BTN: "🔬 Калима топшириш",
  FURQON_BTN: "📔 Нур",
};

const BUTTONS_LIST = Object.values(BUTTONS);

mainScene.enter(async (ctx) => {
  const { message_id } = await ctx.reply(
    "Асосий бўлим",
    Markup.keyboard(BUTTONS_LIST, {
      columns: 2,
    }).resize()
  );

  ctx.scene.state.welcome_msg_id = message_id;
});

mainScene.hears("s", (ctx) => {
  return ctx.replyWithHTML(
    `<pre>${
      (ctx.session && JSON.stringify(ctx.session, null, 2)) ||
      "Session is empty"
    }</pre>`
  );
});

mainScene.leave((ctx) => {
  return ctx.deleteMessage(ctx.scene.state.welcome_msg_id).catch(() => {});
});

module.exports = { MAIN_SCENE: mainScene, MAIN_BUTTONS: BUTTONS };
