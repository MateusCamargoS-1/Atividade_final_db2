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
const tweet_service_1 = __importDefault(require("../services/tweet.service"));
const tweetService = new tweet_service_1.default();
class TweetController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                if (!token) {
                    return res.status(401).json({ success: false, msg: 'Token é preciso' });
                }
                const { content } = req.body;
                const tweetData = { token, content };
                const tweet = yield tweetService.createTweet(tweetData);
                return res.status(201).json({
                    success: true,
                    msg: 'Tweet criado com sucesso',
                    data: tweet,
                });
            }
            catch (error) {
                return res.status(500).json({ success: false, msg: 'Error Database' });
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tweets = yield tweetService.listTweets();
                return res.status(200).json({
                    success: true,
                    msg: 'Lista de tweets',
                    data: tweets,
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
                const tweet = yield tweetService.getTweetById(id);
                if (tweet) {
                    return res.status(200).json({
                        success: true,
                        msg: 'Tweet encontrado',
                        data: tweet,
                    });
                }
                return res.status(404).json({
                    success: false,
                    msg: 'Tweet não encontrado',
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
                const tweet = yield tweetService.updateTweet(id, content);
                if (tweet) {
                    return res.status(200).json({
                        success: true,
                        msg: 'Tweet atualizado com sucesso',
                        data: tweet,
                    });
                }
                return res.status(404).json({
                    success: false,
                    msg: 'Tweet não encontrado',
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
                const success = yield tweetService.deleteTweet(id);
                if (success) {
                    return res.status(200).json({
                        success: true,
                        msg: 'Tweet deletado com sucesso',
                    });
                }
                return res.status(404).json({
                    success: false,
                    msg: 'Tweet não encontrado',
                });
            }
            catch (error) {
                return res.status(500).json({ success: false, msg: 'Error Database' });
            }
        });
    }
}
exports.default = TweetController;
