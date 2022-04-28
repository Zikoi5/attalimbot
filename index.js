const { Telegraf, Markup } = require("telegraf")
require("dotenv").config()
const helpjs = require("./help.js")

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(async (ctx) => {
  await ctx.reply(
    `Assalomu alaykum ${
      ctx.message?.from?.first_name ||
      ctx.message?.from?.last_name ||
      ctx.message?.from?.username
    }`
  )
  ctx.reply(helpjs)
})
bot.help((ctx) => ctx.reply(helpjs))

bot.command("/darslar", (ctx) => {
  try {
    ctx.replyWithHTML(
      "<b>Darslardan birini tanlang</b>",
      Markup.inlineKeyboard([
        [
          Markup.button.callback("📖 Dars 1", "dars_1"),
          Markup.button.callback("📖 Dars 2", "dars_2"),
        ]
        [
          Markup.button.callback("📖 Dars 3", "dars_3"),
          Markup.button.callback("📖 Dars 4", "dars_4"),
        ],
        [
          Markup.button.callback("📖 Dars 5", "dars_5")
        ]
        // [Markup.button.callback("📖 Dars test", "dars_test")]
      ])
    )
  } catch (err) {
    console.error(err)
  }
})

bot.action("dars_test", async (ctx) => {
  const t = await ctx.reply("loading...")

  setTimeout(() => {
    console.log("t", t)
    ctx.deleteMessage(t.message_id)
  }, 1000)
})

function replyLesson({ lesson, number }) {
  try {
    bot.action(lesson, async (ctx) => {
      const { message_id } = await ctx.reply("Yuklanmoqda...")
      await ctx.replyWithDocument({
        source: `./assets/pdf/${number}-дарс.pdf`
      })
      await ctx.answerCbQuery()
      ctx.deleteMessage(message_id)
    })
  } catch (err) {
    console.error(err)
  }
}

Array.from({ length: 5 }).forEach((_, index) => {
  const number = index + 1
  replyLesson({ lesson: `dars_${number}`, number })
})

bot.launch()

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"))
process.once("SIGTERM", () => bot.stop("SIGTERM"))
