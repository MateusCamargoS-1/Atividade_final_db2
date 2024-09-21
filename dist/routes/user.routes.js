"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const routes = () => {
    const router = (0, express_1.Router)();
    const controller = new user_controller_1.default();
    router.post('/', controller.create);
    router.get('/', authMiddleware_1.default, controller.list);
    router.get('/:id', authMiddleware_1.default, controller.show);
    router.put('/:id', authMiddleware_1.default, controller.update);
    router.delete('/:id', authMiddleware_1.default, controller.delete);
    return router;
};
exports.default = routes;
