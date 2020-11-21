import { expect } from 'chai';
import { Product, ProductAttributes   } from './../../models/product.model';
import { User, UserAttributes } from '../../models/user.model';
import { Transaction, TransactionAttributes  } from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction.service';


describe('TransactionService Test', () => { 
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
        addressCountry: 'Saint Isles',
        gameScore: 0,
        activityScore: 0,
        overallScore: 0
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
        addressCountry: 'England',
        gameScore: 0,
        activityScore: 0,
        overallScore: 0
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
        isAvailable: false,
        userId: 1,
        userReview: null,
        buyerId: null
    };

    const transaction1: TransactionAttributes = {
        transactionId: 1,
        productId: 1,
        userId: 1,
        buyerId: 2,   
        transactionStatus: 1,
        deliveryFirstName: null, 
        deliveryLastName: null,
        deliveryStreet: null, 
        deliveryPin: null,
        deliveryCity: null,
        deliveryCountry: null
    }

    const transaction2: TransactionAttributes = {
        transactionId: 2,
        productId: 2,
        userId: 2,
        buyerId: 1,   
        transactionStatus: 2,
        deliveryFirstName: null, 
        deliveryLastName: null,
        deliveryStreet: null, 
        deliveryPin: null,
        deliveryCity: null,
        deliveryCountry: null
    }

    const transaction3: TransactionAttributes = {
        transactionId: 3,
        productId: 2,
        userId: 2,
        buyerId: 1,   
        transactionStatus: 1,
        deliveryFirstName: null, 
        deliveryLastName: null,
        deliveryStreet: null, 
        deliveryPin: null,
        deliveryCity: null,
        deliveryCountry: null
    }

    before('add users and product to db', function(done) { // applicationPromise value must be assigned to app!!!
        User.create(seller).then(() => {
            User.create(buyer);
        }).then(() => {
            Product.create(product1);
        }).then(() => {
            done();
        });
    });
    describe('Test startTransaction()', () => { 
        it('should successfully initialize a transaction', function(done) { 
            testedTransactionService.startTransaction(transaction1).then(transaction => {
                expect(transaction.transactionId).to.be.eq(1);
                expect(transaction.transactionStatus).to.be.eq(1);
                expect(transaction.userId).to.be.eq(1);
                expect(transaction.buyerId).to.be.eq(2);
                Transaction.findOne({
                    where: {
                        transactionId: 1
                    }
                }).then(foundTransaction => {
                    expect(foundTransaction).not.to.be.eq(null);
                    done();
                });   
            });
        });
        it('should update the product to buy successfully', function(done) {                 
            Product.findOne({
                where: {
                    productId: 1,
                    isAvailable: false,
                }
            }).then(foundProduct => {
                expect(foundProduct).not.to.be.eq(null);
                done();
            });
        });
    });
    describe('Test getting Transactions', () => {
        before('add additional transaction to db', function(done) {
            Product.create(product2);
            Transaction.create(transaction2).then(() => {
                done();
            });
        });
        it('should get all transactions of buyer', function(done) {
            testedTransactionService.getAllTransactionsOfBuyer(1).then(transaction => {
                expect(transaction[0].transactionId).to.be.eq(2);
                expect(transaction[0].productId).to.be.eq(2);
                expect(transaction[0].buyerId).to.be.eq(1);
                expect(transaction[0].userId).to.be.eq(2);
            }).then(() =>{
                done();
            });
        });
        it('should get all transactions of seller', function(done) {
            testedTransactionService.getAllTransactionsOfSeller(2).then(transaction => {
                expect(transaction[0].transactionId).to.be.eq(2);
                expect(transaction[0].productId).to.be.eq(2);
                expect(transaction[0].buyerId).to.be.eq(1);
                expect(transaction[0].userId).to.be.eq(2);
            }).then(() =>{
                done();
            });
        });
        it('should get all transactions of buyer with status', function(done) {
            testedTransactionService.getTransactionsOfBuyer(1, 2).then(transaction => {
                expect(transaction[0].transactionId).to.be.eq(2);
                expect(transaction[0].productId).to.be.eq(2);
                expect(transaction[0].buyerId).to.be.eq(1);
                expect(transaction[0].userId).to.be.eq(2);
            }).then(() =>{
                done();
            });
        });
        it('should get all transactions of seller with status', function(done) {
            testedTransactionService.getTransactionsOfSeller(1, 1).then(transaction => {
                expect(transaction[0].transactionId).to.be.eq(1);
                expect(transaction[0].productId).to.be.eq(1);
                expect(transaction[0].buyerId).to.be.eq(2);
                expect(transaction[0].userId).to.be.eq(1);
            }).then(() =>{
                done();
            });
        });
    });
    describe('Test confirm Transaction', () => {      
        it('should successfully confirm and execute the transaction', function(done) {
            testedTransactionService.confirmTransaction(1).then(transaction => {
                expect(transaction.transactionId).to.be.eq(1);
                expect(transaction.transactionStatus).to.be.eq(2);
                expect(transaction.userId).to.be.eq(1);
                expect(transaction.buyerId).to.be.eq(2);
                expect(transaction.productId).to.be.eq(1);
                done();
            });
        });
        it('should update the bought product successfully', function(done) {
            Product.findOne({
                where: {
                    productId: 1,
                    isAvailable: false,
                    buyerId: 2
                }
            }).then(foundProduct => {
                expect(foundProduct).not.to.be.eq(null);
                done();
            });
        });
        it('should update the buyer\' s wallet successfully', function(done) {
            User.findOne({
                where: {
                    userId: 2,
                    wallet: 490
                }
            }).then(foundUser => {
                expect(foundUser).not.to.be.eq(null);
                done();
            });
        });
        it('should update the buyer\' s activity score successfully', function(done) {
            User.findOne({
                where: {
                    userId: 2,
                    activityScore: 1 
                }
            }).then(foundUser => {
                expect(foundUser).not.to.be.eq(null);
                done();
            });
        });
        it('should update the seller\'s wallet successfully', function(done) {
            User.findOne({
                where: {
                    userId: 1,
                    wallet: 510
                }
            }).then(foundUser => {
                expect(foundUser).not.to.be.eq(null);
                done();
            });
        });
        it('should update the seller\'s activity score successfully', function(done) {
            User.findOne({
                where: {
                    userId: 1,
                    activityScore: 2
                }
            }).then(foundUser => {
                expect(foundUser).not.to.be.eq(null);
                done();
            });
        });
        it('should not confirm a transaction if buyer does not have enough money', function(done) {        
            User.findByPk(2).then((foundUser) => {
                foundUser.update({
                    wallet: 9
                })
            }).then(() => {
                testedTransactionService.confirmTransaction(1).catch(error => {
                    expect(error.message).to.be.eq('Not enough money available to buy the product!');
                    done();
                });
            });
        });
    });
    describe('Test declineTransaction()', () => { 
        before('add additional transaction to db', function(done) {
            Transaction.create(transaction3).then(() => {
                done();
            });
        });
        it('should successfully decline a transaction', function(done) { 
            testedTransactionService.declineTransaction(3).then(transaction => {
                expect(transaction.transactionId).to.be.eq(3);
                expect(transaction.transactionStatus).to.be.eq(3);
                expect(transaction.userId).to.be.eq(2);
                expect(transaction.buyerId).to.be.eq(1);
                Transaction.findOne({
                    where: {
                        transactionId: 3
                    }
                }).then(foundTransaction => {
                    expect(foundTransaction).not.to.be.eq(null);
                    done();
                });   
            });
        });
        it('should update the product to buy successfully', function(done) {                 
            Product.findOne({
                where: {
                    productId: 2,
                    isAvailable: true,
                }
            }).then(foundProduct => {
                expect(foundProduct).not.to.be.eq(null);
                done();
            });
        });
    });
    after('clean up', function() {
        User.destroy({
            truncate: true,
            restartIdentity: true
        })
        .then(() => {
            Product.destroy({
                truncate: true,
                restartIdentity: true
            })
        })
        .then(() => {        
            Promise.resolve();
        });

    });   
});