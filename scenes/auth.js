const {
  Scenes: { WizardScene },
} = require("telegraf");

// const axios = require("axios");
// const FormData = require("form-data");

// const { storeSmsCode } = require("../mongo/methods/smsCode.js");
// eslint-disable-next-line no-unused-vars
const { storeUser, updateUser } = require("../mongo/methods/user.js");
const { generateSmsCode } = require("../utils/sms-code-generator.js");
const { BACK_BUTTON } = require("../common/buttons/back-button.js");
const isLatinOrCyrilicLetters = require("../utils/regex/isLatinOrCyrilicLetters.js");

const User = require("../mongo/models/user.js");

const MINUTES = 3;
// const MARKUP_SEND_CONTACT_BUTTON = Markup.keyboard([
//   Markup.button.contactRequest("Телефон рақамини жўнатиш"),
//   BACK_BUTTON,
// ])
//   .oneTime()
//   .resize();
const MARKUP_SEND_CONTACT_BUTTON = () => {
  return {
    reply_markup: {
      keyboard: [
        [
          {
            text: "📲 Телефон рақамини жўнатиш",
            request_contact: true,
          },
        ],
        [BACK_BUTTON],
      ],
      one_time_keyboard: true,
      resize_keyboard: true,
    },
  };
};

// const ADMINS = require("../common/reviewers/admins.js");

// eslint-disable-next-line no-unused-vars
async function tasdiqlash_function(ctx) {
  const contact = ctx?.message?.contact || {};
  const ctxUser = ctx?.message?.from || {};

  if (!contact?.user_id || ctxUser.id !== contact.user_id) {
    ctx.reply("Илтимос, телеграмда ишлатаётган рақамингизни жўнатинг");
    return;
  }

  ctx.wizard.state.contactData.contact = contact;

  const { message_id } = await ctx.reply("Илтимос кутинг...");

  await storeUser({ ctx, contact });

  const smsCode = generateSmsCode();

  // await storeSmsCode({ id: ctxUser.id, code: smsCode });

  // const form = {
  //   mobile_phone: +contact.phone_number,
  //   message: `Sms tasdiqlash kodi - ${smsCode}`,
  //   from: 4546,
  // };

  // console.log("form", form);

  const currDate = new Date().getTime();
  const expireDate = new Date(currDate + MINUTES * 60000).getTime();

  ctx.wizard.state.sms = { code: smsCode, expireDate };

  // const f = new FormData();
  // Object.keys(form).forEach((key) => {
  //   f.append(key, form[key]);
  // });

  // return axios
  //   .post(`${process.env.ESKIZ_API_URL}/api/message/sms/send`, f, {
  //     headers: {
  //       Authorization: `Bearer ${process.env.ESKIZ_API_TOKEN}`,
  //     },
  //   })
  //   .then(() => {

  ctx.deleteMessage(message_id);
  ctx.reply("Смсда келган тасдиқлаш кодини ёзинг.");
  return ctx.wizard.next();

  // })
  // .catch(() => {
  //   // console.log("On sms send error", err);
  //   ctx.reply("Смс сервис билан ишлашда хато юз берди.");
  //   ctx.scene.enter("MAIN_SCENE", {}, true);
  // });
}

