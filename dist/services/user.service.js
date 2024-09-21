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
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
class UserService {
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, name, username } = userData;
            const userExist = yield prisma_connection_1.default.users.findUnique({
                where: { email }
            });
            if (userExist) {
                throw new Error('Email Indisponivel');
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const token = (0, uuid_1.v4)();
            const newUser = yield prisma_connection_1.default.users.create({
                data: {
                    token: token,
                    email,
                    password: hashedPassword,
                    name,
                    username,
                }
            });
            return { user: newUser, token };
        });
    }
    listUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_connection_1.default.users.findMany();
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_connection_1.default.users.findUnique({
                where: { id }
            });
        });
    }
    updateUser(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password, username } = updates;
            if (password) {
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                return yield prisma_connection_1.default.users.update({
                    where: { id },
                    data: { name, password: hashedPassword, username }
                });
            }
            else {
                return yield prisma_connection_1.default.users.update({
                    where: { id },
                    data: { name, username }
                });
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma_connection_1.default.users.delete({
                    where: { id }
                });
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    loginUser(loginData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = loginData;
            const user = yield prisma_connection_1.default.users.findUnique({
                where: { email }
            });
            if (!user) {
                throw new Error('Email ou Senha Invalido.');
            }
            const passwordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordValid) {
                throw new Error('Email ou senha invalido.');
            }
            const token = (0, uuid_1.v4)();
            return { user, token };
        });
    }
}
exports.default = UserService;
