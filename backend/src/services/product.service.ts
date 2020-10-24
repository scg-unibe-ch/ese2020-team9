import { Product, ProductAttributes } from './../models/product.model';

export class ProductService {

    public create(product: ProductAttributes): Promise<ProductAttributes> {
        return null;
    }

    public update(product: ProductAttributes): Promise<ProductAttributes> {
        return null;
    }

    public delete(id: number): Promise<any> {
        return null;
    }

    public approve(id: ProductAttributes): Promise<Product> {
        return Product.findOne({
            where: {
                productId: id.productId
            }
        }).then(product => {
            return product.update({
                isApproved: true
            });
        })
        .catch(err => Promise.reject({message: err}));
    }

    public getAll(): Promise<Product[]> {
        return Product.findAll();
    }



}
