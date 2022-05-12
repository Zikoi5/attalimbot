const FROM_USER_ID = 2082926;

const kalimalar = {
  TOYYIBA_KALIMASI: {
    title: "📋 Toyyiba kalimasi",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;
      await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 335, {
        protect_content: true,
      });
      await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 336, {
        protect_content: true,
      });
      await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 337, {
        protect_content: true,
      });
    },
  },
  SHAHODAT_KALIMASI: {
    title: "📋 Shahodat kalimasi",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;
      await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 377, {
        protect_content: true,
      });
      await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 378, {
        protect_content: true,
      });
      await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 379, {
        protect_content: true,
      });
    },
  },
  TAVHID_KALIMASI: {
    title: "📋 Tavhid kalimasi",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;
      await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 383, {
        protect_content: true,
      });
      await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 384, {
        protect_content: true,
      });
      await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 385, {
        protect_content: true,
      });
    },
  },
  RODDIL_KUFR_KALIMASI: {
    title: "📋 Roddil kufr kalimasi",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;
      await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 386, {
        protect_content: true,
      });
      await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 387, {
        protect_content: true,
      });
      await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 388, {
        protect_content: true,
      });
    },
  },
  ISTIGFOR_KALIMASI: {
    title: "📋 Istig'for kalimasi",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;
      await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 389, {
        protect_content: true,
      });
      await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 390, {
        protect_content: true,
      });
      await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 391, {
        protect_content: true,
      });
    },
  },
  TAMJID_KALIMASI: {
    title: "📋 Tamjid kalimasi",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;
      await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 392, {
        protect_content: true,
      });
      await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 393, {
        protect_content: true,
      });
      await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 394, {
        protect_content: true,
      });
    },
  },
  IYMON_KALIMASI: {
    title: "📋 Iymon kalimasi",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;
      await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 395, {
        protect_content: true,
      });
      await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 396, {
        protect_content: true,
      });
      await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 397, {
        protect_content: true,
      });
    },
  },
  MUJMAL_KALIMASI: {
    title: "📋 Mujmal kalimasi",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;
      await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 401, {
        protect_content: true,
      });
      await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 402, {
        protect_content: true,
      });
      await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 403, {
        protect_content: true,
      });
    },
  },
  MUFASSAL_KALIMASI: {
    title: "📋 Mufassal kalimasi",
    async handler(ctx) {
      const replyUserId = ctx?.update?.message?.from?.id;
      await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 404, {
        protect_content: true,
      });
      await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 405, {
        protect_content: true,
      });
      await ctx.telegram.copyMessage(replyUserId, FROM_USER_ID, 406, {
        protect_content: true,
      });
    },
  },
};

module.exports = kalimalar;
