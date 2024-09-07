import db from '../database/prisma.connection';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import userType from '../types/userType';

class UserService {
    public async createUser(userData: userType) {
        const { email, password, name, username } = userData;
        const userExist = await db.users.findUnique({
            where: { email }
        });

        if (userExist) {
            throw new Error('Email Indisponivel');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const token = uuid();
        const newUser = await db.users.create({
            data: {
                token: token,
                email,
                password: hashedPassword,
                name,
                username,
            }
        });

        return { user: newUser, token };
    }

    public async listUsers() {
        return db.users.findMany();
    }

    public async getUserById(id: string) {
        return db.users.findUnique({
            where: { id }
        });
    }

    public async updateUser(id: string, updates: Partial<userType>) {
        const { name, password, username } = updates;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            return db.users.update({
                where: { id },
                data: { name, password: hashedPassword, username }
            });
        } else {
            return db.users.update({
                where: { id },
                data: { name, username }
            });
        }
    }

    public async deleteUser(id: string) {
        try {
            await db.users.delete({
                where: { id }
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    public async loginUser(loginData: userType) {
        const { email, password } = loginData;
        const user = await db.users.findUnique({
            where: { email }
        });

        if (!user) {
            throw new Error('Email ou Senha Invalido.');
        }

        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid) {
            throw new Error('Email ou senha invalido.');
        }

        const token = uuid();

        return { user, token };
    }
}

export default UserService;
