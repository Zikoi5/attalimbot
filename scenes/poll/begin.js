const {
  Markup,
  Scenes: { BaseScene },
} = require("telegraf");

const { getRandomPoll } = require("../../mongo/methods/pollMethods.js");

const { BACK_BUTTON } = require("../../common/buttons/back-button.js");
const { removeCurrMessages } = require("../../utils/request-chain-methods.js");

const SCENE_NAME = "POLL:BEGIN_SCENE";
const POLL_MIN_TIMEOUT = 60;
const KEYINGISI_BUTTON = "Кейинги тестга ўтиш ➡️";

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
  let sessionPollsList = ctx.session.polls_list || [];
  // console.log("sessionPollsList", sessionPollsList);

  const loadingMsg = await ctx.reply("Илтимос кутинг, юкланмоқда...", {
    disable_notification: true,
  });

  if (
    !sessionPollsList ||
    (sessionPollsList && !Array.from(sessionPollsList).length)
  ) {
    // const pollsList = await fetchPollsList();
    const { data, random_number, polls_count } = await getRandomPoll();

    if (ctx.scene.state.randomPollProps) {
      const oldRandomNumber = ctx.scene.state.randomPollProps.random_number;
      if (random_number == oldRandomNumber && 1 < polls_count) {
        await ctx.deleteMessage(loadingMsg.message_id);
        return showTest(ctx);
      }
    }

    ctx.scene.state.randomPollProps = {
      random_number,
      polls_count,
    };

    // console.log("pollsList", pollsList);

    ctx.session.polls_list = data || [];
    sessionPollsList = ctx.session.polls_list;
  }

  await ctx.deleteMessage(loadingMsg.message_id);

  const [first_element] = sessionPollsList;

  if (!first_element) {
    return;
  }

  const { question, options, correct_option_id } = first_element;

  await ctx
    .replyWithPoll(question, options, {
      correct_option_id,
      protect_content: true,
      is_anonymous: false,
      open_period: POLL_MIN_TIMEOUT,
      disable_notification: true,
      ...Markup.keyboard([KEYINGISI_BUTTON, BACK_BUTTON]).resize(),
    })
    .then(async (res) => {
      const { message_id, chat, poll } = res;
      ctx.scene.state.poll_list[poll.id] = {
        chat,
        poll,
        message_id,
        ctx_main: ctx,
      };

      messagesGC.append(ctx, [message_id]);

      await ctx
        .reply(`Тестдан чиқиш учун "${BACK_BUTTON}" ни босинг`, {
          disable_notification: true,
          ...Markup.keyboard([KEYINGISI_BUTTON, BACK_BUTTON]).resize(),
        })
        .then((r) => {
          messagesGC.append(ctx, [r.message_id]);
        });

      const t = setTimeout(async () => {
        delete ctx.scene.state[poll.id];
        delete ctx.session.polls_list;
        await ctx.stopPoll(message_id).catch(() => {});

        // await messagesGC.flush(ctx);

        // showTest(ctx);
        clearTimeout(t);
      }, (2 + POLL_MIN_TIMEOUT) * 1000);
    });
}

pollBeginScene.enter((ctx) => {
  ctx.scene.state.poll_list = {};
  ctx.scene.state.randomPollProps = {};

  showTest(ctx);
});

pollBeginScene.on("poll_answer", async (ctx) => {
  // console.log("poll_answer", ctx);
  const {
    update: { poll_answer },
  } = ctx;

  const pollProps = { ...ctx.scene.state.poll_list[poll_answer.poll_id] };

  // console.log("poll_answer session", session);
  // console.log("pollProps", pollProps);

  if (pollProps?.chat?.id) {
    await ctx.telegram
      .stopPoll(pollProps.chat.id, pollProps.message_id)
      .catch(() => {});

    delete ctx.scene.state.poll_list[poll_answer.poll_id];
    delete ctx.session.polls_list;
    await showTest(pollProps.ctx_main);
  }
});

pollBeginScene.hears(KEYINGISI_BUTTON, (ctx) => {
  ctx.scene.state.poll_list = {};
  delete ctx.session.polls_list;

  return showTest(ctx);
});

pollBeginScene.hears(BACK_BUTTON, async (ctx) => {
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
});

pollBeginScene.leave(async (ctx) => {
  await removeCurrMessages(ctx);
  // ctx.scene.enter("MAIN_SCENE");
});

module.exports = pollBeginScene;
