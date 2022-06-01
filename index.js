require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const isDev = process.env.NODE_ENV === "development";

const Sentry = require("@sentry/node");

// eslint-disable-next-line no-unused-vars
const { helpTextLines, commandsList } = require("./help.js");

/* Scenes */
const AUTH_SCENE = require("./scenes/auth.js");
const MAIN_SCENE = require("./scenes/main.js");
const HARFLAR_SCENE = require("./scenes/harflar.js");
const KALIMALAR_SCENE = require("./scenes/kalimalar.js");

const lessons = require("./lessons/top_5/index.js");

const {
  Telegraf,
  Markup,
  session,
  Scenes: { Stage },
} = require("telegraf");

const mongodb = require("./mongo/index.js");

const bot = new Telegraf(process.env.BOT_TOKEN);

const deleteMessages = require("./utils/messages-remover.js");

Sentry.init({ dsn: process.env.SENTRY_DNS });

bot.catch((err) => {
  if (isDev) {
    console.error("Catched error", err);
    return;
  }

  Sentry.captureException(err);
});

if (isDev) {
  (async function () {
    // bot.use(Telegraf.log());

    await mongodb();

    bot.launch().then(() => {
      console.log(`Bot started. @${bot.botInfo.username}`);
    });
  })();
}

const stage = new Stage([
  MAIN_SCENE,
  AUTH_SCENE,
  HARFLAR_SCENE,
  KALIMALAR_SCENE,
]);

bot.use(session());
bot.use(stage.middleware());

bot.start(async (ctx) => {
  await ctx.reply(
    `Ассалааму алайкум ${
      ctx.message?.from?.first_name ||
      ctx.message?.from?.last_name ||
      ctx.message?.from?.username
    }`
  );

  ctx.reply(helpTextLines);
  ctx.scene.enter("MAIN_SCENE");
});

bot.help((ctx) => ctx.reply(helpTextLines));

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

bot.command("delete", async (ctx) => {
  if (isDev) {
    // const replyUserId = ctx?.update?.message?.chat?.id;
    // await ctx.reply(
    //   `ctx.update.chat.id \n\`${JSON.stringify(ctx.message, null, 2)}\``
    // );

    deleteMessages({ count: 100, ctx });
    // await ctx?.deleteMessage?.(replyUserId);
    // ctx.messages.deleteHistory()
  }
});

function replyLesson({ lesson, number }) {
  try {
    bot.action(lesson, async (ctx) => {
      const { message_id } = await ctx.reply("Юкланмоқда...");
      const replyUserId = ctx?.update?.callback_query?.from?.id;

      const lessonFileByNumber = lessons[`dars_${number}`];
      await ctx.telegram.sendDocument(replyUserId, lessonFileByNumber);

      await ctx.answerCbQuery();
      ctx.deleteMessage(message_id).catch(() => {});
    });
  } catch (err) {
    console.error(err);
  }
}

Array.from({ length: 5 }).forEach((_, index) => {
  const number = index + 1;
  replyLesson({ lesson: `dars_${number}`, number });
});

bot.command("harflar", (ctx) => ctx.scene.enter("HARFLAR_SCENE"));
bot.hears("Ҳарфлар", (ctx) => ctx.scene.enter("HARFLAR_SCENE"));

bot.command("kalimalar", (ctx) => ctx.scene.enter("KALIMALAR_SCENE"));
bot.hears("Калималар", (ctx) => ctx.scene.enter("KALIMALAR_SCENE"));

bot.command("auth", (ctx) => ctx.scene.enter("AUTH_SCENE"));

bot.command("darslar", darslarHandler);
bot.hears("Дарслар", darslarHandler);

function darslarHandler(ctx) {
  try {
    return ctx.replyWithHTML(
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
}

bot.telegram.setWebhook(process.env.BOT_WEBHOOK_URL);

exports.handler = async function (event, context, callback) {
  try {
    bot.handleUpdate(event);
    return callback(null, {
      statusCode: 200,
      body: "",
    });
  } catch (err) {
    Sentry.captureException(err);
  }
};

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
