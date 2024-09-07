import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import TweetController from '../controllers/tweet.controller';

const routes = () => {
    const router = Router();
    const tweetController = new TweetController();

    router.post('/', authMiddleware, tweetController.create);
    router.get('/', tweetController.list);
    router.get('/:id', tweetController.show);

    return router;
}

export default routes;
