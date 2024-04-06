var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
import { Scenes, Telegraf, session } from "telegraf";
const { Stage } = Scenes;
const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";
const Sentry = require("./plugins/sentry.js");
const { helpTextLines } = require("./help.js");
const { BACK_BUTTON } = require("./common/buttons/back-button.js");
/* Scenes */
const AUTH_SCENE = require("./scenes/auth.js");
const { MAIN_SCENE, MAIN_BUTTONS, ANNOUNCE_BTN } = require("./scenes/main.js");
const HARFLAR_SCENE = require("./scenes/harflar.js");
const KALIMALAR_SCENE = require("./scenes/kalimalar.js");
const DUOLAR_SCENE = require("./scenes/duolar.js");
// const TALAFFUZ_SCENE = require("./scenes/tahlilul-tilavat.js");
const FURQON_SCENE = require("./scenes/furqon.js");
const ELON_SCENE = require("./scenes/elon.js");
const PROFILE_SCENE = require("./scenes/profile.js");
const POLL_SCENE = require("./scenes/poll/index.js");
const POLL_ADD_SCENE = require("./scenes/poll/add.js");
const POLL_BEGIN_SCENE = require("./scenes/poll/begin.js");
const POLL_GROUP_SCENE = require("./scenes/poll/group.js");
/* Middlewares */
const userChecker = require("./middlewares/user-checker.js");
const reviewReplyChecker = require("./middlewares/review-reply-checker.js");
require("./plugins/dayjs.js");
const mongodb = require("./mongo/index.js");
const bot = new Telegraf(process.env.BOT_TOKEN);
if (isProd) {
    Sentry.init({ dsn: process.env.SENTRY_DNS });
}
bot.catch((err) => {
    try {
        if (isDev) {
            console.error("Catched error", err);
            return;
        }
        if (isProd) {
            Sentry.captureException(err);
        }
    }
    catch (err) {
        //
    }
});
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (isDev) {
            // bot.use(Telegraf.log());
        }
        yield mongodb();
        bot.launch({ dropPendingUpdates: true }).then(() => {
            var _a;
            console.log(`Bot started. @${(_a = bot.botInfo) === null || _a === void 0 ? void 0 : _a.username}`);
        });
    });
})();
const stage = new Stage([
    MAIN_SCENE,
    AUTH_SCENE,
    HARFLAR_SCENE,
    KALIMALAR_SCENE,
    DUOLAR_SCENE,
    // TALAFFUZ_SCENE,
    FURQON_SCENE,
    ELON_SCENE,
    PROFILE_SCENE,
    POLL_SCENE,
    POLL_ADD_SCENE,
    POLL_BEGIN_SCENE,
    POLL_GROUP_SCENE
]);
bot.use(
// poll bug fix
session({
    getSessionKey: (ctx) => {
        var _a;
        if (!ctx) {
            return `:`;
        }
        const { pollAnswer, from } = ctx || {};
        if (!pollAnswer && !from) {
            return ctx;
        }
        // for public quizzes
        if ((_a = pollAnswer === null || pollAnswer === void 0 ? void 0 : pollAnswer.user) === null || _a === void 0 ? void 0 : _a.id) {
            const { id } = pollAnswer.user;
            return `${id}:${id}`;
        }
        // fallback
        if (from === null || from === void 0 ? void 0 : from.id) {
            return `${from.id}:${from.id}`;
        }
        return `:`;
    }
}));
bot.use(stage.middleware());
bot.use(userChecker);
bot.use(reviewReplyChecker);
bot.start((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    yield ctx.reply(`Ассалааму алайкум ${((_b = (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.from) === null || _b === void 0 ? void 0 : _b.first_name) ||
        ((_d = (_c = ctx.message) === null || _c === void 0 ? void 0 : _c.from) === null || _d === void 0 ? void 0 : _d.last_name) ||
        ((_f = (_e = ctx.message) === null || _e === void 0 ? void 0 : _e.from) === null || _f === void 0 ? void 0 : _f.username)}`);
    yield ctx.reply(helpTextLines);
    yield ctx.scene.enter("MAIN_SCENE");
}));
bot.help((ctx) => ctx.reply(helpTextLines));
bot.command("harflar", (ctx) => ctx.scene.enter("HARFLAR_SCENE"));
bot.command("kalimalar", (ctx) => ctx.scene.enter("KALIMALAR_SCENE"));
bot.command("nur", (ctx) => ctx.scene.enter("FURQON_SCENE"));
bot.hears(MAIN_BUTTONS.HARFLAR_BTN, (ctx) => ctx.scene.enter("HARFLAR_SCENE"));
bot.hears(MAIN_BUTTONS.KALIMALAR_BTN, (ctx) => ctx.scene.enter("KALIMALAR_SCENE"));
bot.hears(MAIN_BUTTONS.DUOLAR_BTN, (ctx) => ctx.scene.enter("DUOLAR_SCENE"));
// bot.hears(MAIN_BUTTONS.TALAFFUZ_BTN, (ctx) =>
//   ctx.scene.enter("TALAFFUZ_SCENE")
// );
bot.hears(MAIN_BUTTONS.FURQON_BTN, (ctx) => ctx.scene.enter("FURQON_SCENE"));
bot.hears(MAIN_BUTTONS.PROFILE_BTN, (ctx) => ctx.scene.enter("PROFILE_SCENE"));
bot.hears(MAIN_BUTTONS.VIKTORINA_BTN, (ctx) => ctx.scene.enter("POLL_SCENE"));
bot.hears(ANNOUNCE_BTN, (ctx) => ctx.scene.enter("ELON_SCENE"));
bot.hears(BACK_BUTTON, (ctx) => ctx.scene.enter("MAIN_SCENE"));
bot.command("auth", (ctx) => ctx.scene.enter("AUTH_SCENE"));
bot.on("message", (ctx) => {
    // console.log("ctx.message", ctx.message.message_id);
    //Fixme
    if (!ctx.session.current) {
        ctx.scene.enter("MAIN_SCENE");
        return ctx;
    }
});
// bot.telegram.setWebhook(process.env.BOT_WEBHOOK_URL);
exports.handler = function (event, context, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            bot.handleUpdate(event);
            return callback(null, {
                statusCode: 200,
                body: ""
            });
        }
        catch (err) {
            Sentry.captureException(err);
        }
    });
};
// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
