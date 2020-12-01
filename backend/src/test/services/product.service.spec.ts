import { ProductService } from './../../services/product.service';
import { Product, ProductAttributes   } from './../../models/product.model';
import { expect } from 'chai';
import { User, UserAttributes } from '../../models/user.model';
import {SearchRequest} from '../../models/search.model';
import {ImageGetAttributes, ProductImage} from '../../models/productimage.model';
import path from 'path';


describe('ProductService Tests', () => {
    const testedProductService: ProductService = new ProductService();

    // Create a user: A user is required to create a product
    const user1: UserAttributes = {
        userId: 1,
        admin: false,
        wallet: 500,
        userName: 'jacky',
        password: 'jacky123',
        userMail: 'jacky@gmail.com',
        firstName: 'Jack',
        lastName: 'Doe',
        gender: 'male',
        phoneNumber: 768927361,
        addressStreet: 'Pinnacle Street',
        addressPin: '77889',
        addressCity: 'Hannington Town',
        addressCountry: 'Saint Isles',
        gameScore: 0,
        activityScore: 0,
        overallScore: 0
    };

    const product1: ProductAttributes = {
        productId : 1,
        productName: 'Schoggi',
        productDescription: 'E feini Schoggi us Guetemala.',
        productPrice: 10,
        productCategory: 'food',
        productLocation: null,
        productDelivery: true,
        uploadDate: new Date(Date.now()),
        sellDate: null,
        isApproved: false,
        isService: false,
        isRentable: false,
        isAvailable: true,
        userId: 1,
        buyerId: null
    };

    const product2: ProductAttributes = {
        productId : 1,
        productName: 'Schoggi',
        productDescription: 'E sehr feini Schoggi us Guetemala.',
        productPrice: 20,
        productCategory: 'food',
        productLocation: null,
        productDelivery: true,
        uploadDate: new Date(Date.now()),
        sellDate: null,
        isApproved: false,
        isService: false,
        isRentable: false,
        isAvailable: true,
        userId: 1,
        buyerId: null
    };

    const product3: ProductAttributes = {
        productId : 2,
        productName: 'Formaggio',
        productDescription: 'Un buono formaggio di Ticino.',
        productPrice: 30,
        productCategory: 'food',
        productLocation: null,
        productDelivery: true,
        uploadDate: new Date(Date.now()),
        sellDate: null,
        isApproved: false,
        isService: false,
        isRentable: false,
        isAvailable: true,
        userId: 1,
        buyerId: null
    };

    const product4: ProductAttributes = {
        productId : 3,
        productName: 'Drone',
        productDescription: 'Endlessly flying drone with autonomous electricity due to solar power.',
        productPrice: 850,
        productCategory: 'ComputerAndComputerAccessories',
        productLocation: 'Bern',
        productDelivery: true,
        uploadDate: new Date(Date.now()),
        sellDate: null,
        isApproved: true,
        isService: false,
        isRentable: true,
        isAvailable: true,
        userId: 1,
        buyerId: null

    };
    const product5: ProductAttributes = {
        productId : 4,
        productName: 'Shovel',
        productDescription: 'A strong shovel made from steel, useful for various tasks around the house in winter and summer.',
        productPrice: 15,
        productCategory: 'Miscellaneous',
        productLocation: 'Bern',
        productDelivery: false,
        uploadDate: new Date(Date.now()),
        sellDate: null,
        isApproved: true,
        isService: false,
        isRentable: true,
        isAvailable: false,
        userId: 1,
        buyerId: null

    };
    const product6: ProductAttributes = {
        productId : 5,
        productName: 'Massage',
        productDescription: 'One hour of thai massage.',
        productPrice: 120,
        productCategory: 'Miscellaneous',
        productLocation: 'Zürich',
        productDelivery: false,
        uploadDate: new Date(Date.now()),
        sellDate: null,
        isApproved: true,
        isService: true,
        isRentable: false,
        isAvailable: true,
        userId: 1,
        buyerId: null

    };

    const product7: ProductAttributes = {
        productId : 7,
        productName: 'Formaggio',
        productDescription: 'Un molto buono formaggio di Ticino.',
        productPrice: 30,
        productCategory: 'food',
        productLocation: null,
        productDelivery: true,
        uploadDate: new Date(Date.now()),
        sellDate: null,
        isApproved: false,
        isService: false,
        isRentable: false,
        isAvailable: true,
        userId: 1,
        buyerId: 2
    };

    before('add user to db', function(done) {
        User.create(user1).then(() => {
            done();
        });
    });
    describe('Test Creating Products', () => {
        it('should successfully create a product', function(done){
            testedProductService.create(product1).then(product => {
                expect(product.productId).to.be.eq(1);
                expect(product.productName).to.be.eq('Schoggi');
                expect(product.productDescription).to.be.eq('E feini Schoggi us Guetemala.');
                expect(product.productPrice).to.be.eq(10);
                expect(product.productCategory).to.be.eq('food');
                expect(product.isApproved).to.be.eq(false);
                expect(product.isService).to.be.eq(false);
                expect(product.isAvailable).to.be.eq(true);
                expect(product.userId).to.be.eq(1);
                Product.findOne({
                    where: {
                        productName: 'Schoggi'
                    }
                }).then(foundProduct => {
                    expect(foundProduct).not.to.be.eq(null);
                    done();
                });
            });
        });
    });
    describe('Test Updating Products', () => {
        it('should successfully update a product', function(done){
            testedProductService.update(1, product2).then(product => {
                expect(product.productId).to.be.eq(1);
                expect(product.productName).to.be.eq('Schoggi');
                expect(product.productDescription).to.be.eq('E sehr feini Schoggi us Guetemala.');
                expect(product.productPrice).to.be.eq(20);
                expect(product.productCategory).to.be.eq('food');
                expect(product.isApproved).to.be.eq(false);
                expect(product.isService).to.be.eq(false);
                expect(product.isAvailable).to.be.eq(true);
                expect(product.userId).to.be.eq(1);
                Product.findOne({
                    where: {
                        productName: 'Schoggi'
                    }
                }).then(foundProduct => {
                    expect(foundProduct).not.to.be.eq(null);
                    done();
                });
            });
        });
    });
    describe('Test getProduct()', () => {
        it('should successfully get a product', function(done){
            testedProductService.getProduct(1).then(product => {
                expect(product.productId).to.be.eq(1);
                expect(product.productName).to.be.eq('Schoggi');
                expect(product.productDescription).to.be.eq('E sehr feini Schoggi us Guetemala.');
                expect(product.productPrice).to.be.eq(20);
                expect(product.productCategory).to.be.eq('food');
                expect(product.isApproved).to.be.eq(false);
                expect(product.isService).to.be.eq(false);
                expect(product.isAvailable).to.be.eq(true);
                expect(product.userId).to.be.eq(1);
                Product.findOne({
                    where: {
                        productName: 'Schoggi'
                    }
                }).then(foundProduct => {
                    expect(foundProduct).not.to.be.eq(null);
                    done();
                });
            });
        });
        it('should return a error if product does not exist', function(done){
            testedProductService.getProduct(300).catch(err => {
                expect(err.message).to.be.eq('Product with id 300 not found!');
                done();
            });
        });
    });
    describe('Test getProductsOfCategory()', () => {
        it('should successfully get all products of a category', function(done){
            testedProductService.getProductsOfCategory('food').then(product => {
                expect(product[0].productId).to.be.eq(1);
                expect(product[0].productName).to.be.eq('Schoggi');
                expect(product[0].productDescription).to.be.eq('E sehr feini Schoggi us Guetemala.');
                expect(product[0].productPrice).to.be.eq(20);
                expect(product[0].productCategory).to.be.eq('food');
                expect(product[0].isApproved).to.be.eq(false);
                expect(product[0].isService).to.be.eq(false);
                expect(product[0].isAvailable).to.be.eq(true);
                expect(product[0].userId).to.be.eq(1);
                Product.findOne({
                    where: {
                        productName: 'Schoggi'
                    }
                }).then(foundProduct => {
                    expect(foundProduct).not.to.be.eq(null);
                    done();
                });
            });
        });
    });
    describe('Test get sold or bough products', () => {
        before('add sold product to db', function(done) {
            Product.create(product7).then(() => {
                done();
            });
        });
        it('should successfully get all sold products of user', function(done){
            testedProductService.getSoldProducts(1).then(product => {
                expect(product[0].productId).to.be.eq(7);
                expect(product[0].productName).to.be.eq('Formaggio');
                expect(product[0].productDescription).to.be.eq('Un molto buono formaggio di Ticino.');
                expect(product[0].productPrice).to.be.eq(30);
                expect(product[0].productCategory).to.be.eq('food');
                expect(product[0].isApproved).to.be.eq(false);
                expect(product[0].isService).to.be.eq(false);
                expect(product[0].isAvailable).to.be.eq(true);
                expect(product[0].userId).to.be.eq(1);
                done();
            });
        });
        it('should successfully get all bought products of user', function(done){
            testedProductService.getBoughtProducts(2).then(product => {
                expect(product[0].productId).to.be.eq(7);
                expect(product[0].productName).to.be.eq('Formaggio');
                expect(product[0].productDescription).to.be.eq('Un molto buono formaggio di Ticino.');
                expect(product[0].productPrice).to.be.eq(30);
                expect(product[0].productCategory).to.be.eq('food');
                expect(product[0].isApproved).to.be.eq(false);
                expect(product[0].isService).to.be.eq(false);
                expect(product[0].isAvailable).to.be.eq(true);
                expect(product[0].userId).to.be.eq(1);
                expect(product[0].buyerId).to.be.eq(2);
                done();
            });
        });
    });
    describe('Test getProductsOfUser()', () => {
        it('should successfully get products of a user', function(done){
            testedProductService.getProductsOfUser(1).then(product => {
                expect(product[0].productId).to.be.eq(1);
                expect(product[0].productName).to.be.eq('Schoggi');
                expect(product[0].productDescription).to.be.eq('E sehr feini Schoggi us Guetemala.');
                expect(product[0].productPrice).to.be.eq(20);
                expect(product[0].productCategory).to.be.eq('food');
                expect(product[0].isApproved).to.be.eq(false);
                expect(product[0].isService).to.be.eq(false);
                expect(product[0].isAvailable).to.be.eq(true);
                expect(product[0].userId).to.be.eq(1);
                Product.findOne({
                    where: {
                        productName: 'Schoggi'
                    }
                }).then(foundProduct => {
                    expect(foundProduct).not.to.be.eq(null);
                    done();
                });
            });
        });
    });
    describe('Test getAll()', () => {
        it('should successfully get all products', function(done){
            testedProductService.getAll().then(product => {
                expect(product[0].productId).to.be.eq(1);
                expect(product[0].productName).to.be.eq('Schoggi');
                expect(product[0].productDescription).to.be.eq('E sehr feini Schoggi us Guetemala.');
                expect(product[0].productPrice).to.be.eq(20);
                expect(product[0].productCategory).to.be.eq('food');
                expect(product[0].isApproved).to.be.eq(false);
                expect(product[0].isService).to.be.eq(false);
                expect(product[0].isAvailable).to.be.eq(true);
                expect(product[0].userId).to.be.eq(1);
                Product.findOne({
                    where: {
                        productName: 'Schoggi'
                    }
                }).then(foundProduct => {
                    expect(foundProduct).not.to.be.eq(null);
                    done();
                });
            });
        });
    });
    describe('Test approve()', () => {
        it('should successfully approve product by id', function(done){
            testedProductService.approve(1).then(product => {
                expect(product).to.be.eq(1);
                Product.findOne({
                    where: {
                        productId: product
                    }
                }).then(foundproduct => {
                    expect(foundproduct.productId).to.be.eq(1);
                    expect(foundproduct.productName).to.be.eq('Schoggi');
                    expect(foundproduct.productDescription).to.be.eq('E sehr feini Schoggi us Guetemala.');
                    expect(foundproduct.productPrice).to.be.eq(20);
                    expect(foundproduct.productCategory).to.be.eq('food');
                    expect(foundproduct.isApproved).to.be.eq(true);
                    expect(foundproduct.isService).to.be.eq(false);
                    expect(foundproduct.isAvailable).to.be.eq(true);
                    expect(foundproduct.userId).to.be.eq(1);
                    done();
                })
                
                    
            });
        });
    });
    
    describe('Test getAllApproved()', () => {
        it('should successfully get all approved products', function(done){
            testedProductService.getAllApproved().then(product => {
                expect(product[0].productId).to.be.eq(1);
                expect(product[0].productName).to.be.eq('Schoggi');
                expect(product[0].productDescription).to.be.eq('E sehr feini Schoggi us Guetemala.');
                expect(product[0].productPrice).to.be.eq(20);
                expect(product[0].productCategory).to.be.eq('food');
                expect(product[0].isApproved).to.be.eq(true);
                expect(product[0].isService).to.be.eq(false);
                expect(product[0].isAvailable).to.be.eq(true);
                expect(product[0].userId).to.be.eq(1);
                Product.findOne({
                    where: {
                        productName: 'Schoggi'
                    }
                }).then(foundProduct => {
                    expect(foundProduct).not.to.be.eq(null);
                    done();
                });
            });
        });
    });
    describe('Test getAllUnapproved()', () => {
        before('add unapproved product to db', function(done) {
            Product.create(product3).then(() => {
                done();
            });
        });
        it('should successfully get all unapproved products', function(done){
            testedProductService.getAllUnapproved().then(product => {
                expect(product[0].productId).to.be.eq(2);
                expect(product[0].productName).to.be.eq('Formaggio');
                expect(product[0].productDescription).to.be.eq('Un buono formaggio di Ticino.');
                expect(product[0].productPrice).to.be.eq(30);
                expect(product[0].productCategory).to.be.eq('food');
                expect(product[0].isApproved).to.be.eq(false);
                expect(product[0].isService).to.be.eq(false);
                expect(product[0].isAvailable).to.be.eq(true);
                expect(product[0].userId).to.be.eq(1);
                Product.findOne({
                    where: {
                        productName: 'Formaggio'
                    }
                }).then(foundProduct => {
                    expect(foundProduct).not.to.be.eq(null);
                    done();
                });
            });
        });
    });
    describe('Test searchProduct()', () => {
        before('add products to db', function(done) {
            Product.create(product4);
            Product.create(product5);
            Product.create(product6).then(() => {
                done();
            });
        });
        it('should successfully search products containing the letter \"s\"', function(done){
            const request: SearchRequest = {
                name: "s"
            };
            testedProductService.searchProduct(request).then(product => {
                expect(product[0].productId).to.be.eq(1);
                expect(product[1].productId).to.be.eq(4);
                expect(product[2].productId).to.be.eq(5);
                expect(product.length).to.be.eq(3);
                done();
                });
            });
        it('should successfully search products that have a price range of 20 to 500', function(done){
            const request: SearchRequest = {
                priceMin: 20,
                priceMax: 500
            };
            testedProductService.searchProduct(request).then(product => {
                expect(product[0].productId).to.be.eq(1);
                expect(product[1].productId).to.be.eq(5);
                expect(product.length).to.be.eq(2);
                done();
                });
            });    
        it('should successfully search products that are located in Bern', function(done){
            const request: SearchRequest = {
                location: 'Bern'
            };
            testedProductService.searchProduct(request).then(product => {
                expect(product[0].productId).to.be.eq(3);
                expect(product[1].productId).to.be.eq(4);
                expect(product.length).to.be.eq(2);
                done();
                });
            });
        it('should successfully search products that are deliverable', function(done){
            const request: SearchRequest = {
                delivery: true
            };
            testedProductService.searchProduct(request).then(product => {
                expect(product[0].productId).to.be.eq(1);
                expect(product[1].productId).to.be.eq(3);
                expect(product.length).to.be.eq(2);
                done();
                });
            });
        it('should successfully search products that are not deliverable', function(done){
            const request: SearchRequest = {
                delivery: false
            };
            testedProductService.searchProduct(request).then(product => {
                expect(product[0].productId).to.be.eq(4);
                expect(product[1].productId).to.be.eq(5);
                expect(product.length).to.be.eq(2);
                done();
                });
            });            
        it('should successfully search products that are available', function(done){
            const request: SearchRequest = {
                available: true
            };
            testedProductService.searchProduct(request).then(product => {
                expect(product[0].productId).to.be.eq(1);
                expect(product[1].productId).to.be.eq(3);
                expect(product[2].productId).to.be.eq(5);
                expect(product.length).to.be.eq(3);
                done();
                });
            });   
        it('should successfully search products that are not available', function(done){
            const request: SearchRequest = {
                available: false
            };
            testedProductService.searchProduct(request).then(product => {
                expect(product[0].productId).to.be.eq(4);
                expect(product.length).to.be.eq(1);
                done();
                });
            });
        it('should successfully search products that are rentable', function(done){
            const request: SearchRequest = {
                isRentable: true
            };
            testedProductService.searchProduct(request).then(product => {
                expect(product[0].productId).to.be.eq(3);
                expect(product[1].productId).to.be.eq(4);
                expect(product.length).to.be.eq(2);
                done();
                });
            });
        it('should successfully search products that are not rentable', function(done){
            const request: SearchRequest = {
                isRentable: false
            };
            testedProductService.searchProduct(request).then(product => {
                expect(product[0].productId).to.be.eq(1);
                expect(product[1].productId).to.be.eq(5);
                expect(product.length).to.be.eq(2);
                done();
                });
            });    
        it('should successfully search products that are services', function(done){
            const request: SearchRequest = {
                 isService: true
            };
            testedProductService.searchProduct(request).then(product => {
                expect(product[0].productId).to.be.eq(5);
                expect(product.length).to.be.eq(1);
                done();
                });
            });  
        it('should successfully search products that are not services', function(done){
            const request: SearchRequest = {
                 isService: false
            };
            testedProductService.searchProduct(request).then(product => {
                expect(product[0].productId).to.be.eq(1);
                expect(product[1].productId).to.be.eq(3);
                expect(product[2].productId).to.be.eq(4);
                expect(product.length).to.be.eq(3);
                done();
                });
            });                             
                              
        it('should successfully search products that are in the category \"Miscellaneous\"', function(done){
            const request: SearchRequest = {
                category: 'Miscellaneous'
            };
            testedProductService.searchProduct(request).then(product => {
                expect(product[0].productId).to.be.eq(4);
                expect(product[1].productId).to.be.eq(5);
                expect(product.length).to.be.eq(2);
                done();
                });
            });                                                  
        it('should successfully search products that contain the letter \"e\" and are available', function(done){
            const request: SearchRequest = {
                name: 'e',
                available: true
            };
            testedProductService.searchProduct(request).then(product => {
                expect(product[0].productId).to.be.eq(3);
                expect(product[1].productId).to.be.eq(5);
                expect(product.length).to.be.eq(2);
                done();
                });
            });    
        
        it('should successfully search products that are deliverable and available', function(done){
            const request: SearchRequest = {
                delivery: true,
                available: true
            };
            testedProductService.searchProduct(request).then(product => {
                expect(product[0].productId).to.be.eq(1);
                expect(product[1].productId).to.be.eq(3);
                expect(product.length).to.be.eq(2);
                done();
                });
            });    
        
        
        it('should successfully search products that contain \"abcdefg\" and return an empty array', function(done){
            const request: SearchRequest = {
                name: 'abcdefg'
            };
            testedProductService.searchProduct(request).then(product => {
                expect(product.length).to.be.eq(0);
                done();
                });
            });    
        });

    describe('Test uploadImage()', () => {
        it('should successfully upload an image to a product', function(done) {
            const imagePath = path.join(__dirname, '../../test/test.jpeg');
            const fs = require('fs');
            const request: ImageGetAttributes = {
                filename: "test.jpeg",
                path: imagePath
            }
            testedProductService.uploadImage(request, 1).then((image) => {
                fs.writeFileSync(request.path, image.data);
                expect(image.imageId).to.be.eq(3);
                expect(image.imageType).to.be.eq('jpeg');
                expect(image.productId).to.be.eq(1);
                done();
            });
        });
    });        
    
    describe('Test getImageIds()', () => {
        it('should successfully get the imageIds from a product', function(done) {
            testedProductService.getImageIds(1).then(ids => {
                expect(ids[0].imageId).to.be.eq(3);
                expect(ids.length).to.be.eq(1);
                done();
            });
        });
    });        

    describe('Test getImageById()', () => {
        const fs = require('fs');
        it('should successfully get the image with the given id', function(done) {
            testedProductService.getImageById(3).then(image => {
                const imagePath = path.join(__dirname, '../../../temp/' + image);
                expect(image).to.be.eq(path.basename(imagePath));
                fs.unlinkSync(imagePath);
                done();
            });
        });
    });            

    describe('Test deleteImage()', () => {
        it('should delete an image by id', function(done) {
            testedProductService.deleteImage(3).then(() => {
                ProductImage.findByPk(3)
                .then(foundImage => {
                    expect(foundImage).to.be.eq(null);
                    done();
                });
            });
        });
    });

    describe('Test deleteProduct()', () => {
        it('should delete a product by id', function(done) {
            testedProductService.deleteProduct(1).then(() => {
                Product.findOne({
                    where: {
                        productName: 'Schoggi'
                    }
                }).then(foundProduct => {
                    expect(foundProduct).to.be.eq(null);
                    done();
                });
            });
        });
    });
    after('clean up', function(done) {
        User.destroy({
            truncate: true,
            restartIdentity: true
        }).then(() => {
            Product.destroy({
                truncate: true,
                restartIdentity: true
            })
        }).then(() => {
            done();
        });
    });
});
