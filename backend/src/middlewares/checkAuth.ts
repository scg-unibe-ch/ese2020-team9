import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { any } from 'sequelize/types/lib/operators';

// this function verifies if Token is valid
export function verifyToken(req: Request, res: Response, next: any) {
    try {
        const decoded = decodeToken(req, res);
        if (decoded == null) {
            res.status(403).send({ message: 'Unauthorized' });
        }

        req.body.tokenPayload = decoded;
        next();
    } catch (err) {
        res.status(403).send({ message: 'Unauthorized' });
    }
}
// this function verifies if User is Admin
export function verifyAdmin(req: Request, res: Response, next: any) {
    try {
        const {admin} = decodeToken(req, res);
        if (admin === true) {
            next();
        } else {
        res.status(403).send({ message: 'Unauthorized' });
        }
    } catch (err) {
    res.status(403).send({ message: 'Unauthorized' });
    }
}
// helper-function which decodes the Token
function decodeToken (req: Request, res: Response): any {

        const secret = process.env.JWT_SECRET;
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secret);

        return decoded;

 }
