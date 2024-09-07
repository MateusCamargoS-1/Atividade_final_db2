import { Router } from 'express';
import FollowerController from '../controllers/follower.controller';
import authMiddleware from '../middlewares/authMiddleware';

const routes = () => {
    const router = Router();
    const followerController = new FollowerController();

    router.post('/', authMiddleware, followerController.toggleFollow);
    router.get('/followers/:id', followerController.listFollowers);

    return router;
}

export default routes;
