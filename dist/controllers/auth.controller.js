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
const user_service_1 = __importDefault(require("../services/user.service"));
const userService = new user_service_1.default();
class AuthController {
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return res.status(400).json({ success: false, msg: 'Email e senha são necessários' });
                }
                const { user, token } = yield userService.loginUser(req.body);
                if (!user) {
                    return res.status(401).json({ success: false, msg: 'Credenciais inválidas' });
                }
                return res.status(200).json({
                    success: true,
                    msg: 'Logado com sucesso',
                    data: { user, token }
                });
            }
            catch (err) {
                console.error('Erro no login:', err);
                return res.status(500).json({ success: false, msg: 'Error Database' });
            }
        });
    }
}
exports.default = AuthController;
