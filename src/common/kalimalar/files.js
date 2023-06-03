const FROM_USER_ID = 2082926;

const {
  sendArgsToChain,
  replyPropsToList
} = require("../../utils/request-chain-methods.js");

const kalimalar = {
  TOYYIBA_KALIMASI: {
    title: "📋 Тоййиба",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          // messageIdList: [335, 336, 337],
          messageIdList: [335, 337]
        }),
        ctx
      });
    }
  },
  SHAHODAT_KALIMASI: {
    title: "📋 Шаҳодат",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          // messageIdList: [377, 378, 379]
          messageIdList: [377, 379]
        }),
        ctx
      });
    }
  },
  TAVHID_KALIMASI: {
    title: "📋 Тавҳид",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          // messageIdList: [383, 384, 385]
          messageIdList: [383, 385]
        }),
        ctx
      });
    }
  },
  RODDIL_KUFR_KALIMASI: {
    title: "📋 Роддил куфр",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          // messageIdList: [386, 387, 388]
          messageIdList: [386, 387]
        }),
        ctx
      });
    }
  },
  ISTIGFOR_KALIMASI: {
    title: "📋 Истиғфор",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          // messageIdList: [389, 390, 391]
          messageIdList: [389, 391]
        }),
        ctx
      });
    }
  },
  TAMJID_KALIMASI: {
    title: "📋 Тамжид",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          // messageIdList: [392, 393, 394]
          messageIdList: [392, 393]
        }),
        ctx
      });
    }
  },
  IYMON_KALIMASI: {
    title: "📋 Иймон",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          // messageIdList: [395, 396, 397]
          messageIdList: [395, 397]
        }),
        ctx
      });
    }
  },
  MUJMAL_KALIMASI: {
    title: "📋 Мужмал",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          // messageIdList: [401, 402, 403]
          messageIdList: [401, 403]
        }),
        ctx
      });
    }
  },
  MUFASSAL_KALIMASI: {
    title: "📋 Муфассал",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          // messageIdList: [404, 405, 406]
          messageIdList: [404, 406]
        }),
        ctx
      });
    }
  }
};

const kalimalarKeys = Object.keys(kalimalar);
kalimalarKeys.forEach((key, index) => {
  kalimalar[key].title = `${index + 1}. ${kalimalar[key].title}`;
});
const kalimalarValues = Object.values(kalimalar);
const kalimalarTitles = kalimalarValues.map((item) => item.title);

module.exports = { kalimalar, kalimalarKeys, kalimalarTitles };