const authScene = new WizardScene(
  "AUTH_SCENE",

  // Исм
  async (ctx) => {
    const user = await User.findOne({
      telegram_chat_id: ctx.message?.from?.id,
    });

    if (user && user.phone_number) {
      ctx.scene.enter("MAIN_SCENE", {});
      await ctx.reply("Сиз зотан рўйхатдан ўтгансиз");
      return ctx.scene.leave("AUTH_SCENE");
    }

    ctx.reply("Исмингизни киритинг", {
      reply_markup: { remove_keyboard: true },
    });

    ctx.wizard.state.contactData = { telegram_chat_id: ctx.message?.from?.id };
    return ctx.wizard.next();
  },

  // Фамилия
  (ctx) => {
    const first_name = ctx.message?.text;
    // validation example
    if (!first_name || first_name?.length < 2) {
      ctx.reply("Илтимос, исмингизни тўлиқ ёзинг!");
      return;
    }

    if (!isLatinOrCyrilicLetters(first_name)) {
      ctx.reply("Хато. Илтимос исмингизни кирилл ёки лотин ҳарфларида ёзинг");
      return;
    }

    ctx.wizard.state.contactData.first_name = ctx.message.text;

    ctx.reply("Фамилиянгизни киритинг");
    return ctx.wizard.next();
  },

  // телефон рақам
  async (ctx) => {
    const last_name = ctx.message?.text;
    if (!last_name || last_name?.length < 2) {
      ctx.reply("Илтимос, фамилиянгизни тўлиқ ёзинг");
      return;
    }

    if (!isLatinOrCyrilicLetters(last_name)) {
      ctx.reply(
        "Хато. Илтимос, фамилиянгизни кирилл ёки лотин ҳарфларида ёзинг"
      );
      return;
    }

    ctx.wizard.state.contactData.last_name = ctx.message.text;

    await ctx.reply(
      '"Телефон рақамини жўнатиш" тугмасини босинг',
      MARKUP_SEND_CONTACT_BUTTON()
    );

    // fixme
    // ctx.telegram.sendPhoto(
    //   ctx.message.from.id,
    //   "AgACAgIAAxkDAAIQh2KnhhQB7VWmFFEiuEB0S-wBsyKpAAIGvzEbkilASa8giOAWmuldAQADAgADbQADJAQ"
    // );

    return ctx.wizard.next();
  },

  // тасдиқлаш коди
  // tasdiqlash_function,

  // юзерни базага сақлаб, асосий менюга қайтариш
  async (ctx) => {
    try {
      const contact = ctx?.message?.contact || {};
      const ctxUser = ctx?.message?.from || {};

      if (!contact?.user_id || ctxUser.id !== contact.user_id) {
        await ctx.reply(
          "Илтимос, телеграмда ишлатаётган телефон рақамингизни жўнатинг",
          MARKUP_SEND_CONTACT_BUTTON()
        );
        return;
      }

      ctx.wizard.state.contactData.contact = contact;
      // const now = new Date().getTime();

      // if (now > ctx.wizard.state.sms.expireDate) {
      //   await ctx.reply(
      //     "Тасдиқлаш коди вақти тугади",
      //     Markup.keyboard([
      //       Markup.button.contactRequest("Телефон рақамини жўнатиш"),
      //       BACK_BUTTON,
      //     ])
      //       .oneTime()
      //       .resize()
      //   );
      //   await ctx.reply(
      //     'Илтимос, "Телефон рақамини жўнатиш" тугмасини қайтадан босинг'
      //   );
      //   return;
      //   // return ctx.wizard.back();
      // }

      // if (ctx.message.text.length < 6) {
      //   ctx.reply("Тасдиқлаш коди 6 хонали сон бўлиши керак.");
      //   return;
      // }

      // if (ctx.message.text != ctx.wizard.state.sms.code) {
      //   await ctx.reply("Тасдиқлаш коди нотўғри");
      //   return ctx.reply("Илтимос, тасдиқлаш кодини ёзинг.");
      // }

      // await updateUser({
      //   selector: {
      //     telegram_chat_id: ctx.message.from.id,
      //   },
      //   data: {
      //     $set: {
      //       phone_number_verified: true,
      //     },
      //   },
      // });

      const {
        first_name,
        last_name,
        contact: { phone_number },
      } = ctx.wizard.state.contactData;

      await storeUser({
        ctx,
        contact: { first_name, last_name, phone_number },
      });

      // const full_name_list = [first_name, last_name].filter(Boolean);
      // const full_name = full_name_list.join(" ");

      // await Promise.all(
      //   Array.from(ADMINS).map((item_chat_id) => {
      //     return ctx.telegram.sendMessage(
      //       item_chat_id,
      //       `Телеграм ботда <a href="tg://user?id=${telegram_chat_id}">${full_name}</a> рўйхатдан ўтди, рақами +${phone_number}`,
      //       {
      //         parse_mode: "HTML",
      //       }
      //     );
      //   })
      // ).catch(() => {});

      ctx.scene.enter("MAIN_SCENE", ctx.wizard.state.contactData);
      // await ctx.reply("Телефон рақамингиз тасдиқланди");
      return ctx.scene.leave("AUTH_SCENE");
    } catch (error) {
      console.log("Wizard contact error", error);
      console.log(
        "On error contactData",
        JSON.stringify(ctx.wizard?.state?.contactData, null, 2)
      );
      ctx.reply("Маълумотлар билан ишлашда хато юз берди");
      ctx.scene.leave("AUTH_SCENE");
    }
  }
);

authScene.hears(BACK_BUTTON, (ctx) => {
  ctx.session.isChecked = false;
  ctx.scene.enter("MAIN_SCENE");
  return ctx.scene.leave("AUTH_SCENE");
});

module.exports = authScene;
