import * as express from 'express';
import { tasksRoutes } from './src/modules/tasks/tasks.routes';
import { authRoute } from './src/modules/auth/authRoutes';
export class Routes {
    protected app: express.Application;
    constructor() {

    }

    public routePath() {
        const router: express.Router = express.Router();
        router.use("/auth", authRoute);
        router.use('/tasks', tasksRoutes );
        router.all('/*', (req, res) => {
            res.send('Welcome to Tasks CRUD project :) ');
        });
        return router;
}
}
