import { Request, Response, Router } from 'express';

/**
 * `commentRouter` defines the router of comments
 */
export const commentRouter = () => {
    const router = Router();

    router.get('/', (req: Request, res: Response, next) => {
        res.json({ 
            message: 'Welcome to the Comment API!' 
        });
    });

    return router;
}