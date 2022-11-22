const FROM_USER_ID = 2082926;

const {
  sendArgsToChain,
  replyPropsToList,
} = require("../../utils/request-chain-methods.js");

const sanoList = require("./sano.js");
const samiRoSubhana = require("./sami-ro-subhana.js");
const tahiyyat = require("./tahiyyat.js");
const solliVaBarik = require("./solli-va-barik.js");
const qunut = require("./qunut.js");

const duolar = {
  SANO: {
    title: "📋 Сано",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: sanoList,
        }),
        ctx,
      });
    },
  },

  SAMI_RO_SUBHANA: {
    title: "📋 Самиъа-Роббана-Субҳана",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: samiRoSubhana,
        }),
        ctx,
      });
    },
  },

  TAHIYYAT: {
    title: "📋 Таҳийят",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: tahiyyat,
        }),
        ctx,
      });
    },
  },

  SOLLI_VA_BARIK: {
    title: "📋 Солли ва Баарик",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: solliVaBarik,
        }),
        ctx,
      });
    },
  },

  QUNUT: {
    title: "📋 Қунут",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: qunut,
        }),
        ctx,
      });
    },
  },
};

const duolarKeys = Object.keys(duolar);
duolarKeys.forEach((key, index) => {
  duolar[key].title = `${index + 1}. ${duolar[key].title}`;
});
const duolarValues = Object.values(duolar);
const duolarTitles = duolarValues.map((item) => item.title);

module.exports = { duolar, duolarKeys, duolarTitles };
