
import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyAdmin, verifyToken, verifyPasswordToken } from '../middlewares/checkAuth';

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

userController.post('/edit',
    (req: Request, res: Response) => {
        userService.changeUser(req.body).then(user => res.send(user)).catch(err => res.status(500).send(err));
    }
);

userController.get('/', verifyToken, // you can add middleware on specific requests like that
    (req: Request, res: Response) => {
        userService.getAll().then(users => res.send(users)).catch(err => res.status(404).send(err));
    }
);

userController.get('/:id',
    (req: Request, res: Response) => {
        const id = Number.parseInt(req.params.id, 10);
        userService.getSingleUser(id).then(user => res.send(user)).catch(err => res.status(404).send(err));
    }
);

userController.delete('/:id', verifyAdmin,
    (req: Request, res: Response) => {
        const id = Number.parseInt(req.params.id, 10);
        userService.deleteUser(id).then(number => {
            if (number === 0) {
                res.status(202).send({message: 'No entry to delete'});
            } else if (number === 1) {
                res.send({message: 'Successfully deleted entry with id=' + id});
            } else {
                res.send({message: 'Successfully deleted ' + number + ' entries'});
            }
        })
        .catch(err => res.status(500).send(err));
    }
);

userController.put('/makeAdmin/:id', verifyAdmin,
    (req: Request, res: Response) => {
        const id = Number.parseInt(req.params.id, 10);
        userService.makeUserAdmin(id).then(user => res.send(user)).catch(err => res.status(500).send(err));
    }
);

// Request must contain usermail!
userController.post('/passwordForgotten',
    (req: Request, res: Response) => {
        userService.sendEmailWithResetLink(req.body.userEmail).then(() => res.send({message: 'We sent you an email, check out your mail box!'}))
        .catch(() => res.status(404).send({message: 'This email is not registeret, please sign up!'}));
    }
);

// Request must also contain the username or the email to being able to identify the user
userController.post('/restorePassword', verifyPasswordToken,
    (req: Request, res: Response) => {
        userService.restorePassword(req.body.userLogin, req.body.password).then(() => res.send({message: 'Successfully changed the password, you now may sign in!'}))
            .catch(() => res.status(500).send({message: 'Failed to change the password, please try again!'}));
    }
);

export const UserController: Router = userController;
