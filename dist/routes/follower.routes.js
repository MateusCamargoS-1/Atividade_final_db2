"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const follower_controller_1 = __importDefault(require("../controllers/follower.controller"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const routes = () => {
    const router = (0, express_1.Router)();
    const followerController = new follower_controller_1.default();
    router.post('/', authMiddleware_1.default, followerController.toggleFollow);
    router.get('/followers/:id', followerController.listFollowers);
    return router;
};
exports.default = routes;
