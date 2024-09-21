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
class TweetService {
    createTweet(tweetData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token, content } = tweetData;
            if (!content) {
                throw new Error('O conteúdo não pode estar vazio.');
            }
            const user = yield prisma_connection_1.default.users.findFirst({
                where: { token }
            });
            if (!user) {
                throw new Error('Você precisa estar logado para tweetar');
            }
            const tweet = yield prisma_connection_1.default.tweets.create({
                data: {
                    content,
                    userId: user.id,
                    tweetType: 'Tweet',
                },
            });
            return tweet;
        });
    }
    listTweets() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_connection_1.default.tweets.findMany({
                include: { user: true }
            });
        });
    }
    getTweetById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_connection_1.default.tweets.findUnique({
                where: { id },
                include: { user: true }
            });
        });
    }
    updateTweet(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!content) {
                throw new Error('O conteúdo não pode estar vazio.');
            }
            return prisma_connection_1.default.tweets.update({
                where: { id },
                data: { content }
            });
        });
    }
    deleteTweet(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma_connection_1.default.tweets.delete({
                    where: { id }
                });
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
}
exports.default = TweetService;
