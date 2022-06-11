const {
  Markup,
  Scenes: { WizardScene },
} = require("telegraf");

const { storeVoiceRequest } = require("../mongo/methods/tahlilVoice.js");
const { BACK_BUTTON } = require("../common/buttons/back-button.js");

const ADMINS = require("../common/reviewers/admins.js");

const tahlilScene = new WizardScene(
  "TALAFFUZ_SCENE",

  async (ctx) => {
    const { message_id } = await ctx.replyWithMarkdown(
      `***Таҳлил бўлими***

Бу бўлимда устозга тиловат (аудио) жўнатишингиз мумкин.

Маълум бир калима номи, уни аудиосини ёзиб қолдиринг.`,
      Markup.keyboard([BACK_BUTTON]).resize()
    );

    ctx.wizard.state.formData = {};

    ctx.scene.state.welcome_msg_id = message_id;

    ctx.reply("Калима номини ёзинг");
    return ctx.wizard.next();
  },

  async (ctx) => {
    if (!ctx?.message?.text || ctx?.message?.text?.length < 3) {
      return ctx.reply("Илтимос, калима номини ёзинг!");
    }

    ctx.wizard.state.formData.kalima_nomi = ctx.message.text;

    ctx.reply(
      "Ўзингиз тиловат қилган калиманинг овозтасма (звукозапись) ни жўнатинг"
    );

    return ctx.wizard.next();
  },

  async (ctx) => {
    try {
      if (!ctx.message?.voice?.file_id) {
        ctx.reply(
          "Илтимос, калиманинг овозтасма (звукозапись) ни жўнатинг, бошқа нарса эмас!"
        );
        return;
      }

      if (ctx.message?.voice?.duration < 3) {
        ctx.reply(
          "Диққат! Калима жуда ҳам қисқа, энг камида 3 сонияли бўлиши керак!"
        );
        return;
      }

      ctx.wizard.state.formData.kalima_audio = ctx.message.voice;

      const { message_id } = await ctx.reply("Илтимос кутинг...");
      await storeVoiceRequest({ ctx, data: ctx.wizard.state.formData }).catch(
        () => {
          ctx.reply("Жўнатишда хато юз берди. Кейинроқ уриниб кўринг");
        }
      );

      ctx.reply(
        "Овозтасма мувафаққиятли жўнатилди, жавобини таҳлилдан сўнг билишингиз мумкин"
      );

      await ctx.deleteMessage(message_id);
      const full_name = [
        ctx.message.from.first_name,
        ctx.message.from.last_name,
      ]
        .filter(Boolean)
        .join(" ");

      await Promise.all(
        Array.from(ADMINS).map((item_chat_id) => {
          return ctx.telegram.sendAudio(
            item_chat_id,
            ctx.message.voice.file_id,
            {
              caption: `Калима номи: ${ctx.wizard.state.formData.kalima_nomi}.

Овозтасма <a href="tg://user?id=${ctx.message.from.id}">${full_name}</a> дан келди`,

              parse_mode: "HTML",
            }
          );
        })
      ).catch((err) => {
        console.log(err);
      });

      ctx.scene.enter("MAIN_SCENE", ctx.wizard.state.formData);
      return ctx.scene.leave("TALAFFUZ_SCENE");
    } catch (error) {
      console.error(error);
    }
  }
);

tahlilScene.hears(BACK_BUTTON, (ctx) => {
  ctx.scene.enter("MAIN_SCENE");
  return ctx.scene.leave("TALAFFUZ_SCENE");
});

tahlilScene.leave((ctx) => {
  return ctx.deleteMessage(ctx.scene.state.welcome_msg_id).catch(() => {});
});

module.exports = tahlilScene;
