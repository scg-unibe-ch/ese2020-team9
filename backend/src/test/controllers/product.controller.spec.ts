import { applicationPromise } from './../../server';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { Application } from 'express';
import { User, UserAttributes } from '../../models/user.model';
import { Product, ProductAttributes } from '../../models/product.model';

// to run the tests, use the command 'npm run test' in the terminal

chai.use(chaiHttp); // add chai-http to chai
let app: Application;

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
    isApproved: false,
    isService: false,
    isRentable: null,
    isAvailable: true,
    userId: 1,
    buyerId: null,
    userReview: null
};
const product2: ProductAttributes = {
    productId : 2,
    productName: 'Massage',
    productDescription: 'One hour of thai massage.',
    productImage: null,
    productPrice: 120,
    productCategory: 'service',
    productLocation: null,
    productDelivery: null,
    uploadDate: new Date(Date.now()),
    sellDate: null,
    isApproved: true,
    isService: true,
    isRentable: null,
    isAvailable: true,
    userId: 1,
    buyerId: null,
    userReview: null
};

const user1: UserAttributes = {
    userId: 1,
    admin: true,
    wallet: 500,
    userName: 'admin',
    password: '$2b$12$XVwWZfAd2fjjd.QjrvMJXOh4WPuxJ4.tpNzkg9wpSSNOShAoDOYWC', // adminPW
    userMail: 'superAdmin@admins.com',
    firstName: 'Jack',
    lastName: 'Hammington',
    gender: 'male',
    phoneNumber: 796666666,
    addressStreet: null,
    addressPin: null,
    addressCity: null,
    addressCountry: 'England',
    gameScore: 0,
    activityScore: 0,
    overallScore: 0
};

const product3: ProductAttributes = {
    productId : 3,
    productName: 'Formaggio',
    productDescription: 'Un molto buono formaggio di Ticino.',
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
    isAvailable: false,
    userId: 1,
    userReview: null,
    buyerId: 2
};

describe('ProductController Test', () => { // bundles the tests related to the ProductController
    before('init app', function(done) { // applicationPromise value must be assigned to app!!!
        applicationPromise.then(value => {
            app = value;
            done();
        });
    });
    describe('Test Post', () => { // bundles the tests related to the post method
        before('add user to db', function(done) {
            User.create(user1).then(() => {
                done();
            });
        });
        it('should create a product successfully', function(done) {
            chai.request(app).post('/products').send({
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
                buyerId: null,
                userReview: null
            }).end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body.message).to.be.eq('Product successfully created!');
                done();
            });
        });
    });
    describe('Test PUT', () => {
        it('should successfully update a product', function(done) {
            chai.request(app).put('/products/1').send({
                productId : 1,
                productName: 'Schoggi',
                productDescription: 'E sehr feini Schoggi us Guetemala.',
                productImage: null,
                productPrice: 10,
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
                buyerId: null,
                userReview: null
            }).end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body.message).to.be.eq('Product 1 successfully updated!');
                done();
            });
        });
    });
    describe('Test Delete', () => {
        it('should successfully delete a product', function(done) {
            chai.request(app).delete('/products/1')
            .end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body.message).to.be.eq('Product successfully deleted!');
                done();
            });
        });
    });
    describe('Test Get', () => {
        before('init db with user', function(done) {
            Product.create(product1).then(() => {
                Product.create(product2).then(() => {
                    return Product.create(product3);
                })
            }).then(() => {
                done();
            });
        });
        it('should successfully get all products', function(done){
            chai.request(app).get('/products').end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body[0].productId).to.be.eq(1);
                done();
            }); 
        });
        it('should successfully get all approved products', function(done){
            chai.request(app).get('/products/approved').end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body[0].productId).to.be.eq(2);
                done();
            }); 
        });
        it('should successfully get all unapproved products', function(done){
            chai.request(app).get('/products/unapproved').end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body[0].productId).to.be.eq(1);
                done();
            });
        });
        it('should successfully get all products of a category', function(done){
            chai.request(app).get('/products/category/service').end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body[0].productId).to.be.eq(2);
                done();
            }); 
        });
        it('should successfully get all products of a user', function(done){
            chai.request(app).get('/products/user/1').end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body[1].productId).to.be.eq(2);
                done();
            }); 
        });
        it('should successfully get a products by id', function(done){
            chai.request(app).get('/products/2').end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body.productId).to.be.eq(2);
                done();
            });
        });
        it('should successfully get all sold products of user', function(done){
            chai.request(app).get('/products/sold/1').end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body[0].productId).to.be.eq(3);
                done();
            });
        });
        it('should successfully get all bought products of user', function(done){
            chai.request(app).get('/products/bought/2').end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body[0].productId).to.be.eq(3);
                done();
            });
        });
    });
    after('clean up', function(done) {
        User.destroy({
            truncate: true,
            restartIdentity: true
        }).then(() => done());
    });

});
