"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reply_controller_1 = __importDefault(require("../controllers/reply.controller"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const routes = () => {
    const router = (0, express_1.Router)();
    const replyController = new reply_controller_1.default();
    router.post('/', authMiddleware_1.default, replyController.addReply);
    router.get('/:tweetId', replyController.listReplies);
    return router;
};
exports.default = routes;
