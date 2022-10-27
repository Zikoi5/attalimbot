const FROM_USER_ID = 2082926;

const {
  sendArgsToChain,
  replyPropsToList,
} = require("../../utils/request-chain-methods.js");

const kalimalar = {
  TOYYIBA_KALIMASI: {
    title: "📋 Тоййиба калимаси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [335, 336, 337],
        }),
        ctx,
      });
    },
  },
  SHAHODAT_KALIMASI: {
    title: "📋 Шаҳодат калимаси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [377, 378, 379],
        }),
        ctx,
      });
    },
  },
  TAVHID_KALIMASI: {
    title: "📋 Тавҳид калимаси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 383,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 384,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 385,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 383, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 384, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 385, {
      //   protect_content: true,
      // });
    },
  },
  RODDIL_KUFR_KALIMASI: {
    title: "📋 Роддил куфр калимаси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 386,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 387,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 388,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 386, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 387, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 388, {
      //   protect_content: true,
      // });
    },
  },
  ISTIGFOR_KALIMASI: {
    title: "📋 Истиғфор калимаси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 389,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 390,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 391,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 389, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 390, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 391, {
      //   protect_content: true,
      // });
    },
  },
  TAMJID_KALIMASI: {
    title: "📋 Тамжид калимаси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 392,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 393,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 394,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 392, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 393, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 394, {
      //   protect_content: true,
      // });
    },
  },
  IYMON_KALIMASI: {
    title: "📋 Иймон калимаси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 395,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 396,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 397,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 395, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 396, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 397, {
      //   protect_content: true,
      // });
    },
  },
  MUJMAL_KALIMASI: {
    title: "📋 Мужмал калимаси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 401,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 402,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 403,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 401, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 402, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 403, {
      //   protect_content: true,
      // });
    },
  },
  MUFASSAL_KALIMASI: {
    title: "📋 Муфассал калимаси",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 404,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 405,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 406,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 404, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 405, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 406, {
      //   protect_content: true,
      // });
    },
  },
};

const kalimalarKeys = Object.keys(kalimalar);
kalimalarKeys.forEach((key, index) => {
  kalimalar[key].title = `${index + 1}. ${kalimalar[key].title}`;
});
const kalimalarValues = Object.values(kalimalar);
const kalimalarTitles = kalimalarValues.map((item) => item.title);

module.exports = { kalimalar, kalimalarKeys, kalimalarTitles };
