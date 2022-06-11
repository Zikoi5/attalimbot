const voiceRequest = require("../mongo/models/voiceRequest.js");
// const isDev = process.env.NODE_ENV === "development";

const ADMINS = require("../common/reviewers/admins.js");

const checkIsReviewMessage = async (ctx, next) => {
  const isReplyMessage = ctx.message?.reply_to_message?.message_id;
  const isBotReplyMessage = ctx.message?.reply_to_message?.from?.is_bot;
  const isAdminReply = ADMINS.includes(ctx.message?.from?.id);

  if (isReplyMessage && isBotReplyMessage && isAdminReply) {
    const voiceToCheck = ctx.message.reply_to_message.voice;

    if (voiceToCheck) {
      const isVoiceFound = await voiceRequest.findOne({
        "voice.file_unique_id": voiceToCheck.file_unique_id,
      });

      // console.log("isVoiceFound", isVoiceFound);

      if (isVoiceFound) {
        const reviewMessagesList = isVoiceFound.review_messages || [];

        if (ctx.message.voice) {
          await ctx.telegram.sendAudio(
            +isVoiceFound.telegram_chat_id,
            ctx.message.voice.file_id,
            {
              caption: `Сиз жўнатган калима "${isVoiceFound.kalima_nomi}" га жавоб келди`,
            }
          );

          await voiceRequest.updateOne(
            { telegram_chat_id: isVoiceFound.telegram_chat_id },
            {
              $set: {
                review_messages: [
                  ...reviewMessagesList,
                  {
                    reviewer_data: ctx.message.from,
                    review_voice: ctx.message.voice,
                  },
                ],
              },
            }
          );
        }
      }
    }
  }
  return next();
};

module.exports = checkIsReviewMessage;
