import { Request, Response } from 'express';
import LikeService from '../services/like.service';

const likeService = new LikeService();

class LikeController {
    public async toggleLike(req: Request, res: Response) {
        try {
            const userToken = req.headers.authorization;
            const { tweetId, action } = req.body;

            if (!userToken) {
                return res.status(401).json({ success: false, msg: 'Token é necessário' });
            }

            const likeData = { userToken, tweetId, action };
            const result = await likeService.toggleLike(likeData);

            return res.status(200).json({
                success: true,
                msg: action === 'like' ? 'Tweet curtido com sucesso' : 'Like removido com sucesso',
                data: result,
            });
        } catch (error) {
            return res.status(500).json({ success: false, msg: 'Error Database' });
        }
    }

    public async listLikes(req: Request, res: Response) {
        const { tweetId } = req.params;

        try {
            const likes = await likeService.listLikes(tweetId);
            return res.status(200).json({
                success: true,
                msg: 'Lista de likes',
                data: likes,
            });
        } catch (error) {
            return res.status(500).json({ success: false, msg: 'Error Database' });
        }
    }
}

export default LikeController;
