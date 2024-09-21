"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const tweet_controller_1 = __importDefault(require("../controllers/tweet.controller"));
const routes = () => {
    const router = (0, express_1.Router)();
    const tweetController = new tweet_controller_1.default();
    router.post('/', authMiddleware_1.default, tweetController.create);
    router.get('/', tweetController.list);
    router.get('/:id', tweetController.show);
    return router;
};
exports.default = routes;
