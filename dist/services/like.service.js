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
class LikeService {
    toggleLike(likeData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userToken, tweetId, action } = likeData;
            const user = yield prisma_connection_1.default.users.findFirst({
                where: { token: userToken },
            });
            if (!user) {
                throw new Error('Token inválido ou usuário não encontrado');
            }
            if (action === 'like') {
                const alreadyLiked = yield prisma_connection_1.default.likes.findFirst({
                    where: {
                        userId: user.id,
                        tweetId: tweetId,
                    },
                });
                if (alreadyLiked) {
                    throw new Error('Você já curtiu este tweet');
                }
                const like = yield prisma_connection_1.default.likes.create({
                    data: {
                        userId: user.id,
                        tweetId: tweetId,
                    },
                });
                return like;
            }
            else if (action === 'unlike') {
                const like = yield prisma_connection_1.default.likes.findFirst({
                    where: {
                        userId: user.id,
                        tweetId: tweetId,
                    },
                });
                if (!like) {
                    throw new Error('Você não curtiu este tweet');
                }
                yield prisma_connection_1.default.likes.delete({
                    where: {
                        id: like.id,
                    },
                });
                return { message: 'Like removido com sucesso' };
            }
            else {
                throw new Error('Ação inválida');
            }
        });
    }
    listLikes(tweetId) {
        return __awaiter(this, void 0, void 0, function* () {
            const likes = yield prisma_connection_1.default.likes.findMany({
                where: { tweetId: tweetId },
                include: { user: true },
            });
            return likes;
        });
    }
}
exports.default = LikeService;
