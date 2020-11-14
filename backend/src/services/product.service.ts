import { Product, ProductAttributes } from './../models/product.model';

export class ProductService {

    public create(product: ProductAttributes): Promise<ProductAttributes> {
        return(Product.create(product))
            .then(inserted => Promise.resolve(inserted).catch(err => Promise.reject(err)));
    }

    public update(productId: number, product: ProductAttributes): Promise<ProductAttributes> {
        return Product.findByPk(productId).then(isFound => isFound.update(product)
        .then(() => {
            return Promise.resolve(isFound);
        }).catch(err => Promise.reject(err)));
    }



    public getProduct(productId: number): Promise<Product> {
        return Product.findByPk(productId).then(product => {
            if (product) {
                return Promise.resolve(product);
            } else {
                return Promise.reject(`Product with id ${productId} not found!`);
            }
        })
        .catch(err => Promise.reject({message: err}));
    }


    public getProductsOfCategory(category: string): Promise<Product[]> {
        const { Op } = require('sequelize');
        return Product.findAll({
            where: {
              [Op.and]: [
                { productCategory: category }
              ]
            }
        })
        .catch(err => Promise.reject(err));
    }

    public getProductsOfUser(userId: number): Promise<Product[]> {
        const { Op } = require('sequelize');
        return Product.findAll({
            where: {
              [Op.and]: [
                { UserId: userId }
              ]
            }
        })
        .catch(err => Promise.reject(err));
    }

    public getAll(): Promise<Product[]> {
        return Product.findAll()
        .catch(err => Promise.reject(err));
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

    public getAllApproved(): Promise<Product[]> {
        return Product.findAll({
            where: {
                isApproved: true
            },
        }).catch(err => Promise.reject(err));
    }

    public getAllUnapproved(): Promise<Product[]> {
        return Product.findAll({
            where: {
                isApproved: false
            }
        }).catch(err => Promise.reject(err));
    }

    public getBoughtProducts(buyerId: number): Promise<Product[]> {
        const { Op } = require('sequelize');
        return Product.findAll({
            where: {
              [Op.and]: [
                { buyerId: buyerId }
              ]
            }
        })
        .catch(err => Promise.reject(err));
    }

    public getSoldProducts(userId: number): Promise<Product[]> {
        const { Op } = require('sequelize');
        return Product.findAll({
            where: {
              [Op.and]: [
                { 
                    userId: userId, 
                    buyerId: {[Op.ne]: null} 
                }
              ]
            }
        })
        .catch(err => Promise.reject(err));
    }

    public deleteProduct(id: number): Promise<Product> {
        return Product.findByPk(id)
        .then(isFound =>  isFound.destroy()
            .then(() => Promise.resolve(isFound))
            .catch(err => Promise.reject(err)));
    }


    public buyProduct(productId: number, buyerId: number): Promise<Product> {
        return Product.findByPk(productId)
        .then(isFound => isFound.update({
            userId: buyerId
        })
        .catch(err => Promise.reject(err)));
    }
}
