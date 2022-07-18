const {
  Markup,
  Scenes: { WizardScene },
} = require("telegraf");

const PollModel = require("../../mongo/models/poll.js");
const { BACK_BUTTON } = require("../../common/buttons/back-button.js");

const SAVE_BUTTON = "💾 Сақлаш";
const YES_BUTTON = "Ҳа";

const pollAddScene = new WizardScene(
  "POLL:ADD_SCENE",
  async (ctx) => {
    ctx.wizard.state.form = {};

    await ctx.replyWithMarkdown(
      `⚠️ Тест қўшишда мухум нарса 3 та. Савол, жавоб вариантлари ва тўғри жавоб варианти.\n\nСаволни киритинг:\n\nМасалан: 3 дан кейин неча сони келади?`,
      Markup.keyboard([BACK_BUTTON]).resize()
    );

    return ctx.wizard.next();
  },

  async (ctx) => {
    const question = ctx.message.text;

    if (!question) {
      return ctx.reply(
        "⚠️ Илтимос, саволни киритинг",
        Markup.keyboard([BACK_BUTTON]).resize()
      );
    }

    ctx.wizard.state.form.question = question;

    await ctx.reply(
      `Жавоб вариантларини киритинг:\n\nМасалан:\n1\n4\n3\n6\n\nТўғри жавоб варианти олдига * ёзинг, мисол\n\n1\n4\n3\n*6`,
      Markup.keyboard([BACK_BUTTON]).resize()
    );

    return ctx.wizard.next();
  },

  async (ctx) => {
    const options = ctx.message?.text?.split?.("\n");
    if (!options || !Array.isArray(options)) {
      return ctx.reply(
        "⚠️ Тўғри жавоб вариантини киритинг!",
        Markup.keyboard([BACK_BUTTON]).resize()
      );
    }

    ctx.wizard.state.form.options = options;

    const correct_option_index = options.findIndex(
      (item) => ~item.indexOf("*")
    );

    // console.log("correct_option_index", correct_option_index);

    if (correct_option_index == -1) {
      return ctx.reply(
        "Тўғри жавоб варианти киритилмаган, бунинг учун тўғри жавоб варианти олдига * ёзинг, мисол\n\n1\n4\n3\n*6",
        Markup.keyboard([BACK_BUTTON]).resize()
      );
    }

    const correct_option_elem = options[correct_option_index].replace(
      /^(\*)/,
      ""
    );

    // console.log("correct_option_elem", correct_option_elem);

    if (!correct_option_elem) {
      console.error("correct_option_elem", correct_option_elem);
      return;
    }

    options[correct_option_index] = correct_option_elem;

    const { question } = ctx.wizard.state.form;

    ctx.wizard.state.form.correct_option_id = correct_option_index;

    // console.log("ctx.wizard.state.form", ctx.wizard.state.form);

    await ctx.reply(
      "Тестни сақлашдан олдин текшириб олинг, бундай кўринишда бўлади:",
      Markup.keyboard([BACK_BUTTON]).resize()
    );

    await ctx.replyWithPoll(question, options, {
      correct_option_id: correct_option_index,
      // is_closed: true,
    });

    await ctx.replyWithMarkdown(
      `Базага сақлаш учун ${SAVE_BUTTON} ни босинг`,
      Markup.keyboard([SAVE_BUTTON, BACK_BUTTON]).resize()
    );
  }
);
// return ctx.wizard.steps[ctx.wizard.cursor](ctx);

pollAddScene.hears(SAVE_BUTTON, async (ctx) => {
  // loading message
  const loadingMessage = await ctx.reply("Илтимос, кутинг...");

  // desctruct properties
  const { question, options, correct_option_id } = ctx.wizard.state.form;

  // store poll form to db
  await PollModel.create({
    question,
    options,
    correct_option_id,
  }).then(() => {
    ctx.deleteMessage(loadingMessage.message_id);
  });

  await ctx.reply("✅ Тест муваффаққиятли сақланди");
  await ctx.reply(
    "Яна тест қўшасизми?",
    Markup.keyboard([YES_BUTTON, BACK_BUTTON]).resize()
  );
});

pollAddScene.hears(YES_BUTTON, async (ctx) => {
  ctx.wizard.state.form = {};
  await ctx.wizard.selectStep(0);
  return ctx.wizard.steps[ctx.wizard.cursor](ctx);
});

pollAddScene.hears(BACK_BUTTON, (ctx) => {
  ctx.scene.enter("POLL_SCENE");
  ctx.scene.leave("POLL:ADD_SCENE");
});

module.exports = pollAddScene;
