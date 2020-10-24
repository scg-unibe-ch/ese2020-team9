import express from 'express';
import { Router, Request, Response } from 'express';
import { verifyAdmin, verifyToken } from '../middlewares/checkAuth';
import { ProductService } from '../services/product.service';

const productController: Router = express.Router();
const productService = new ProductService();

productController.post('/', (req: Request, res: Response) => {
    res.status(200).send({message: 'POST works!'});
});

productController.put('/:id', (req: Request, res: Response) => {
    res.status(200).send({message: 'PUT works!'});
});

productController.delete('/:id', (req: Request, res: Response) => {
    res.status(200).send({message: 'DELETE works!'});
});

productController.post('/approve/:id', verifyAdmin,
    (req: Request, res: Response) => {
        const id = Number.parseInt(req.params.id, 10);
        productService.approve(id).then(approved => res.send({message: 'Successfully approved product ' + approved + '!'}))
        .catch(err => res.status(500).send(err));
    }
);

export const ProductController: Router = productController;
