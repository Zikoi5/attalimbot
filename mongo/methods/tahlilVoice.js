const VoiceRequestModel = require("../models/voiceRequest");

const DEFAULT_LIMIT = 10;

module.exports = {
  async getVoiceRequestList(params) {
    const { limit = DEFAULT_LIMIT, skip = 0, ...props } = params || {};
    const voices = await VoiceRequestModel.find(
      { ...props },
      { __v: 0, updated_at: 0 }
    )
      .skip(+skip || 0)
      .limit(+limit);
    return voices;
  },

  async storeVoiceRequest({ ctx, data } = {}) {
    const ctxUser = ctx?.message?.from || {};

    const { id, username, first_name, last_name } = ctxUser;
    const { kalima_nomi, kalima_audio } = data || {};

    await VoiceRequestModel.create({
      telegram_chat_id: id,
      username,
      first_name,
      last_name,
      voice: kalima_audio,
      kalima_nomi,
    });
  },
};
