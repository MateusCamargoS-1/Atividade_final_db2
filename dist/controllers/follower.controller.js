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
const follower_service_1 = __importDefault(require("../services/follower.service"));
const followerService = new follower_service_1.default();
class FollowerController {
    toggleFollow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const followerToken = req.headers.authorization;
                const { followerId, action } = req.body;
                if (!followerToken) {
                    return res.status(401).json({ success: false, msg: 'Token é necessário' });
                }
                const followerData = { followerToken, followerId, action };
                const result = yield followerService.toggleFollow(followerData);
                return res.status(200).json({
                    success: true,
                    msg: action === 'follow' ? 'Seguiu o usuário com sucesso' : 'Deixou de seguir o usuário com sucesso',
                    data: result,
                });
            }
            catch (error) {
                return res.status(500).json({ success: false, msg: 'Error Database' });
            }
        });
    }
    listFollowers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                const followers = yield followerService.listFollowers(userId);
                return res.status(200).json({
                    success: true,
                    msg: 'Lista de seguidores',
                    data: followers,
                });
            }
            catch (error) {
                return res.status(500).json({ success: false, msg: 'Error Database' });
            }
        });
    }
}
exports.default = FollowerController;
