import { NextFunction, Request, Response } from "express";
import db from '../database/prisma.connection';

async function authMiddleware(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({success: false, msg: 'Não autorizado'});
    }

    try {
        const user = await db.users.findFirst({
            where: {
                token: authHeader
            }
        });

        if(!user) {
            return res.status(401).json({success: false, msg: 'Não autorizado ou usuario não existe'});
        }

        next();
    } catch(err) {
        console.error('Erro de autorização:', err);
        return res.status(500).json({success: false, msg: 'Error databases' });
    }
}

export default authMiddleware;