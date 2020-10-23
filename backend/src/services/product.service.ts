import { resolve } from 'path';
import { Product, ProductAttributes } from './../models/product.model';

export class ProductService {

    public create(product: ProductAttributes): Promise<ProductAttributes> {
        return(Product.create(product)).then(inserted => Promise.resolve(inserted).catch(err => Promise.reject(err)));
    }

    public update(id: number, product: ProductAttributes): Promise<ProductAttributes> {
        return Product.findByPk(id).then((isFound) => isFound.update(product)
        .then(() => {
            return Promise.resolve(isFound);
        }).catch(err => Promise.reject(err)));
        }


    public getProduct(id: number): Promise<Product> {
        return Product.findByPk(id);
    }

    public getProductsOfCategory(category: string): Promise<Product[]> {
        const { Op } = require('sequelize');
        return Product.findAll({
            where: {
              [Op.and]: [
                { category: category }
              ]
            }
          });

    }


    public getAll(): Promise<Product[]> {
        return Product.findAll();
    }

    public deleteProduct(id: number): Promise<void | Product> {
        return Product.findByPk(id)
        .then(isFound =>  isFound.destroy()
            .then(() => Promise.resolve(isFound))
            .catch(err => Promise.reject(err)));
    }
}
