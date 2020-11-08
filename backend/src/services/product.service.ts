import {  Product, ProductAttributes } from './../models/product.model';
import {SearchRequest} from './../models/search.model';

export class ProductService {

    public create(product: ProductAttributes): Promise<ProductAttributes> {
        return(Product.create(product))
            .then(inserted => Promise.resolve(inserted).catch(err => Promise.reject(err)));
    }

    public update(productId: number, product: ProductAttributes): Promise<ProductAttributes> {
        return Product.findByPk(productId).then((isFound) => isFound.update(product)
        .then(() => {
            return Promise.resolve(isFound);
        }).catch(err => Promise.reject(err)));
        }



    public getProduct(productId: number): Promise<Product> {
        return Product.findByPk(productId);
    }


    public getProductsOfCategory(category: string): Promise<Product[]> {
        const { Op } = require('sequelize');
        return Product.findAll({
            where: {
              [Op.and]: [
                { productCategory: category }
              ]
            }
        });
    }

    public getProductsOfUser(userId: number): Promise<Product[]> {
        const { Op } = require('sequelize');
        return Product.findAll({
            where: {
              [Op.and]: [
                { UserId: userId }
              ]
            }
        });
    }

    public getAll(): Promise<Product[]> {
        return Product.findAll();
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
        });
    }

    public getAllUnapproved(): Promise<Product[]> {
        return Product.findAll({
            where: {
                isApproved: false
            },
        });
    }

    public deleteProduct(id: number): Promise<Product> {
        return Product.findByPk(id)
        .then(isFound =>  isFound.destroy()
            .then(() => Promise.resolve(isFound))
            .catch(err => Promise.reject(err)));
    }

    public searchProduct(searchParameters: SearchRequest): Promise<Product[]> {
        const { Op } = require('sequelize');
        const where: any = {};

        where.isApproved = {
            [Op.is]: true
        };

        if (searchParameters.name) {
            where.productName = {
                [Op.like]:  '%' + searchParameters.name + '%'
            };
        }

        if (searchParameters.priceMax && searchParameters.priceMin) {
            where.productPrice = {
                [Op.gte]: searchParameters.priceMin,
                [Op.lte]: searchParameters.priceMax
            };

        } else if (searchParameters.priceMax && !searchParameters.priceMin) {
            where.productPrice = {
                [Op.lte]: searchParameters.priceMax
            };

        } else if (searchParameters.priceMin && !searchParameters.priceMax) {
            where.productPrice = {
                [Op.gte]: searchParameters.priceMin
            };
        }

        if (searchParameters.delivery === true || searchParameters.delivery === false) {
            where.productDelivery = {
                [Op.is]: searchParameters.delivery
            };
        }

        if (searchParameters.location ) {
            where.productLocation = {
                [Op.like]:  '%' + searchParameters.location + '%'
            };
        }

        if (searchParameters.available === true || searchParameters.available === false) {
            where.isAvailable = {
                [Op.is]: searchParameters.available
            };
        }

        return Product.findAll({
            where: where
        }).catch(err => Promise.reject({message: err}));
    }
}


