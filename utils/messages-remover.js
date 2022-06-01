const deleteMessages = async ({ count = 10, ctx } = {}) => {
  try {
    let k = 0;
    for (let i = 0; i < count; i++) {
      k = ctx?.message?.message_id - i;

      console.log("k", k);

      if (k > -1) {
        ctx?.deleteMessage(k).catch((e) => {
          console.log("An error occured on delete message");
          console.log(e);
          i = count;
        });
      }
    }

    k = 0;
  } catch (error) {
    console.error(error);
  }
};

module.exports = deleteMessages;
