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
const reply_service_1 = __importDefault(require("../services/reply.service"));
const replyService = new reply_service_1.default();
class ReplyController {
    addReply(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userToken = req.headers.authorization;
                const { tweetId, content } = req.body;
                if (!userToken) {
                    return res.status(401).json({ success: false, msg: 'Token é necessário' });
                }
                const replyData = { userToken, tweetId, content };
                const reply = yield replyService.addReply(replyData);
                return res.status(201).json({
                    success: true,
                    msg: 'Resposta adicionada com sucesso',
                    data: reply,
                });
            }
            catch (error) {
                return res.status(500).json({ success: false, msg: 'Error Database' });
            }
        });
    }
    listReplies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { tweetId } = req.params;
                const replies = yield replyService.listReplies(tweetId);
                return res.status(200).json({
                    success: true,
                    msg: 'Lista de respostas',
                    data: replies,
                });
            }
            catch (error) {
                return res.status(500).json({ success: false, msg: 'Error Database' });
            }
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const reply = yield replyService.getReplyById(id);
                if (reply) {
                    return res.status(200).json({
                        success: true,
                        msg: 'Resposta encontrada',
                        data: reply,
                    });
                }
                return res.status(404).json({
                    success: false,
                    msg: 'Resposta não encontrada',
                });
            }
            catch (error) {
                return res.status(500).json({ success: false, msg: 'Error Database' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { content } = req.body;
            try {
                const reply = yield replyService.updateReply(id, content);
                if (reply) {
                    return res.status(200).json({
                        success: true,
                        msg: 'Resposta atualizada com sucesso',
                        data: reply,
                    });
                }
                return res.status(404).json({
                    success: false,
                    msg: 'Resposta não encontrada',
                });
            }
            catch (error) {
                return res.status(500).json({ success: false, msg: 'Error Database' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const success = yield replyService.deleteReply(id);
                if (success) {
                    return res.status(200).json({
                        success: true,
                        msg: 'Resposta deletada com sucesso',
                    });
                }
                return res.status(404).json({
                    success: false,
                    msg: 'Resposta não encontrada',
                });
            }
            catch (error) {
                return res.status(500).json({ success: false, msg: 'Error Database' });
            }
        });
    }
}
exports.default = ReplyController;
