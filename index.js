const { Telegraf, Markup } = require("telegraf");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const isDev = process.env.NODE_ENV === "development";

const helpjs = require("./help.js");
const lessons = require("./lessons/top_5/index.js");

const {
  TOYYIBA_KALIMASI,
  SHAHODAT_KALIMASI,
  TAVHID_KALIMASI,
  RODDIL_KUFR_KALIMASI,
  ISTIGFOR_KALIMASI,
  TAMJID_KALIMASI,
  IYMON_KALIMASI,
  MUJMAL_KALIMASI,
  MUFASSAL_KALIMASI,
} = require("./kalimalar.js");

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
      "<b>Darslardan birini tanlang</b>",
      Markup.inlineKeyboard([
        [
          Markup.button.callback("📖 Dars 1", "dars_1"),
          Markup.button.callback("📖 Dars 2", "dars_2"),
        ],
        [
          Markup.button.callback("📖 Dars 3", "dars_3"),
          Markup.button.callback("📖 Dars 4", "dars_4"),
        ],
        [Markup.button.callback("📖 Dars 5", "dars_5")],
      ])
    );
  } catch (err) {
    console.error(err);
  }
});

bot.command("kalimalar", async (ctx) => {
  return await ctx.reply(
    "Kalimalardan birini tanlang",
    Markup.keyboard(
      [
        TOYYIBA_KALIMASI.title,
        SHAHODAT_KALIMASI.title,
        TAVHID_KALIMASI.title,
        RODDIL_KUFR_KALIMASI.title,
        ISTIGFOR_KALIMASI.title,
        TAMJID_KALIMASI.title,
        IYMON_KALIMASI.title,
        MUJMAL_KALIMASI.title,
        MUFASSAL_KALIMASI.title,
      ],
      {
        columns: 2,
      }
    )
  );
});

bot.hears(TOYYIBA_KALIMASI.title, TOYYIBA_KALIMASI.handler);
bot.hears(SHAHODAT_KALIMASI.title, SHAHODAT_KALIMASI.handler);
bot.hears(TAVHID_KALIMASI.title, TAVHID_KALIMASI.handler);
bot.hears(RODDIL_KUFR_KALIMASI.title, RODDIL_KUFR_KALIMASI.handler);
bot.hears(ISTIGFOR_KALIMASI.title, ISTIGFOR_KALIMASI.handler);
bot.hears(TAMJID_KALIMASI.title, TAMJID_KALIMASI.handler);
bot.hears(IYMON_KALIMASI.title, IYMON_KALIMASI.handler);
bot.hears(MUJMAL_KALIMASI.title, MUJMAL_KALIMASI.handler);
bot.hears(MUFASSAL_KALIMASI.title, MUFASSAL_KALIMASI.handler);

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

bot.launch().then(() => {
  console.log(`Bot started. @${bot.botInfo.username}`);
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
