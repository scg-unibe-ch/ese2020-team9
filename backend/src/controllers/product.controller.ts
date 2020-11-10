import express from 'express';
import { Router, Request, Response } from 'express';
import { verifyAdmin, verifyToken } from '../middlewares/checkAuth';
import { ProductService } from '../services/product.service';

const productController: Router = express.Router();
const productService = new ProductService();

productController.post('/', (req: Request, res: Response) => {
    productService.create(req.body).then(() =>
        res.status(200).send({message: 'Product successfully created!'}))
        .catch(err => res.status(400).send(err));
});

productController.put('/:productId', (req: Request, res: Response) => {
    productService.update(parseInt(req.params.productId, 10), req.body)
    .then(() => res.status(200).send({message: `Product ${req.params.productId} successfully updated!` }))
    .catch(err => res.status(400).send(err));
});

productController.delete('/:id', (req: Request, res: Response) => {
    productService.deleteProduct(parseInt(req.params.id, 10))
    .then(() => res.status(200).send({message: `Product successfully deleted!`}))
    .catch(err => res.status(400).send(err));
});

productController.put('/approve/:id', verifyAdmin,
    (req: Request, res: Response) => {
        const id = Number.parseInt(req.params.id, 10);
        productService.approve(id).then(approved => res.send({message: 'Successfully approved product ' + approved + '!'}))
        .catch(err => res.status(500).send(err));
    }
);
productController.get('/', (req: Request, res: Response) => {
        productService.getAll().then(products => res.status(200).send(products))
            .catch(err => res.status(404).send(err));
    }
); // get all products

productController.get('/approved', (req: Request, res: Response) => {
    productService.getAllApproved().then(products => res.status(200).send(products))
    .catch(err => res.status(404).send(err));
}
); // get all approved products

productController.get('/unapproved', (req: Request, res: Response) => {
    productService.getAllUnapproved().then(products => res.status(200).send(products))
    .catch(err => res.status(404).send(err));
}
); // get all approved products

productController.get('/category/:category', (req: Request, res: Response) => {
    productService.getProductsOfCategory(req.params.category).then(products =>
        res.status(200).send(products))
        .catch(err => res.status(404).send(err));
}
); // get all products that are available of a category

productController.get('/user/:userId', (req: Request, res: Response) => {
    productService.getProductsOfUser(parseInt(req.params.userId, 10))
    .then(products => res.status(200).send(products))
    .catch(err => res.status(404).send(err));
}
); // get all products of a user

productController.get('/:productId', (req: Request, res: Response) => {
    productService.getProduct(parseInt(req.params.productId, 10)).then(product =>
         res.status(200).send(product)).catch(err => res.status(404).send(err));
}
); // get product by id

export const ProductController: Router = productController;

