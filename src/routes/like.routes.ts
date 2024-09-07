import { Router } from 'express';
import LikeController from '../controllers/like.controller';
import authMiddleware from '../middlewares/authMiddleware';

const routes = () => {
    const router = Router();
    const likeController = new LikeController();

    router.post('/', authMiddleware, likeController.toggleLike);
    router.get('/:tweetId', likeController.listLikes);

    return router;
}

export default routes;
