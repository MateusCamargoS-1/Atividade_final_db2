import { Request, Response } from 'express';
import UserService from '../services/user.service';

const userService = new UserService();

class AuthController {
    public async store(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ success: false, msg: 'Email e senha são necessários' });
            }

            const { user, token } = await userService.loginUser(req.body);

            if (!user) {
                return res.status(401).json({ success: false, msg: 'Credenciais inválidas' });
            }

            return res.status(200).json({
                success: true,
                msg: 'Logado com sucesso',
                data: { user, token }
            });
        } catch (err) {
            console.error('Erro no login:', err);
            return res.status(500).json({ success: false, msg: 'Error Database' });
        }
    }
}

export default AuthController;
