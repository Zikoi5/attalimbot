const {
  Markup,
  Scenes: { BaseScene },
} = require("telegraf");

// const { getRandomPoll } = require("../../mongo/methods/pollMethods.js");

const {
  fetchUserPollResults,
  createUserPollResult,
  appendUserPollAnswer,
} = require("../../mongo/methods/pollMethods.js");
const UserModel = require("../../mongo/models/user");

const { BACK_BUTTON } = require("../../common/buttons/back-button.js");
const { removeCurrMessages } = require("../../utils/request-chain-methods.js");

const SCENE_NAME = "POLL:BEGIN_SCENE";
const POLL_MIN_TIMEOUT = 0;
// const KEYINGISI_BUTTON = "Кейинги тестга ўтиш ➡️";

const messagesGC = {
  append(ctx, message_id_list) {
    if (!ctx.scene.state.messages_to_delete) {
      ctx.scene.state.messages_to_delete = [];
    }

    ctx.scene.state.messages_to_delete = [
      ...ctx.scene.state.messages_to_delete,
      ...message_id_list,
    ];
  },

  list(ctx) {
    return ctx.scene.state.messages_to_delete;
  },

  clear(ctx) {
    delete ctx.scene.state.messages_to_delete;
  },

  async flush(ctx) {
    if (Array.isArray(ctx.scene.state.messages_to_delete)) {
      return Promise.all(
        ctx.scene.state.messages_to_delete.map((message_id) => {
          return ctx.deleteMessage(message_id).catch(() => {});
        })
      );
    }
  },
};

const pollBeginScene = new BaseScene(SCENE_NAME);

async function showTest(ctx) {
  const pollsList = ctx.scene.state.polls_list || [];
  const poll_group_id = ctx.scene.state.poll_group_id || null;
  const poll_result_id = ctx.scene.state.poll_result_id || null;
  const first_element = pollsList?.[0] || {};
  const { question, options, correct_option_id, _id } = first_element;
  const user_id = ctx.scene.state.user_id;

  await ctx
    .replyWithPoll(question, options, {
      correct_option_id,
      protect_content: true,
      is_anonymous: false,
      open_period: POLL_MIN_TIMEOUT,
      disable_notification: true,
      ...Markup.keyboard([BACK_BUTTON]).resize(),
    })
    .then(async ({ message_id, chat, poll }) => {
      ctx.scene.state.current_poll[poll.id] = {
        user_id,
        chat,
        poll,
        message_id,
        poll_group_id,
        poll_result_id,
        db_poll_id: _id,
        correct_option_id,
        ctx_main: ctx,
      };

      messagesGC.append(ctx, [message_id]);

      await ctx
        .reply(`Тестдан чиқиш учун "${BACK_BUTTON}" ни босинг`, {
          disable_notification: true,
          ...Markup.keyboard([BACK_BUTTON]).resize(),
        })
        .then((r) => {
          messagesGC.append(ctx, [r.message_id]);
        });

      const t = setTimeout(async () => {
        await ctx.stopPoll(message_id).catch(() => {});
        clearTimeout(t);
      }, (2 + POLL_MIN_TIMEOUT) * 1000);
    });
}

pollBeginScene.enter(async (ctx) => {
  try {
    ctx.scene.state.current_poll = {};
    const pollsList = ctx.scene.state.polls_list || [];
    const group_title = ctx.scene.state.poll_group_title || "";
    const poll_group_id = ctx.scene.state.poll_group_id || "";
    const telegram_chat_id = ctx.chat.id;
    const { _id: user_id } = await UserModel.findOne(
      { telegram_chat_id },
      { _id: 1 }
    );
    let userPollResults = await fetchUserPollResults({
      user_id,
    });

    ctx.scene.state.user_id = user_id;

    if (!userPollResults?._id) {
      const res = await createUserPollResult({
        user_id,
        poll_group_id,
        total_answers_count: pollsList.length,
      });
      userPollResults = res;
    } else if (
      userPollResults?.poll_answers_list?.length >=
      userPollResults?.answers.total
    ) {
      return ctx.replyWithMarkdown(
        `Сиз '${group_title}' тестини топшириб бўлгансиз`,
        {
          ...Markup.keyboard([BACK_BUTTON]).resize(),
        }
      );
    }

    ctx.scene.state.poll_result_id = userPollResults?._id;

    showTest(ctx);
  } catch (err) {
    console.error("pollBeginScene.enter", err);
  }
});

pollBeginScene.on("poll_answer", async (ctx) => {
  const {
    update: {
      poll_answer: { poll_id, option_ids },
    },
  } = ctx;

  const [answer_index] = option_ids;

  const {
    user_id,
    ctx_main,
    correct_option_id,
    poll_result_id,
    db_poll_id,
    ...current_poll
  } = ctx.scene?.state?.current_poll?.[poll_id] || {};

  if (current_poll.chat?.id) {
    let right = 0;
    let wrong = 0;

    if (correct_option_id === answer_index) {
      right = 1;
    } else {
      wrong = 1;
    }

    await appendUserPollAnswer({
      user_id,
      poll_result_id,
      poll_id: db_poll_id,
      answer_index,
      $inc: {
        "answers.right": right,
        "answers.wrong": wrong,
      },
    });

    await messagesGC.flush(ctx_main);

    ctx.scene.state.polls_list = ctx.scene.state.polls_list.slice(
      1,
      ctx.scene.state.polls_list.length
    );

    if (!Array.from(ctx.scene.state.polls_list).length) {
      await ctx_main.replyWithMarkdown(
        `Тест тугади, натижани кўриш учун ${ctx.scene.state.poll_group_title} тестга қайта киринг.`
      );

      return ctx_main.scene.enter("POLL:GROUP_SCENE");
    }

    await showTest(ctx_main);
  }
});

pollBeginScene.hears(BACK_BUTTON, async (ctx) => {
  try {
    await messagesGC.flush(ctx);

    ctx.scene.state.poll_list = {};
    delete ctx.session.polls_list;

    const is_admin = ctx.session.is_admin;

    if (!is_admin) {
      ctx.scene.enter("MAIN_SCENE");
      return ctx.scene.leave(SCENE_NAME);
    }

    ctx.scene.enter("POLL_SCENE");
    ctx.scene.leave(SCENE_NAME);
  } catch (err) {
    //
  }
});

pollBeginScene.leave(async (ctx) => {
  await removeCurrMessages(ctx);
  // ctx.scene.enter("MAIN_SCENE");
});

module.exports = pollBeginScene;
