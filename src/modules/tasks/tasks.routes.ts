import { Router } from 'express';
import { Tasks } from './tasks.controller';
import { validator } from '../../validate';
import { AddTask, editTask } from './tasks.modal';

import { AuthorizeMiddleware } from '../../middleware/authorize.middleware';

const router: Router = Router();
const tasksController = new Tasks();
const authorizeMiddleware = new AuthorizeMiddleware();
const V: validator = new validator();

router.use([
    (req, res, next) => {
      req.byPassRoute = [];
      next();
    },
    authorizeMiddleware.authorizeUser,
  ]);

// add task
router.post('/', V.validate(AddTask), tasksController.createTask)
// get all tasks
router.get('/', tasksController.getTasks);
// get task by id
router.get('/:id', tasksController.getById);
// update task by id
router.put('/:id', V.validate(editTask), tasksController.editTask)
// delete task by id
router.delete('/:id', tasksController.deleteTask);

export const tasksRoutes: Router = router;