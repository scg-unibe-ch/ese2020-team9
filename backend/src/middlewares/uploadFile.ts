import multer from 'multer';
import { Request, Response } from 'express';



export function uploadFile(req: Request, res: Response, next: any) {

    const storage = multer.diskStorage({
        destination: 'temp/',
        filename: function(_req, file, cb) {
            cb(null, 'product' + Date.now() + '.' + file.originalname.split('.')[1]);
        }
    });

    const upload = multer({storage: storage,
        fileFilter: (_req, file, cb) => {
        if (!(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg')) {
            res.status(400).send('Only .png, .jpg and .jpeg format allowed!');
        } else {
            cb(null, true);
        }}}).single('image');

        upload(req, res, next);
    }
