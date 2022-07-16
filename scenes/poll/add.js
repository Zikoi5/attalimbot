const {
  Markup,
  Scenes: { WizardScene },
} = require("telegraf");

const PollModel = require("../../mongo/models/poll.js");
const { BACK_BUTTON } = require("../../common/buttons/back-button.js");

const pollAddScene = new WizardScene(
  "POLL:ADD_SCENE",
  async (ctx) => {
    ctx.wizard.state.form = {};

    await ctx.replyWithMarkdown(
      `⚠️ Тест қўшишда мухум нарса 3 та. Сарлавҳа, жавоб вариантлари ва тўғри жавоб варианти.\n\nСарлавҳани киритинг:\n\nМасалан: Истеъола харфлари нечта?`,
      Markup.keyboard([BACK_BUTTON], {
        columns: 1,
      }).resize()
    );

    return ctx.wizard.next();
  },

  async (ctx) => {
    const question = ctx.message.text;

    if (!question) {
      return ctx.reply("⚠️ Илтимос, сарлавҳани киритинг");
    }

    ctx.wizard.state.form.question = question;

    await ctx.reply(
      `Жавоб вариантларини киритинг:\n\nМасалан:\n1\n4\n3\n6\n\nТўғри жавоб варианти олдига * ёзинг, мисол\n\n1\n4\n3\n*6`
    );

    return ctx.wizard.next();
  },

  async (ctx) => {
    const options = ctx.message?.text?.split?.("\n");
    if (!options || !Array.isArray(options)) {
      return ctx.reply("⚠️ Тўғри жавоб вариантини киритинг!");
    }

    ctx.wizard.state.form.options = options;

    const correct_option_index = options.findIndex(
      (item) => ~item.indexOf("*")
    );

    console.log("correct_option_index", correct_option_index);

    if (correct_option_index == -1) {
      return ctx.reply(
        "Тўғри жавоб варианти киритилмаган, бунинг учун тўғри жавоб варианти олдига * ёзинг, мисол\n\n1\n4\n3\n*6"
      );
    }

    const correct_option_elem = options[correct_option_index].replace(
      /^(\*)/,
      ""
    );

    console.log("correct_option_elem", correct_option_elem);

    if (isNaN(correct_option_elem)) {
      // console.log("correct_option_elem", correct_option_elem);
      return;
    }

    options[correct_option_index] = correct_option_elem;

    const { question } = ctx.wizard.state.form;

    ctx.wizard.state.form.correct_option_id = correct_option_index;

    console.log("ctx.wizard.state.form", ctx.wizard.state.form);

    await ctx.reply(
      "Тестни сақлашдан олдин текшириб олинг, бундай кўринишда бўлади:"
    );

    await ctx.replyWithPoll(question, options, {
      correct_option_id: correct_option_index,
      // is_closed: true,
    });
  }
);
// return ctx.wizard.steps[ctx.wizard.cursor](ctx);



pollAddScene.hears(SAVE_BUTTON, (ctx) => {

})

pollAddScene.hears(BACK_BUTTON, (ctx) => {
  ctx.scene.enter("POLL_SCENE");
  ctx.scene.leave("POLL:ADD_SCENE");
});

module.exports = pollAddScene;
