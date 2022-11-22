// bot.command("test", (ctx) => {
//   if (isDev) {
//     return ctx.reply(
//       "Special buttons keyboard",
//       Markup.keyboard([
//         Markup.button.contactRequest("Send contact"),
//         Markup.button.locationRequest("Send location"),
//       ]).resize()
//     );
//   }
// });

// bot.on("document", async (ctx) => {
//   // console.log("contact handler ctx", doc)
//   if (isDev) {
//     const doc = JSON.stringify(ctx.update.message.document, null, 2);
//     await ctx.reply(`Received document: ${doc}`);
//   }
// });

// bot.command("delete", async (ctx) => {
//   if (isDev) {
//     // const replyUserId = ctx?.update?.message?.chat?.id;
//     // await ctx.reply(
//     //   `ctx.update.chat.id \n\`${JSON.stringify(ctx.message, null, 2)}\``
//     // );

//     deleteMessages({ count: 100, ctx });
//     // await ctx?.deleteMessage?.(replyUserId);
//     // ctx.messages.deleteHistory()
//   }
// });