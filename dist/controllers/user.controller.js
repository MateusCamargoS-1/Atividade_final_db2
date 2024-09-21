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
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user, token } = yield userService.createUser(req.body);
                return res.status(201).json({ success: true, msg: 'Usuario criado com sucesso', data: { user, token } });
            }
            catch (err) {
                return res.status(500).json({ success: false, msg: 'Error Database' });
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService.listUsers();
                return res.status(200).json({ success: true, msg: 'Lista de usuarios', data: users });
            }
            catch (err) {
                return res.status(500).json({ success: false, msg: 'Error Database' });
            }
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield userService.getUserById(id);
                if (user) {
                    return res.status(200).json({ success: true, msg: 'Usuario Buscado com Sucesso', data: user });
                }
                return res.status(404).json({ success: false, msg: 'Usuario não encontrado' });
            }
            catch (err) {
                return res.status(500).json({ success: false, msg: 'Error Database' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, password, username } = req.body;
            try {
                const updatedUser = yield userService.updateUser(id, { name, password, username });
                if (updatedUser) {
                    return res.status(200).json({ success: true, msg: 'Usuario atualizado com sucesso', data: updatedUser });
                }
                return res.status(404).json({ success: false, msg: 'Usuario não encontrado' });
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
                const success = yield userService.deleteUser(id);
                if (success) {
                    return res.status(200).json({ success: true, msg: 'Usuario deletado com sucesso' });
                }
                return res.status(404).json({ success: false, msg: 'Usuario não encontrado' });
            }
            catch (error) {
                return res.status(500).json({ success: false, msg: 'Error data base' });
            }
        });
    }
}
exports.default = UserController;
