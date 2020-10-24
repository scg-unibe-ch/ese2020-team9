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

productController.post('/approve', verifyAdmin,
    (req: Request, res: Response) => {
            productService.approve(req.body).then(approved => res.send({message: 'Successfully approved the product!'}))
            .catch(err => res.status(500).send(err));
    }
);

productController.get('/', verifyToken,
    (req: Request, res: Response) => {
        productService.getAll().then(products => res.send(products)).catch(err => res.status(500).send(err));
    }
);

export const ProductController: Router = productController;
