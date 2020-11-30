import { applicationPromise } from './../../server';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { Application } from 'express';
import { User, UserAttributes } from '../../models/user.model';
import { Product, ProductAttributes } from '../../models/product.model';
import fs from 'fs';
import path from 'path';
import { ProductImage } from '../../models/productimage.model';

// to run the tests, use the command 'npm run test' in the terminal

chai.use(chaiHttp); // add chai-http to chai
let app: Application;

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
    buyerId: null,
};
const product2: ProductAttributes = {
    productId : 2,
    productName: 'Massage',
    productDescription: 'One hour of thai massage.',
    productPrice: 120,
    productCategory: 'service',
    productLocation: null,
    productDelivery: false,
    uploadDate: new Date(Date.now()),
    sellDate: null,
    isApproved: true,
    isService: true,
    isRentable: false,
    isAvailable: true,
    userId: 1,
    buyerId: null,
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
    productPrice: 30,
    productCategory: 'food',
    productLocation: null,
    productDelivery: true,
    uploadDate: new Date(Date.now()),
    sellDate: null,
    isApproved: false,
    isService: false,
    isRentable: false,
    isAvailable: false,
    userId: 1,
    buyerId: 2
};

describe('ProductController Test', () => { // bundles the tests related to the ProductController
    let token: string;
    before('init app', function(done) { // applicationPromise value must be assigned to app!!!
        applicationPromise.then(value => {
            app = value;
            done();
        });
    });
    describe('Test Post', () => { // bundles the tests related to the post method
       
        before('add user to db and create token', function(done) {
            User.create(user1).then(() => {
                chai.request(app).post('/user/login').send({
                    userLogin: 'admin',
                    password: 'adminPW'
                }).end(function(err, res) {
                    token = res.body.token;
                    done();
                });
            });
        });
        it('should create a product successfully', function(done) {
            chai.request(app).post('/products').send({
                productId : 1,
                productName: 'Schoggi',
                productDescription: 'E feini Schoggi us Guetemala.',
                productPrice: 10,
                productCategory: 'food',
                productLocation: null,
                productDelivery: true,
                uploadDate: new Date(Date.now()),
                sellDate: null,
                isApproved: true,
                isService: false,
                isRentable: false,
                isAvailable: true,
                userId: 1,
                buyerId: null,
            }).end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body.productId).to.be.eq(1);
                expect(res.body.productName).to.be.eq('Schoggi');
                expect(res.body.productDescription).to.be.eq('E feini Schoggi us Guetemala.');
                done();
            });
        });
        it('should upload an image successfully', function(done) {
            chai.request(app).post('/products/images/upload/1')
            .set({'Authorization': 'Bearer ' + token})
            .attach('image', fs.readFileSync( path.join(__dirname, '../../test/test.jpeg')), 'test.jpeg')
            .end(function(err, res){
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body.message).to.be.eq('Successfully uploaded Image with id 1!')
                done();
            });
        });
        it('should not successfully upload an image due to false format', function(done) {
            chai.request(app).post('/products/images/upload/1')
            .set({'Authorization': 'Bearer ' + token})
            .attach('image', fs.readFileSync( path.join(__dirname, '../../test/test.gif')), 'test.gif')
            .end(function(err, res){
                expect(err).to.be.eq(null);
                expect(res).to.have.status(400);
                expect(res.body.message).to.be.eq('Only .png, .jpg and .jpeg format allowed!')
                done();
            });
        });
        it('should not successfully upload an image due to no token', function(done) {
            chai.request(app).post('/products/images/upload/1')
            .attach('image', fs.readFileSync( path.join(__dirname, '../../test/test.jpeg')), 'test.jpeg')
            .end(function(err, res){
                expect(err).to.be.eq(null);
                expect(res).to.have.status(403);
                expect(res.body.message).to.be.eq('Product does not belong to User')
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
                buyerId: null,
            }).end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body.message).to.be.eq('Product 1 successfully updated!');
                done();
            });
        });
    });
    describe('Test Delete', () => {
        it('should successfully delete an image', function(done) {
            chai.request(app).delete('/products/images/1')
            .end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body.message).to.be.eq('Image successfully deleted!');
                done();
            });
        });        
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
                     Product.create(product3);
                })
            }).then(() => {
                    chai.request(app).post('/products/images/upload/1')
                    .set({'Authorization': 'Bearer ' + token})
                    .attach('image', fs.readFileSync( path.join(__dirname, '../../test/test.jpeg')), 'test.jpeg')
                    .end(function(err, res){
                        done();
                    });
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
        it('should successfully get the imageIds of product', function(done){
            chai.request(app).get('/products/images/getIds/1').end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body[0].imageId).to.be.eq(2);
                done();
            });
        });
        it('should successfully get the image file of the given imageId', function(done){
            chai.request(app).get('/products/images/getById/2').end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res).to.have.header('content-type');
                expect(res.header['content-type']).to.be.eq('image/jpeg');
                const size = fs.statSync(path.join(__dirname, '../../test/test.jpeg')).size.toString();
                expect(res.header['content-length']).to.be.eq(size);
                done();
            });
        });
        it('should successfully throw an error on a non-existant image', function(done){
            chai.request(app).get('/products/images/getById/1').end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(404);
                expect(res.body.message).to.be.eq('This image does not exist');
                done();
            });
        });
    });
    after('clean up', function(done) {
        User.destroy({
            truncate: true,
            restartIdentity: true
        });
        Product.destroy({
            truncate: true,
            restartIdentity: true
        }).then(() => done());
    });
});
