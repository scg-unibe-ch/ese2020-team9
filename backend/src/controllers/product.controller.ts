import express from 'express';
import { Router, Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { userInfo } from 'os';

const productController: Router = express.Router();
const productService = new ProductService();

productController.post('/', (req: Request, res: Response) => {
    productService.create(req.body).then(() =>
        res.status(200).send({message: 'Product Created!'}))
        .catch(err => res.status(500).send(err));
});

productController.put('/:id', (req: Request, res: Response) => {
    productService.update(parseInt(req.params.id, 10), req.body)
    .then(() => res.status(200).send({message: 'Product Updated!'}))
    .catch(err => res.status(500).send(err));
});

productController.delete('/:id', (req: Request, res: Response) => {
    productService.deleteProduct(parseInt(req.params.id, 10))
    .then(() => res.send({message: 'Product Deleted!'}))
    .catch(err => res.status(500).send(err));
});

productController.get('/', (req: Request, res: Response) => {
        productService.getAll().then(products => res.send(products)).catch(err => res.status(500).send(err));
    }
); // get all products that are available

productController.get('/:category', (req: Request, res: Response) => {
    productService.getProductsOfCategory(req.params.category).then(products => res.send(products)).catch(err => res.status(500).send(err));
}
); // get all products that are available of a category


productController.get('/:id', (req: Request, res: Response) => {
        productService.getProduct(parseInt(req.params.id, 10)).then(products => res.send(products)).catch(err => res.status(500).send(err));
    }
); // get product by id

export const ProductController: Router = productController;

