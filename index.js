const { Telegraf, Markup } = require("telegraf")
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

const helpjs = require("./help.js")
const lessons = require("./lessons/top_5/index.js")

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
          Markup.button.callback("📖 Dars 2", "dars_2")
        ],
        [
          Markup.button.callback("📖 Dars 3", "dars_3"),
          Markup.button.callback("📖 Dars 4", "dars_4")
        ],
        [Markup.button.callback("📖 Dars 5", "dars_5")]
        // [Markup.button.callback("📖 Dars test", "dars_test")]
      ])
    )
  } catch (err) {
    console.error(err)
  }
})

bot.command("test", (ctx) => {
  return ctx.reply(
    "Special buttons keyboard",
    Markup.keyboard([
      Markup.button.contactRequest("Send contact"),
      Markup.button.locationRequest("Send location")
    ]).resize()
  )
})

bot.on("dars_test", async (ctx) => {
  const t = await ctx.reply("loading...")

  setTimeout(() => {
    console.log("t", t)
    ctx.deleteMessage(t.message_id)
  }, 1000)
})

bot.on("contact", async (ctx) => {
  // console.log("contact handler ctx", JSON.stringify(ctx.update.message.contact))
  await ctx.reply("Received contact:")
  ctx.reply(JSON.stringify(ctx.update.message.contact, null, 2))
})

bot.on("document", async (ctx) => {
  const doc = JSON.stringify(ctx.update.message.document, null, 2)
  // console.log("contact handler ctx", doc)
  await ctx.reply(`Received document: ${doc}`)
})

// bot.on("edited_message", (ctx) => {
//   ctx.reply("Вы успешно изменили сообщение")
// })

function replyLesson({ lesson, number }) {
  try {
    bot.action(lesson, async (ctx) => {
      const { message_id } = await ctx.reply("Yuklanmoqda...")
      const replyUserId = ctx?.update?.callback_query?.from?.id

      const lessonFileByNumber = lessons[`dars_${number}`]
      await ctx.telegram.sendDocument(replyUserId, lessonFileByNumber)

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

bot.launch().then(() => {
  console.log(`Bot started. @${bot.botInfo.username}`)
})

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"))
process.once("SIGTERM", () => bot.stop("SIGTERM"))
