import { Request, Response } from 'express';
import UserService from '../services/user.service';

const userService = new UserService();

class UserController {
    public async create(req: Request, res: Response) {
        try {
            const { user, token } = await userService.createUser(req.body);
            return res.status(201).json({ success: true, msg: 'Usuario criado com sucesso', data: { user, token } });
        } catch (err) {
            return res.status(500).json({ success: false, msg: 'Error Database' });
        }
    }

    public async list(req: Request, res: Response) {
        try {
            const users = await userService.listUsers();
            return res.status(200).json({ success: true, msg: 'Lista de usuarios', data: users });
        } catch (err) {
            return res.status(500).json({ success: false, msg: 'Error Database' });
        }
    }

    public async show(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const user = await userService.getUserById(id);

            if (user) {
                return res.status(200).json({ success: true, msg: 'Usuario Buscado com Sucesso', data: user });
            }

            return res.status(404).json({ success: false, msg: 'Usuario não encontrado' });
        } catch (err) {
            return res.status(500).json({ success: false, msg: 'Error Database' });
        }
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, password, username } = req.body;

        try {
            const updatedUser = await userService.updateUser(id, { name, password, username });

            if (updatedUser) {
                return res.status(200).json({ success: true, msg: 'Usuario atualizado com sucesso', data: updatedUser });
            }

            return res.status(404).json({ success: false, msg: 'Usuario não encontrado' });
        } catch (error) {
            return res.status(500).json({ success: false, msg: 'Error Database' });
        }
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const success = await userService.deleteUser(id);
            if (success) {
                return res.status(200).json({ success: true, msg: 'Usuario deletado com sucesso' });
            }

            return res.status(404).json({ success: false, msg: 'Usuario não encontrado' });
        } catch (error) {
            return res.status(500).json({ success: false, msg: 'Error data base' });
        }
    }
}

export default UserController;
