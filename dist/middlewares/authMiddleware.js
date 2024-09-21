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
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ success: false, msg: 'Não autorizado' });
        }
        try {
            const user = yield prisma_connection_1.default.users.findFirst({
                where: {
                    token: authHeader
                }
            });
            if (!user) {
                return res.status(401).json({ success: false, msg: 'Não autorizado ou usuario não existe' });
            }
            next();
        }
        catch (err) {
            console.error('Erro de autorização:', err);
            return res.status(500).json({ success: false, msg: 'Error databases' });
        }
    });
}
exports.default = authMiddleware;
