import { Request, Response, Router } from 'express';

/**
 * `postRouter` defines the router of comments
 */
export const postRouter = () => {
    const router = Router();

    router.get('/', (req: Request, res: Response, next) => {
        res.json({ 
            message: 'Welcome to the Post API!' 
        });
    });

    return router;
}