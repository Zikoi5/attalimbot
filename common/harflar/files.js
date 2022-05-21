const FROM_USER_ID = 2082926;

const { sendArgsToChain } = require("../../utils/request-chain-methods.js");

const harflar = {
  RO: {
    title: "Роо",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4624,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4625,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4624, {
      //   protect_content: true,
      // });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4625, {
      //   protect_content: true,
      // });
    },
  },

  ZAY: {
    title: "Зай ҳарфи",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4626,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4627,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4626, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4627, {
      //   protect_content: true,
      // });
    },
  },

  MIM: {
    title: "Мийм ҳарфи",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4628,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4629,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4628, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4629, {
      //   protect_content: true,
      // });
    },
  },

  TA: {
    title: "Таа ҳарфи",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4630,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4631,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4630, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4631, {
      //   protect_content: true,
      // });
    },
  },

  NUN: {
    title: "Нуун ҳарфи",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4632,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4633,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4632, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4633, {
      //   protect_content: true,
      // });
    },
  },

  YA: {
    title: "Йаа",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4634,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4635,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4634, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4635, {
      //   protect_content: true,
      // });
    },
  },

  BA: {
    title: "Баа",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4636,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4637,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4636, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4637, {
      //   protect_content: true,
      // });
    },
  },

  KAF: {
    title: "Кааф",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4638,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4639,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4638, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4639, {
      //   protect_content: true,
      // });
    },
  },

  LAM: {
    title: "Лаам",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4640,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4641,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4640, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4641, {
      //   protect_content: true,
      // });
    },
  },

  VOV: {
    title: "Ваав",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4642,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4643,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4642, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4643, {
      //   protect_content: true,
      // });
    },
  },

  HA_TUBI: {
    title: "Ҳаа (туби)",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4644,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4645,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4644, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4645, {
      //   protect_content: true,
      // });
    },
  },

  FA: {
    title: "Фаа",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4646,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4647,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4646, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4647, {
      //   protect_content: true,
      // });
    },
  },

  QOF: {
    title: "Қооф",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4648,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4649,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4648, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4649, {
      //   protect_content: true,
      // });
    },
  },

  SHIN: {
    title: "Шийн",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4650,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4651,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4650, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4651, {
      //   protect_content: true,
      // });
    },
  },

  SIN: {
    title: "Сийн",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4652,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4653,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4652, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4653, {
      //   protect_content: true,
      // });
    },
  },

  SA: {
    title: "Саа",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4654,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4655,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4654, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4655, {
      //   protect_content: true,
      // });
    },
  },

  SOD: {
    title: "Соод",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4656,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4657,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4656, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4657, {
      //   protect_content: true,
      // });
    },
  },

  TO: {
    title: "Тоо",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4658,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4659,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4658, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4659, {
      //   protect_content: true,
      // });
    },
  },

  JIM: {
    title: "Жийм",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4660,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4661,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4660, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4661, {
      //   protect_content: true,
      // });
    },
  },

  XO: {
    title: "Хоо",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4662,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4663,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4662, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4663, {
      //   protect_content: true,
      // });
    },
  },

  HA: {
    title: "Ҳаа",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4664,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4665,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4664, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4665, {
      //   protect_content: true,
      // });
    },
  },

  GOYN: {
    title: "Ғойн",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4666,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4667,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4666, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4667, {
      //   protect_content: true,
      // });
    },
  },

  AYN: {
    title: "Айн",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4668,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4669,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4668, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4669, {
      //   protect_content: true,
      // });
    },
  },

  DAL: {
    title: "Даал",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4670,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4671,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4670, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4671, {
      //   protect_content: true,
      // });
    },
  },

  DOD: {
    title: "Доод",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4672,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4673,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4672, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4673, {
      //   protect_content: true,
      // });
    },
  },

  ZAL: {
    title: "Заал",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4674,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4675,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4674, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4675, {
      //   protect_content: true,
      // });
    },
  },

  ZO: {
    title: "Зоо",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: [
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4676,
          },
          {
            reply_user_id: replyUserId,
            from: FROM_USER_ID,
            message_id: 4677,
          },
        ],
        ctx,
      });

      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4676, {
      //   protect_content: true,
      // });
      // await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 4677, {
      //   protect_content: true,
      // });
    },
  },
};

const harflarKeys = Object.keys(harflar);
const harflarValues = Object.values(harflar);
const harflarTitles = harflarValues.map((item) => item.title);

module.exports = { harflar, harflarKeys, harflarTitles };
