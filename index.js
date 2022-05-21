require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const isDev = process.env.NODE_ENV === "development";

const helpjs = require("./help.js");
const lessons = require("./lessons/top_5/index.js");
const harflar = require("./scenes/harflar.js");
const kalimalar = require("./scenes/kalimalar.js");

const {
  Telegraf,
  Markup,
  session,
  Scenes: { Stage },
} = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

if (isDev) {
  bot.use(Telegraf.log());
}

bot.start(async (ctx) => {
  await ctx.reply(
    `Assalomu alaykum ${
      ctx.message?.from?.first_name ||
      ctx.message?.from?.last_name ||
      ctx.message?.from?.username
    }`
  );
  ctx.reply(helpjs);
});

bot.help((ctx) => ctx.reply(helpjs));

bot.command("darslar", (ctx) => {
  try {
    ctx.replyWithHTML(
      "<b>Дарслардан бирини танланг</b>",
      Markup.inlineKeyboard([
        [
          Markup.button.callback("📖 Дарс 1", "dars_1"),
          Markup.button.callback("📖 Дарс 2", "dars_2"),
        ],
        [
          Markup.button.callback("📖 Дарс 3", "dars_3"),
          Markup.button.callback("📖 Дарс 4", "dars_4"),
        ],
        [Markup.button.callback("📖 Дарс 5", "dars_5")],
      ])
    );
  } catch (err) {
    console.error(err);
  }
});

bot.on("contact", async (ctx) => {
  // console.log("contact handler ctx", JSON.stringify(ctx.update.message.contact))
  if (isDev) {
    await ctx.reply("Received contact:");
    ctx.reply(JSON.stringify(ctx.update.message.contact, null, 2));
  }
});

bot.on("document", async (ctx) => {
  // console.log("contact handler ctx", doc)
  if (isDev) {
    const doc = JSON.stringify(ctx.update.message.document, null, 2);
    await ctx.reply(`Received document: ${doc}`);
  }
});

// bot.on("edited_message", (ctx) => {
//   ctx.reply("Вы успешно изменили сообщение")
// })

bot.command("test", (ctx) => {
  if (isDev) {
    return ctx.reply(
      "Special buttons keyboard",
      Markup.keyboard([
        Markup.button.contactRequest("Send contact"),
        Markup.button.locationRequest("Send location"),
      ]).resize()
    );
  }
});

// eslint-disable-next-line no-unused-vars
bot.command("delete", async (ctx) => {
  if (isDev) {
    // const replyUserId = ctx?.update?.message?.chat?.id;
    return ctx.reply(
      `ctx.update.chat.id \n\`${JSON.stringify(ctx.message, null, 2)}\``
    );
    // await ctx?.deleteMessage?.(replyUserId);
    // ctx.messages.deleteHistory()
  }
});

function replyLesson({ lesson, number }) {
  try {
    bot.action(lesson, async (ctx) => {
      const { message_id } = await ctx.reply("Yuklanmoqda...");
      const replyUserId = ctx?.update?.callback_query?.from?.id;

      const lessonFileByNumber = lessons[`dars_${number}`];
      await ctx.telegram.sendDocument(replyUserId, lessonFileByNumber);

      await ctx.answerCbQuery();
      ctx.deleteMessage(message_id);
    });
  } catch (err) {
    console.error(err);
  }
}

Array.from({ length: 5 }).forEach((_, index) => {
  const number = index + 1;
  replyLesson({ lesson: `dars_${number}`, number });
});

const stage = new Stage([harflar, kalimalar]);

bot.use(session());
bot.use(stage.middleware());

bot.command("harflar", (ctx) => ctx.scene.enter("HARFLAR_SCENE"));
bot.command("kalimalar", (ctx) => ctx.scene.enter("KALIMALAR_SCENE"));
// bot.command("echo", (ctx) => ctx.scene.enter("echo"));

bot.launch().then(() => {
  console.log(`Bot started. @${bot.botInfo.username}`);
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
