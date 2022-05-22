async function chainPromises(promises) {
  for (let promise of promises) {
    await promise();
  }
  return Promise.resolve();
}

async function removeCurrMessages(ctx) {
  if (
    ctx.scene.state.messages_to_delete != 0 &&
    Array.isArray(ctx.scene.state.messages_to_delete)
  ) {
    for (const message_id of ctx.scene.state.messages_to_delete) {
      if (message_id) {
        await ctx.deleteMessage(message_id).catch((err) => {
          console.log("Error on delete message", err);
        });
      }
    }

    return Promise.resolve();
  }
}

async function sendArgsToChain({ ctx, replyList }) {
  await removeCurrMessages(ctx);

  ctx.scene.state.messages_to_delete = [ctx.message.message_id];

  const chainList = replyList.map((item) => {
    const { reply_user_id, from, message_id } = item;

    return function () {
      return ctx.telegram
        .copyMessage(reply_user_id, from, message_id, {
          protect_content: true,
        })
        .then(({ message_id }) => {
          if (!ctx.scene.state.messages_to_delete) {
            ctx.scene.state.messages_to_delete = [ctx.message.message_id];
          }

          ctx.scene.state.messages_to_delete = [
            ...ctx.scene.state.messages_to_delete,
            message_id,
          ];
        });
    };
  });

  chainPromises(chainList);
  // .then(() => {
  //   console.log("All Done");
  //   console.log(
  //     "ctx.scene.state.messages_to_delete",
  //     ctx.scene.state.messages_to_delete
  //   );
  // });
}

module.exports = {
  sendArgsToChain,
  removeCurrMessages,
};
