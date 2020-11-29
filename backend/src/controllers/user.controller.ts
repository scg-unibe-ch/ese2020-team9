
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
        userService.sendEmailWithResetLink(req.body.userEmail)
        .then(() => res.send({message: 'We sent you an email, check out your mail box!'}))
        .catch((err) => res.status(404).send(err));
    }
);

// Request gets the Username from the token
userController.post('/restorePassword', verifyPasswordToken,
    (req: Request, res: Response) => {
        userService.restorePassword(req.body.tokenPayload.userName, req.body.password)
        .then(() => res.send({message: 'Successfully changed the password, you may now sign in!'}))
        .catch(() => res.status(500).send({message: 'Failed to change the password, please try again!'}));
    }
);

userController.put('/updateGameScore/:userId/:newScore' ,
    (req: Request, res: Response) => {
        const userId = Number.parseInt(req.params.userId, 10);
        const newScore = Number.parseInt(req.params.newScore, 10);
        userService.updateGameScore(userId, newScore).then(() => {
            res.status(200).send({message: 'Game score successfully updated!'});
        })
        .catch(err => res.status(500).send(err));
    }
);


userController.get('/gameHighscores',
    (req: Request, res: Response) => {
        userService.getGameHighScores().then(users => {
            console.log('##########################################');
            console.log(users);
            res.status(200).send(users);
        })
        .catch(err => res.status(500).send(err));
    }
);

userController.get('/overallHighscores',
    (req: Request, res: Response) => {
        userService.getOverallHighScores().then(users => {
            console.log('##########################################');
            console.log(users);
            res.status(200).send(users);
        })
        .catch(err => res.status(500).send(err));
    }
);

export const UserController: Router = userController;
