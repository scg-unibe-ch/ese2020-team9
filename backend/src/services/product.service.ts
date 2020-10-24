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

    public approve(id: number): Promise<number> {
        return Product.findOne({
            where: {
                productId: id
            }
        }).then(product => {
            return product.update({
                isApproved: true
            });
        }).then(product => {
            return product.userId;
        } )
        .catch(err => Promise.reject({message: err}));
    }
}
