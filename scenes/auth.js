const {
  Markup,
  Scenes: { WizardScene },
} = require("telegraf");

const authScene = new WizardScene(
  "AUTH_SCENE",
  (ctx) => {
    ctx.reply("Исмингизни киритинг", {
      reply_markup: { remove_keyboard: true },
    });

    ctx.wizard.state.contactData = {};
    return ctx.wizard.next();
  },
  (ctx) => {
    // validation example
    if (ctx.message.text.length < 2) {
      ctx.reply("Илтимос, исмингизни тўлиқ ёзинг!");
      return;
    }

    ctx.wizard.state.contactData.first_name = ctx.message.text;

    ctx.reply("Фамилиянгизни киритинг");
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (ctx.message.text.length < 2) {
      ctx.reply("Илтимос, фамилиянгизни тўлиқ ёзинг");
      return;
    }

    ctx.wizard.state.contactData.last_name = ctx.message.text;

    ctx.reply(
      '"Телефон рақамини жўнатиш" тугмасини босинг',
      Markup.keyboard([
        Markup.button.contactRequest("Телефон рақамини жўнатиш"),
      ])
        .oneTime()
        .resize()
    );

    return ctx.wizard.next();
  },
  async (ctx) => {
    try {
      const contact = ctx?.message?.contact;
      if (!contact?.user_id || ctx.message.from.id !== contact.user_id) {
        ctx.reply("Илтимос, телеграм ишлатаётган рақамингизни жўнатинг");
        return;
      }
      ctx.wizard.state.contactData.contact = contact;
      // const data = JSON.stringify(ctx.wizard.state.contactData, null, 2);

      // ctx.reply(data, { reply_markup: { remove_keyboard: true } });
      return ctx.scene.enter("MAIN_SCENE", ctx.wizard.state.contactData);
      // return ctx.scene.leave("AUTH_SCENE");
    } catch (error) {
      console.log("Wizard contact error", error);
    }
  }
);

module.exports = authScene;
