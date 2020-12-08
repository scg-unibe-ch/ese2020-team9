import { ImageGetAttributes, ProductImage } from '../models/productimage.model';
import { Product, ProductAttributes } from './../models/product.model';
import {SearchRequest} from './../models/search.model';

export class ProductService {

    public create(product: ProductAttributes): Promise<ProductAttributes> {
        return(Product.create(product))
            .then(inserted => Promise.resolve(inserted).catch(err => Promise.reject({message: err})));
    }

    public update(productId: number, product: ProductAttributes): Promise<ProductAttributes> {
        return Product.findByPk(productId).then(isFound => {
            if (isFound === null) {
                return Promise.reject(`Product with id ${productId} not found!`);
            }
            return isFound.update(product);
        })
        .then((updated) => {
                return Promise.resolve(updated);
        })
        .catch(err => Promise.reject({message: err}));
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
        .catch(err => Promise.reject({message: err}));
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
        .catch(err => Promise.reject({message: err}));
    }

    public getAll(): Promise<Product[]> {
        return Product.findAll()
        .catch(err => Promise.reject({message: err}));
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
                isApproved: true,
                isAvailable: true
            },
        }).catch(err => Promise.reject({message: err}));
    }

    public getAllUnapproved(): Promise<Product[]> {
        return Product.findAll({
            where: {
                isApproved: false
            }
        }).catch(err => Promise.reject({message: err}));
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
        .catch(err => Promise.reject({message: err}));
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
        .catch(err => Promise.reject({message: err}));
    }

    public deleteProduct(productId: number): Promise<Product> {
        return Product.findByPk(productId)
        .then(isFound =>  {
            if (isFound === null) {
                return Promise.reject(`Product with id ${productId} not found!`);
            }
            return isFound.destroy()
            .then(() => Promise.resolve(isFound));
        })
        .catch(err => Promise.reject({message: err}));
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
                [Op.eq]: searchParameters.delivery
            };
        }

        if (searchParameters.location && searchParameters.location.length > 0) {
            where.productLocation = {
                [Op.in]:  searchParameters.location
            };
        }

        if (searchParameters.available === true || searchParameters.available === false) {
            where.isAvailable = {
                [Op.eq]: searchParameters.available
            };
        }

        if (searchParameters.category) {
            where.productCategory = {
                [Op.like]: searchParameters.category
            };
        }

        if (searchParameters.isRentable === true || searchParameters.isRentable === false) {
            where.isRentable = {
                [Op.eq]: searchParameters.isRentable
            };
        }

        if (searchParameters.isService === true || searchParameters.isService === false) {
            where.isService = {
                [Op.eq]: searchParameters.isService
            };
        }

        return Product.findAll({
            where: where
        }).catch(err => Promise.reject({message: err}));
    }

    public uploadImage(imageParameters: ImageGetAttributes, productId: number): Promise<ProductImage> {
        const fs = require('fs');
        const imageData = fs.readFileSync(imageParameters.path);

        return ProductImage.create({
        imageType: imageParameters.filename.split('.')[1],
        imageName: imageParameters.filename,
        data: imageData,
        productId: productId

        }).then(image => {
            fs.writeFileSync(imageParameters.path, image.data);
            fs.unlinkSync(imageParameters.path);
            return image;
        }).catch(err => Promise.reject({message: err}));
    }

    public getImageIds(productId: number): Promise<Array<any>> {
        return ProductImage.findAll({
            attributes: ['imageId'],
            where: { productId: productId }
        });
    }

    public getImageById(imageId: number): Promise<string> {
        const fs = require('fs');
        return ProductImage.findByPk(imageId).then(image => {
            fs.writeFileSync('temp/' + image.imageName, image.data);
            return image.imageName;
        }).catch(() => Promise.reject({message: 'This image does not exist'}));
    }

    public deleteImage(id: number): Promise<ProductImage> {
        return ProductImage.findByPk(id)
        .then(isFound =>  isFound.destroy()
            .then(() => Promise.resolve(isFound))
            .catch(err => Promise.reject({message: err})));
    }
}

