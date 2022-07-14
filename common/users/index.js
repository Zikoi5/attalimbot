// const { Pagination } = require("telegraf-pagination");

// const { fetchUsersList } = require("./mongo/methods/user.js");

// bot.hears("t", async (ctx) => {
//   const data = await fetchUsersList({ limit: 100 });
//   const pagination = new Pagination({
//     data,
//     header: (currentPage, pageSize, total) =>
//       `${currentPage}-page of total ${total}`, // optional. Default value: 👇
//     // `Items ${(currentPage - 1) * pageSize + 1 }-${currentPage * pageSize <= total ? currentPage * pageSize : total} of ${total}`;
//     format: (item, index) =>
//       `${index + 1}. ${[item.first_name, item.last_name]
//         .filter(Boolean)
//         .join(" ")}`, // optional. Default value: 👇
//     // `${index + 1}. ${item}`;
//     pageSize: 16, // optional. Default value: 10
//     rowSize: 4, // optional. Default value: 5 (maximum 8)
//     onSelect: (item) => {
//       const { phone_number, first_name, last_name, username } = item;
//       ctx.reply(`${phone_number}\n${first_name || ''} ${last_name || ''} ${username || ''}`);
//     }, // optional. Default value: empty function
//     messages: {
//       // optional
//       firstPage: "First page", // optional. Default value: "❗️ That's the first page"
//       lastPage: "Last page", // optional. Default value: "❗️ That's the last page"
//       prev: "◀️", // optional. Default value: "⬅️"
//       next: "▶️", // optional. Default value: "➡️"
//       delete: "", // optional. Default value: "❌"
//     },
//   });

//   pagination.handleActions(bot); // pass bot or scene instance as a parameter

//   let text = await pagination.text(); // get pagination text
//   let keyboard = await pagination.keyboard(); // get pagination keyboard
//   ctx.replyWithHTML(text, keyboard);
// });

// eslint-disable-next-line no-unused-vars
// function getPagination(current, maxpage) {
//   const keys = [];
//   if (current > 1) keys.push({ text: `«1`, callback_data: "1" });
//   if (current > 2)
//     keys.push({
//       text: `‹${current - 1}`,
//       callback_data: (current - 1).toString(),
//     });
//   keys.push({ text: `-${current}-`, callback_data: current.toString() });
//   if (current < maxpage - 1)
//     keys.push({
//       text: `${current + 1}›`,
//       callback_data: (current + 1).toString(),
//     });
//   if (current < maxpage)
//     keys.push({ text: `${maxpage}»`, callback_data: maxpage.toString() });

//   return {
//     reply_markup: JSON.stringify({
//       inline_keyboard: [keys],
//     }),
//   };
// }

// const bookPages = 100;

// bot.on("callback_query", function (ctx) {
//   // console.log("ctx", ctx);
//   const callback_query = ctx.update?.callback_query;
//   const msg = callback_query?.message;
//   const editOptions = Object.assign(
//     {},
//     getPagination(1, bookPages),
//     { chat_id: msg.chat.id, message_id: msg.message_id }
//   );
//   ctx.editMessageText("Page: updated", editOptions);
// });