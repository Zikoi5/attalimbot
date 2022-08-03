require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

const Sentry = require("@sentry/node");

const { helpTextLines } = require("./help.js");
const { BACK_BUTTON } = require("./common/buttons/back-button.js");

/* Scenes */
const AUTH_SCENE = require("./scenes/auth.js");
const { MAIN_SCENE, MAIN_BUTTONS } = require("./scenes/main.js");
const HARFLAR_SCENE = require("./scenes/harflar.js");
const KALIMALAR_SCENE = require("./scenes/kalimalar.js");
// const TALAFFUZ_SCENE = require("./scenes/tahlilul-tilavat.js");
const FURQON_SCENE = require("./scenes/furqon.js");
const ELON_SCENE = require("./scenes/elon.js");
const PROFILE_SCENE = require("./scenes/profile.js");
const POLL_SCENE = require("./scenes/poll/index.js");
const POLL_ADD_SCENE = require("./scenes/poll/add.js");
const POLL_BEGIN_SCENE = require("./scenes/poll/begin.js");

/* Middlewares */
const userChecker = require("./middlewares/user-checker.js");
const reviewReplyChecker = require("./middlewares/review-reply-checker.js");

const lessons = require("./lessons/top_5/index.js");

require("./plugins/dayjs.js");

const {
  Telegraf,
  Markup,
  session,
  Scenes: { Stage },
} = require("telegraf");

const mongodb = require("./mongo/index.js");

const bot = new Telegraf(process.env.BOT_TOKEN);

if (isProd) {
  Sentry.init({ dsn: process.env.SENTRY_DNS });
}

bot.catch((err) => {
  if (isDev) {
    console.error("Catched error", err);
    return;
  }

  if (isProd) {
    Sentry.captureException(err);
  }
});

(async function () {
  if (isDev) {
    bot.use(Telegraf.log());
  }

  await mongodb();

  bot.launch().then(() => {
    console.log(`Bot started. @${bot.botInfo.username}`);
  });
})();

const stage = new Stage([
  MAIN_SCENE,
  AUTH_SCENE,
  HARFLAR_SCENE,
  KALIMALAR_SCENE,
  // TALAFFUZ_SCENE,
  FURQON_SCENE,
  ELON_SCENE,
  PROFILE_SCENE,

  POLL_SCENE,
  POLL_ADD_SCENE,
  POLL_BEGIN_SCENE,
]);

bot.use(
  // poll bug fix
  session({
    getSessionKey: (ctx) => {
      if (!ctx) {
        return `:`;
      }

      // console.log("ctx", ctx);

      const { pollAnswer, from } = ctx;

      if (!pollAnswer && !from) {
        // console.log('no way');
        return ctx;
      }

      // for public quizzes
      if (pollAnswer?.user.id) {
        const { id } = pollAnswer.user;
        return `${id}:${id}`;
      }

      // fallback
      // ⚠️ Be careful, these values may not be available.
      return `${from.id}:${from.id}`;
    },
  })
);
bot.use(stage.middleware());
bot.use(userChecker);
bot.use(reviewReplyChecker);

bot.start(async (ctx) => {
  await ctx.reply(
    `Ассалааму алайкум ${
      ctx.message?.from?.first_name ||
      ctx.message?.from?.last_name ||
      ctx.message?.from?.username
    }`
  );

  await ctx.reply(helpTextLines);
  ctx.scene.enter("MAIN_SCENE");
});

bot.help((ctx) => ctx.reply(helpTextLines));

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
bot.command("kalimalar", (ctx) => ctx.scene.enter("KALIMALAR_SCENE"));
bot.command("nur", (ctx) => ctx.scene.enter("FURQON_SCENE"));
bot.command("darslar", darslarHandler);

bot.hears(MAIN_BUTTONS.HARFLAR_BTN, (ctx) => ctx.scene.enter("HARFLAR_SCENE"));
bot.hears(MAIN_BUTTONS.KALIMALAR_BTN, (ctx) =>
  ctx.scene.enter("KALIMALAR_SCENE")
);
// bot.hears(MAIN_BUTTONS.TALAFFUZ_BTN, (ctx) =>
//   ctx.scene.enter("TALAFFUZ_SCENE")
// );

bot.hears(MAIN_BUTTONS.DARSLAR_BTN, darslarHandler);

bot.hears(MAIN_BUTTONS.FURQON_BTN, (ctx) => ctx.scene.enter("FURQON_SCENE"));
bot.hears(MAIN_BUTTONS.PROFILE_BTN, (ctx) => ctx.scene.enter("PROFILE_SCENE"));
bot.hears(MAIN_BUTTONS.VIKTORINA_BTN, (ctx) => ctx.scene.enter("POLL_SCENE"));

bot.hears(BACK_BUTTON, (ctx) => ctx.scene.enter("MAIN_SCENE"));

bot.command("auth", (ctx) => ctx.scene.enter("AUTH_SCENE"));

function darslarHandler(ctx) {
  try {
    return ctx.replyWithHTML(
      "<b>Дарслардан бирини танланг</b>",
      Markup.inlineKeyboard([
        [Markup.button.callback("📖 Дарс 1", "dars_1")],
        [Markup.button.callback("📖 Дарс 2", "dars_2")],
        [Markup.button.callback("📖 Дарс 3", "dars_3")],
        [Markup.button.callback("📖 Дарс 4", "dars_4")],
        [Markup.button.callback("📖 Дарс 5", "dars_5")],
      ])
    );
  } catch (err) {
    console.error(err);
  }
}

bot.on("message", (ctx) => {
  //Fixme
  if (
    !ctx.session.current &&
    ![MAIN_BUTTONS.DARSLAR_BTN, "Darslar"].includes(ctx.message.text)
  ) {
    ctx.scene.enter("MAIN_SCENE");
    return ctx;
  }
});

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
