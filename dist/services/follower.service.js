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
class FollowerService {
    toggleFollow(followerData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { followerToken, followerId, action } = followerData;
            const follower = yield prisma_connection_1.default.users.findFirst({
                where: { token: followerToken },
            });
            if (!follower) {
                throw new Error('Token inválido ou usuário não encontrado');
            }
            if (action === 'follow') {
                if (follower.id === followerId) {
                    throw new Error('Você não pode seguir a si mesmo');
                }
                const followee = yield prisma_connection_1.default.users.findUnique({
                    where: { id: followerId },
                });
                if (!followee) {
                    throw new Error('Usuário para seguir não encontrado');
                }
                const alreadyFollowing = yield prisma_connection_1.default.followers.findFirst({
                    where: {
                        userId: follower.id,
                        followerId: followee.id,
                    },
                });
                if (alreadyFollowing) {
                    throw new Error('Você já está seguindo este usuário');
                }
                const follow = yield prisma_connection_1.default.followers.create({
                    data: {
                        userId: follower.id,
                        followerId: followee.id,
                    },
                });
                return follow;
            }
            else if (action === 'unfollow') {
                const followRelation = yield prisma_connection_1.default.followers.findFirst({
                    where: {
                        userId: follower.id,
                        followerId: followerId,
                    },
                });
                if (!followRelation) {
                    throw new Error('Você não está seguindo este usuário');
                }
                yield prisma_connection_1.default.followers.delete({
                    where: {
                        id: followRelation.id,
                    },
                });
                return { message: 'Você deixou de seguir o usuário' };
            }
            else {
                throw new Error('Ação inválida');
            }
        });
    }
    listFollowers(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const followers = yield prisma_connection_1.default.followers.findMany({
                where: { followerId: userId },
                include: { user: true },
            });
            return followers;
        });
    }
}
exports.default = FollowerService;
