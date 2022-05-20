const {
  // eslint-disable-next-line no-unused-vars
  Scenes: { Stage, BaseScene },
} = require("telegraf");
// const { enter, leave } = Stage;

const authScene = new BaseScene("auth");

authScene.enter(async (ctx) => {
  await ctx.reply("echo scene");
});

authScene.leave((ctx) => ctx.reply("exiting echo scene"));
authScene.hears("de", (ctx) => ctx.reply("Deeee"));
// authScene.on("text", (ctx) => ctx.reply(ctx.message.text));
authScene.on("message", (ctx) => ctx.reply("Only text messages please"));

module.exports = authScene;

// const { enter, leave } = Stage;
// // Greeter scene
// const greeterScene = new BaseScene("greeter");
// greeterScene.enter((ctx) => ctx.reply("Hi"));
// greeterScene.leave((ctx) => ctx.reply("Bye"));
// greeterScene.hears("hi", enter("greeter"));
// greeterScene.hears("quit", leave());
// // greeterScene.on("message", (ctx) => ctx.replyWithMarkdown("Send `hi`"));
// // Echo scene
// const echoScene = new BaseScene("echo");
// echoScene.enter((ctx) => ctx.reply("echo scene"));
// echoScene.leave((ctx) => ctx.reply("exiting echo scene"));
// echoScene.hears("de", (ctx) => ctx.reply("Deeee"));
// echoScene.command("back", leave());
// // echoScene.on("text", (ctx) => ctx.reply(ctx.message.text));
// echoScene.on("message", (ctx) => ctx.reply("Only text messages please"));
