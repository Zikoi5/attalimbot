const REMOVE_OLD_MESSAGES_BEFORE_LEAVE =
  process.env.REMOVE_OLD_MESSAGES_BEFORE_LEAVE;

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
          throw err;
        });
      }
    }

    return Promise.resolve();
  }
}

async function sendArgsToChain({ ctx, replyList }) {
  await removeCurrMessages(ctx);

  if (REMOVE_OLD_MESSAGES_BEFORE_LEAVE) {
    ctx.scene.state.messages_to_delete = [ctx.message.message_id];
  }

  const chainList = replyList.map((item) => {
    const { reply_user_id, from, message_id } = item;

    return function () {
      return ctx.telegram
        .copyMessage(reply_user_id, from, message_id, {
          protect_content: true,
        })
        .then(({ message_id }) => {
          if (REMOVE_OLD_MESSAGES_BEFORE_LEAVE) {
            if (!ctx.scene.state.messages_to_delete) {
              ctx.scene.state.messages_to_delete = [ctx.message.message_id];
            }

            ctx.scene.state.messages_to_delete = [
              ...ctx.scene.state.messages_to_delete,
              message_id,
            ];
          }
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

function replyPropsToList({ replyUserId, FROM_USER_ID, messageIdList }) {
  return messageIdList.map((message_id) => ({
    reply_user_id: replyUserId,
    from: FROM_USER_ID,
    message_id,
  }));
}

module.exports = {
  sendArgsToChain,
  removeCurrMessages,
  replyPropsToList,
};
