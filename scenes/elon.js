const {
  Markup,
  Scenes: { WizardScene },
} = require("telegraf");

// const getNumOfDocs = require("../mongo/methods/collectionCountFetcher.js");
const UserModel = require("../mongo/models/user");

const { BACK_BUTTON } = require("../common/buttons/back-button.js");
const { NO_ACCESS_BUTTON } = require("../common/buttons/no-way-button.js");
const {
  chainPromises,
  removeCurrMessages,
} = require("../utils/request-chain-methods.js");
const SEND_BUTTON = "🚀 Жўнатиш";
const MESSAGES_PER_SECOND = 28

const elonScene = new WizardScene(
  "ELON_SCENE",
  async (ctx) => {
    if (!ctx.session.is_admin) {
      await ctx.reply(NO_ACCESS_BUTTON);
      return ctx.scene.enter("MAIN_SCENE");
    }

    await ctx.replyWithMarkdown(
      `Эълон матнини киритинг, медиа файллар ҳам қўшиш мумкин.`,
      Markup.keyboard([BACK_BUTTON], { columns: 1 }).resize()
    );

    return ctx.wizard.next();
  },
  async (ctx) => {
    const announceMessage = ctx.message;
    ctx.wizard.state.announce_message = announceMessage;

    await ctx.replyWithMarkdown(
      `Жўнатишдан аввал текшириб олинг\nСиз ёзган эълон шундай шаклда етиб боради`,
      Markup.keyboard([SEND_BUTTON, BACK_BUTTON], { columns: 1 }).resize()
    );

    await ctx.telegram.copyMessage(
      ctx.message.from.id,
      ctx.message.from.id,
      announceMessage.message_id,
      {
        protect_content: true,
      }
    );

    return ctx.wizard.next();
  },

  async (ctx) => {
    try {
      const { message_id } = await ctx.replyWithMarkdown(`Илтимос кутинг....`, {
        reply_markup: { remove_keyboard: true },
      });

      // collect all users
      const count = await UserModel.find().count();
      const announceMessage = ctx.wizard.state.announce_message;

      const usersList = await UserModel.find({ limit: count });
      const usersListToIdList = usersList
        // .filter((item) => item.is_admin)
        .map((item) => +item.telegram_chat_id);

      let successfullySendCount = 0;
      let unSuccessfullySendCount = 0;

      const FROM_USER_ID = ctx.message.chat.id;

      const interval = Math.round(count / MESSAGES_PER_SECOND + 100);

      // eslint-disable-next-line no-unused-vars
      const promiseList = usersListToIdList.map((item, index) => {
        return function () {
          return new Promise((resolve) => {
            setTimeout(() => {
              ctx.telegram
                .copyMessage(FROM_USER_ID, FROM_USER_ID, announceMessage.message_id, {
                  protect_content: true,
                })
                .then(() => {
                  successfullySendCount += 1;
                  console.log("index ", index, "done");
                  resolve();
                })
                .catch((err) => {
                  console.error("Promise all [copyMessage]", err);
                  unSuccessfullySendCount += 1;
                  console.log("index ", index, "error");
                  resolve();
                });
            }, interval);
          });
        };
      });

      await chainPromises(promiseList);

      await ctx.deleteMessage(message_id);
      const succesPercent =
        (successfullySendCount / usersListToIdList.length) * 100;

      await ctx.replyWithMarkdown(
        `${
          usersListToIdList.length
        } тадан ${successfullySendCount} тасига (%${succesPercent.toFixed(
          0
        )}) га юборилди.`
      );

      if (unSuccessfullySendCount) {
        await ctx.replyWithMarkdown(
          `*${unSuccessfullySendCount} та фойдаланувчига юборишда хато юз берди.*`
        );
      }

      ctx.scene.enter("MAIN_SCENE");
      return ctx.scene.leave("ELON_SCENE");
    } catch (err) {
      console.log(err);
      await ctx.replyWithMarkdown(`Жўнатишда хато юз берди`);
      ctx.scene.enter("MAIN_SCENE");
      return ctx.scene.leave("ELON_SCENE");
    }
  }
);

elonScene.hears(BACK_BUTTON, (ctx) => {
  ctx.scene.enter("MAIN_SCENE");
  return ctx.scene.leave("ELON_SCENE");
});

elonScene.leave(async (ctx) => {
  // console.log("messages_to_delete", ctx.scene.state.messages_to_delete);
  await removeCurrMessages(ctx);
});

module.exports = elonScene;
