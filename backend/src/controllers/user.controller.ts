
import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyAdmin, verifyToken } from '../middlewares/checkAuth';

const userController: Router = express.Router();
const userService = new UserService();

userController.post('/register',
    (req: Request, res: Response) => {
            userService.register(req.body).then(registered => res.send(registered)).catch(err => res.status(400).send(err));
    }
);

userController.post('/login',
    (req: Request, res: Response) => {
        userService.login(req.body).then(login => res.send(login)).catch(err => res.status(400).send(err));
    }
);

userController.get('/', verifyToken, // you can add middleware on specific requests like that
    (req: Request, res: Response) => {
        userService.getAll().then(users => res.send(users)).catch(err => res.status(404).send(err));
    }
);

userController.delete('/:id', verifyAdmin,
    (req: Request, res: Response) => {
        try {
            const id = Number.parseInt(req.params.id, 10);
            userService.deleteUser(id).then(number => res.send({message: 'Successfully deleted ' + number + ' entry'}))
            .catch(err => res.status(500).send(err));
        } catch {
            res.status(404).send({message: 'no valid id parameter'});
        }
    }
);

userController.put('/makeAdmin/:id', verifyAdmin,
    (req: Request, res: Response) => {
        try {
            const id = Number.parseInt(req.params.id, 10);
            userService.makeUserAdmin(id).then(user => res.send(user)).catch(err => res.status(500).send(err));
        } catch {
            res.status(404).send({message: 'no valid id parameter'});
        }
    }
);

export const UserController: Router = userController;
