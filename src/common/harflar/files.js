const FROM_USER_ID = 2082926;

const {
  sendArgsToChain,
  replyPropsToList
} = require("../../utils/request-chain-methods.js");

const harflar = {
  RO: {
    title: "Роо",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [4624, 4625]
        }),
        ctx
      });
    }
  },

  ZAY: {
    title: "Зай ҳарфи",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [4626, 4627]
        }),
        ctx
      });
    }
  },

  MIM: {
    title: "Мийм ҳарфи",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [4628, 4629]
        }),
        ctx
      });
    }
  },

  TA: {
    title: "Таа ҳарфи",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [4630, 4631]
        }),
        ctx
      });
    }
  },

  NUN: {
    title: "Нуун ҳарфи",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [4632, 4633]
        }),
        ctx
      });
    }
  },

  YA: {
    title: "Йаа",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [4634, 4635]
        }),
        ctx
      });
    }
  },

  BA: {
    title: "Баа",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [4636, 4637]
        }),
        ctx
      });
    }
  },

  KAF: {
    title: "Кааф",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [4638, 4639]
        }),
        ctx
      });
    }
  },

  LAM: {
    title: "Лаам",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [4640, 4641]
        }),
        ctx
      });
    }
  },

  VOV: {
    title: "Ваав",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [4642, 4643]
        }),
        ctx
      });
    }
  },

  HA_TUBI: {
    title: "Ҳаа (туби)",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [4644, 4645]
        }),
        ctx
      });
    }
  },

  FA: {
    title: "Фаа",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [4646, 4647]
        }),
        ctx
      });
    }
  },

  QOF: {
    title: "Қооф",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [4648, 4649]
        }),
        ctx
      });
    }
  },

  SHIN: {
    title: "Шийн",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [4650, 4651]
        }),
        ctx
      });
    }
  },

  SIN: {
    title: "Сийн",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [4652, 4653]
        }),
        ctx
      });
    }
  },

  SA: {
    title: "Саа",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [4654, 4655]
        }),
        ctx
      });
    }
  },

  SOD: {
    title: "Соод",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [4656, 4657]
        }),
        ctx
      });
    }
  },

  TO: {
    title: "Тоо",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [4658, 4659]
        }),
        ctx
      });
    }
  },

  JIM: {
    title: "Жийм",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [4660, 4661]
        }),
        ctx
      });
    }
  },

  XO: {
    title: "Хоо",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [4662, 4663]
        }),
        ctx
      });
    }
  },

  HA: {
    title: "Ҳаа",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [4664, 4665]
        }),
        ctx
      });
    }
  },

  GOYN: {
    title: "Ғойн",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [4666, 4667]
        }),
        ctx
      });
    }
  },

  AYN: {
    title: "Айн",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [4668, 4669]
        }),
        ctx
      });
    }
  },

  DAL: {
    title: "Даал",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [4670, 4671]
        }),
        ctx
      });
    }
  },

  DOD: {
    title: "Доод",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [4672, 4673]
        }),
        ctx
      });
    }
  },

  ZAL: {
    title: "Заал",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [4674, 4675]
        }),
        ctx
      });
    }
  },

  ZO: {
    title: "Зоо",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;

      sendArgsToChain({
        replyList: replyPropsToList({
          replyUserId,
          FROM_USER_ID,
          messageIdList: [4676, 4677]
        }),
        ctx
      });
    }
  }
};

const harflarKeys = Object.keys(harflar);
const harflarValues = Object.values(harflar);
const harflarTitles = harflarValues.map((item) => item.title);

module.exports = { harflar, harflarKeys, harflarTitles };
