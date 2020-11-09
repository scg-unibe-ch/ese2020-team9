import { ProductService } from './../../services/product.service';
import { Product, ProductAttributes   } from './../../models/product.model';
import { expect } from 'chai';
import { User, UserAttributes } from '../../models/user.model';

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
        addressCountry: 'Saint Isles'
    };

    const product1: ProductAttributes = {
        productId : 1,
        productName: 'Schoggi',
        productDescription: 'E feini Schoggi us Guetemala.',
        productImage: null,
        productPrice: 10,
        productCategory: 'food',
        productLocation: null,
        productDelivery: null,
        uploadDate: new Date(Date.now()),
        sellDate: null,
        isApproved: true,
        isService: false,
        isRentable: null,
        isAvailable: true,
        userId: 1,
        userReview: null,
        buyerId: null
    };

    const product2: ProductAttributes = {
        productId : 1,
        productName: 'Schoggi',
        productDescription: 'E sehr feini Schoggi us Guetemala.',
        productImage: null,
        productPrice: 20,
        productCategory: 'food',
        productLocation: null,
        productDelivery: null,
        uploadDate: new Date(Date.now()),
        sellDate: null,
        isApproved: true,
        isService: false,
        isRentable: null,
        isAvailable: true,
        userId: 1,
        userReview: null,
        buyerId: null
    };

    const product3: ProductAttributes = {
        productId : 2,
        productName: 'Formaggio',
        productDescription: 'Un buono formaggio di Ticino.',
        productImage: null,
        productPrice: 30,
        productCategory: 'food',
        productLocation: null,
        productDelivery: null,
        uploadDate: new Date(Date.now()),
        sellDate: null,
        isApproved: false,
        isService: false,
        isRentable: null,
        isAvailable: true,
        userId: 1,
        userReview: null,
        buyerId: null
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
                expect(product.isApproved).to.be.eq(true);
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
                expect(product.isApproved).to.be.eq(true);
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
                expect(product.isApproved).to.be.eq(true);
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
    describe('Test getProductsOfUser()', () => {
        it('should successfully get products of a user', function(done){
            testedProductService.getProductsOfUser(1).then(product => {
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
    describe('Test getAll()', () => {
        it('should successfully get all products', function(done){
            testedProductService.getAll().then(product => {
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
    after('clean up user', function(done) {
        User.destroy({
            truncate: true,
            restartIdentity: true
        }).then(() => done());
    });
});
