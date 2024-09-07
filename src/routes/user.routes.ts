import { Router } from 'express';
import UserController from '../controllers/user.controller';
import authMiddleware from '../middlewares/authMiddleware';

const routes = () => {
    const router = Router();
    const controller = new UserController();

    router.post('/', controller.create);
    router.get('/', authMiddleware, controller.list);
    router.get('/:id', authMiddleware, controller.show);
    router.put('/:id', authMiddleware, controller.update); 
    router.delete('/:id', authMiddleware, controller.delete);

    return router;
}

export default routes;
