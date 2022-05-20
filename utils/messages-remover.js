const deleteMessages = async ({ count = 1, ctx } = {}) => {
  try {
    let k = 0;
    for (let i = 0; i < count; i++) {
      k = ctx?.message?.message_id - i;

      if (k && !isNaN(k)) {
        await ctx?.deleteMessage(k);
      }
    }

    k = 0;
  } catch (error) {
    console.error(error);
  }
};

module.exports = deleteMessages;
