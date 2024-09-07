import { Router } from 'express';
import ReplyController from '../controllers/reply.controller';
import authMiddleware from '../middlewares/authMiddleware';

const routes = () => {
    const router = Router();
    const replyController = new ReplyController();

    router.post('/', authMiddleware, replyController.addReply);
    router.get('/:tweetId', replyController.listReplies); 

    return router;
}

export default routes;
