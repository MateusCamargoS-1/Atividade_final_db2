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
const like_service_1 = __importDefault(require("../services/like.service"));
const likeService = new like_service_1.default();
class LikeController {
    toggleLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userToken = req.headers.authorization;
                const { tweetId, action } = req.body;
                if (!userToken) {
                    return res.status(401).json({ success: false, msg: 'Token é necessário' });
                }
                const likeData = { userToken, tweetId, action };
                const result = yield likeService.toggleLike(likeData);
                return res.status(200).json({
                    success: true,
                    msg: action === 'like' ? 'Tweet curtido com sucesso' : 'Like removido com sucesso',
                    data: result,
                });
            }
            catch (error) {
                return res.status(500).json({ success: false, msg: 'Error Database' });
            }
        });
    }
    listLikes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tweetId } = req.params;
            try {
                const likes = yield likeService.listLikes(tweetId);
                return res.status(200).json({
                    success: true,
                    msg: 'Lista de likes',
                    data: likes,
                });
            }
            catch (error) {
                return res.status(500).json({ success: false, msg: 'Error Database' });
            }
        });
    }
}
exports.default = LikeController;
