"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_connection_1 = __importDefault(require("../database/prisma.connection"));
class ReplyService {
    addReply(replyData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userToken, tweetId, content } = replyData;
            const user = yield prisma_connection_1.default.users.findFirst({
                where: { token: userToken },
            });
            if (!user) {
                throw new Error('Token inválido ou usuário não existe');
            }
            const originalTweet = yield prisma_connection_1.default.tweets.findUnique({
                where: { id: tweetId },
            });
            if (!originalTweet) {
                throw new Error('Tweet original não encontrado');
            }
            const reply = yield prisma_connection_1.default.replies.create({
                data: {
                    userId: user.id,
                    tweetId,
                    content,
                    tweetType: 'Reply',
                },
            });
            return reply;
        });
    }
    listReplies(tweetId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tweet = yield prisma_connection_1.default.tweets.findUnique({
                where: { id: tweetId },
            });
            if (!tweet) {
                throw new Error('Tweet não encontrado');
            }
            const replies = yield prisma_connection_1.default.replies.findMany({
                where: { tweetId },
                include: { user: true },
            });
            return replies;
        });
    }
    getReplyById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_connection_1.default.replies.findUnique({
                where: { id },
                include: { user: true },
            });
        });
    }
    updateReply(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!content) {
                throw new Error('O conteúdo não pode estar vazio.');
            }
            return prisma_connection_1.default.replies.update({
                where: { id },
                data: { content },
            });
        });
    }
    deleteReply(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma_connection_1.default.replies.delete({
                    where: { id },
                });
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
}
exports.default = ReplyService;
