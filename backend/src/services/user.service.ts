import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../models/login.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {

    public register(user: UserAttributes): Promise<UserAttributes> {
        const saltRounds = 12;
        user.password = bcrypt.hashSync(user.password, saltRounds); // hashes the password, never store passwords as plaintext
        const { Op } = require('sequelize');
        return User.findOne({
            where:  {
                [Op.or]: [
                {userName: user.userName},
                {userMail: user.userMail}
                ]
            }
        }).then(function(userFound) {
            if (userFound) {
            return Promise.reject({message: 'This username or email adress is already being used!'});
            }

            return User.create(user).then(inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
        })
        .catch(err => Promise.reject(err));


    }

    public login(loginRequestee: LoginRequest): Promise<User | LoginResponse> {
        const secret = process.env.JWT_SECRET;
        const { Op } = require('sequelize');

        return User.findOne({
            where:  {
                [Op.or]: [
                {userName: loginRequestee.userLogin},
                {userMail: loginRequestee.userLogin}
                ]
            }
        })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(loginRequestee.password, user.password)) {
                    const token: string = jwt.sign({ userName: user.userName, userId: user.userId, admin: user.admin }, secret, { expiresIn: '2h' });
                    return Promise.resolve({ user, token });
                } else {
                return Promise.reject({message: 'Wrong password'});
                }
            } else {
                return Promise.reject({message: 'Could not find this User'});
            }
        })
        .catch(err => Promise.reject(err));
    }

    public getAll(): Promise<User[]> {
        return User.findAll();
    }
}
