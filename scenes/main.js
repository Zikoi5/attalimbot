const {
  Markup,
  Scenes: { BaseScene },
} = require("telegraf");

const { commandsList } = require("../help.js");

// console.log("commandsList", commandsList);

const mainScene = new BaseScene("MAIN_SCENE");

mainScene.enter(async (ctx) => {
  const { message_id } = await ctx.reply(
    "Асосий бўлим",
    Markup.keyboard(commandsList, {
      columns: 2,
    }).resize()
  );

  ctx.scene.state.welcome_msg_id = message_id;
});

mainScene.hears("s", (ctx) => {
  ctx.replyWithHTML(
    `<pre>${
      (ctx.session && JSON.stringify(ctx.session, null, 2)) ||
      "Session is empty"
    }</pre>`
  );
});

mainScene.leave((ctx) => {
  return ctx.deleteMessage(ctx.scene.state.welcome_msg_id).catch(() => {});
});

module.exports = mainScene;
