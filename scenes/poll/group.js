const {
  Markup,
  Scenes: { BaseScene },
} = require("telegraf");

const ObjectId = require("mongodb").ObjectId;

const PollGroup = require("../../mongo/models/poll_group.js");
const {
  fetchPollsList,
  fetchUserPollResults,
} = require("../../mongo/methods/pollMethods");
const UserModel = require("../../mongo/models/user");

const { BACK_BUTTON } = require("../../common/buttons/back-button.js");
const { removeCurrMessages } = require("../../utils/request-chain-methods.js");

const SCENE_NAME = "POLL:GROUP_SCENE";
const pollGroupScene = new BaseScene(SCENE_NAME);

pollGroupScene.enter(async (ctx) => {
  const pollGroupList = await PollGroup.find({}, { title: 1, polls_list: 1 });

  // console.log("pollGroupList", pollGroupList);
  ctx.scene.state.poll_group_list = {};

  const { message_id } = await ctx.replyWithMarkdown(
    `Тест рукнини танланг`,
    Markup.inlineKeyboard([
      pollGroupList.map((item) => {
        const handlerId = `poll_group_${item._id}`;
        ctx.scene.state.poll_group_list[item._id] = item;

        return Markup.button.callback(item.title, handlerId);
      }),
    ])
    // ...Markup.keyboard([BACK_BUTTON]).resize(),
  );

  ctx.scene.state.inlineKeyboardMessageId = message_id;
});

pollGroupScene.action(/^poll_group_(\w+)$/, async (ctx) => {
  // await ctx.answerCbQuery();
  const handlerId = ctx.match[1];
  const { title, polls_list } = ctx.scene.state.poll_group_list[handlerId];
  const telegram_chat_id = ctx.chat.id;
  const { _id: user_id } = await UserModel.findOne(
    { telegram_chat_id },
    { _id: 1 }
  );
  const { poll_answers_list = [], answers } = await fetchUserPollResults({
    user_id,
  });
  const idList = Array.from(polls_list).map((item) => ObjectId(item));
  const poll_answers_id_list =
    Array.from(poll_answers_list).map((item) => item.poll_id.toString()) || [];
  const filtered_poll_answers_id_list = idList.filter(
    (item) => !poll_answers_id_list.includes(item.toString())
  );
  const db_polls = await fetchPollsList({
    _id: {
      $in: filtered_poll_answers_id_list,
    },
    limit: 100,
  });

  // console.log("idList", idList);

  if (!db_polls.length) {
    if (!idList.length) {
      const text = `Бу тўпламда тестлар мавжуд эмас.`;
      await ctx.replyWithMarkdown(text, {
        ...Markup.keyboard([BACK_BUTTON]).resize(),
      });

      return ctx.answerCbQuery(text, {
        show_dialog: true,
      });
    }
  }

  if (answers && poll_answers_list.length >= answers.total) {
    const succesPercent = Math.round((answers.right / answers.total) * 100);
    const testState = (succesPercent >= 70 && "✅") || "❌";
    const text = `'${title}' тести натижалари - ${answers.right}/${answers.total} ${succesPercent}% ${testState}`;
    await ctx.replyWithMarkdown(text, {
      ...Markup.keyboard([BACK_BUTTON]).resize(),
    });

    return ctx.answerCbQuery(text, {
      show_dialog: true,
    });
  }

  await ctx.replyWithMarkdown(
    `Тест «${title}»\n\n❗️ <b>Илтимос, яхшилаб тайёрланиб, кейин бошланг. Қайта топшириш имконияти йўқ!</b>`,
    {
      ...Markup.keyboard([BACK_BUTTON]).resize(),
      parse_mode: "HTML",
    }
  );

  await ctx.answerCbQuery();

  await ctx
    .deleteMessage(ctx.scene.state.inlineKeyboardMessageId)
    .catch(() => {});

  ctx.scene.enter("POLL:BEGIN_SCENE", {
    // poll_id: item._id,
    poll_group_title: title,
    poll_group_id: handlerId,
    polls_list: db_polls,
  });
});

pollGroupScene.hears(BACK_BUTTON, async (ctx) => {
  const is_admin = ctx.session.is_admin;

  if (!is_admin) {
    ctx.scene.enter("MAIN_SCENE");
    return ctx.scene.leave(SCENE_NAME);
  }

  ctx.scene.enter("POLL_SCENE");
  ctx.scene.leave(SCENE_NAME);
});

pollGroupScene.leave(async (ctx) => {
  await removeCurrMessages(ctx);
  ctx.scene.leave();
});

module.exports = pollGroupScene;
