import { Request, Response } from 'express';
import FollowerService from '../services/follower.service';

const followerService = new FollowerService();

class FollowerController {
    public async toggleFollow(req: Request, res: Response) {
        try {
            const followerToken = req.headers.authorization;
            const { followerId, action } = req.body; 

            if (!followerToken) {
                return res.status(401).json({ success: false, msg: 'Token é necessário' });
            }

            const followerData = { followerToken, followerId, action };
            const result = await followerService.toggleFollow(followerData);

            return res.status(200).json({
                success: true,
                msg: action === 'follow' ? 'Seguiu o usuário com sucesso' : 'Deixou de seguir o usuário com sucesso',
                data: result,
            });
        } catch (error) {
            return res.status(500).json({ success: false, msg: 'Error Database' });
        }
    }

    public async listFollowers(req: Request, res: Response) {
        const { userId } = req.params;

        try {
            const followers = await followerService.listFollowers(userId);
            return res.status(200).json({
                success: true,
                msg: 'Lista de seguidores',
                data: followers,
            });
        } catch (error) {
            return res.status(500).json({ success: false, msg: 'Error Database' });
        }
    }
}

export default FollowerController;
