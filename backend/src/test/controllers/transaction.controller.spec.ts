import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { Application } from 'express';
import { applicationPromise } from './../../server';
import { Product, ProductAttributes   } from './../../models/product.model';
import { User, UserAttributes } from '../../models/user.model';
import { Transaction, TransactionAttributes  } from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction.service';



// to run the tests, use the command 'npm run test' in the terminal

chai.use(chaiHttp); // add chai-http to chai
let app: Application;

describe('TransactionController Test', () => { // bundles the tests related to the TramsactionController
    const testedTransactionService: TransactionService = new TransactionService();

    // Create a user: A user is required to create a product
    const seller: UserAttributes = {
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

    // second user: two users are required for a transaction
    const buyer: UserAttributes = {
        userId: 2,
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
        addressCountry: 'England'
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
        isApproved: true,
        isService: false,
        isRentable: false,
        isAvailable: true,
        userId: 1,
        userReview: null,
        buyerId: null
    };
    const product2: ProductAttributes = {
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
        userReview: null,
        buyerId: null
    };

    const transaction1: TransactionAttributes = {
        transactionId: 1,
        productId: 1,
        userId: 1,
        buyerId: 2,   
        transactionStatus: undefined,
        deliveryFirstName: null, 
        deliveryLastName: null,
        deliveryStreet: null, 
        deliveryPin: null,
        deliveryCity: null,
        deliveryCountry: null
    }

    before('init app', function(done) { // applicationPromise value must be assigned to app!!!
        applicationPromise.then(value => {
            app = value;
            done();
        });
    });
    before('add users and product to db', function(done) { 
        User.create(seller);
        User.create(buyer);
        Product.create(product1);
        Product.create(product2);
        Transaction.create(transaction1).then(() => {
            done();
        });
    });
    describe('Test post', () => { // bundles the tests related to the post method
        it('should successfully initialize a transaction', function(done) { 
            chai.request(app).post('/transaction').send({
                productId: 2,
                userId: 2,
                buyerId: 1,   
                deliveryFirstName: null, 
                deliveryLastName: null,
                deliveryStreet: null, 
                deliveryPin: null,
                deliveryCity: null,
                deliveryCountry: null
            }).end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body.message).to.be.eq('Transaction successfully initialized!');
                done();
            });
        });
    });
    describe('Test get', () => { // bundles the tests related to the post method
        it('should successfully get products of a seller', function(done) {
            chai.request(app).get('/transaction/sell/1').end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body[0].transactionId).to.be.eq(1);
                done();
            });
        });
        it('should successfully get products with status of a seller', function(done) {
            chai.request(app).get('/transaction/sell/1/status/1').end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body[0].transactionId).to.be.eq(1);
                done();
            });
        });
        it('should successfully get products of buyer', function(done) {
            chai.request(app).get('/transaction/buy/2').end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body[0].transactionId).to.be.eq(1);
                done();
            });
        });
        it('should successfully get products with status of buyer', function(done) {
            chai.request(app).get('/transaction/buy/2/status/1').end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body[0].transactionId).to.be.eq(1);
                done();
            });
        });
    });
    describe('Test put', () => {
        it('should confirm the transaction', function(done) {
            chai.request(app).put('/transaction/confirm/1').end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body.message).to.be.eq('Transaction successfully confirmed!');
                done();
            });
        });
        it('should decline the transaction', function(done) {
            chai.request(app).put('/transaction/decline/1').end(function(err, res) {
                expect(err).to.be.eq(null);
                expect(res).to.have.status(200);
                expect(res.body.message).to.be.eq('Transaction successfully declined!');
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
})

