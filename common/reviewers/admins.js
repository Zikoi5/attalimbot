let CHATS_TO_NOTIFY = process.env.ADMIN_CHAT_LIST || [];
CHATS_TO_NOTIFY = CHATS_TO_NOTIFY.split(",");

module.exports = CHATS_TO_NOTIFY;
