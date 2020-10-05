import express from 'express';
import { Router, Request, Response } from 'express';

const productController: Router = express.Router();

productController.post('/', (req: Request, res: Response) => {
    res.status(200).send({message: 'POST works!'});
});

productController.put('/:id', (req: Request, res: Response) => {
    res.status(200).send({message: 'PUT works!'});
});

productController.delete('/:id', (req: Request, res: Response) => {
    res.status(200).send({message: 'DELETE works!'});
});

export const ProductController: Router = productController;
