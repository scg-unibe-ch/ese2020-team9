import { Transaction, TransactionAttributes } from '../models/transaction.model';
import { User } from '../models/user.model';
import { Product } from './../models/product.model';


export class TransactionService {
    public startTransaction(transaction: TransactionAttributes): Promise<TransactionAttributes> {
        return Transaction.create(transaction)
        .then((foundTransaction) => {
            if (foundTransaction != null) {
                return Product.findByPk(foundTransaction.productId).then(foundProduct => {
                    return foundProduct.update({
                        isAvailable: false
                    });
                })
                .then(() => {
                    return Promise.resolve(foundTransaction);
                });
            } else {
                return Promise.reject('Transaction not created!');
            }
        })
        .catch(err => Promise.reject(err));
    }

    public confirmTransaction(transactionId: number): Promise<TransactionAttributes> {
        return Transaction.findByPk(transactionId)
        .then((foundTransaction) => {
            if (foundTransaction != null) {
                return Product.findByPk(foundTransaction.productId).then(foundProduct => {
                    return foundProduct.update({
                        sellDate: new Date(Date.now()),
                        buyerId: foundTransaction.buyerId
                    })
                    .then(() => {
                        return User.findByPk(foundTransaction.buyerId);
                    })
                    .then((foundBuyer) => {
                        if (foundProduct.productPrice <= foundBuyer.wallet) {
                            return User.increment('wallet', {
                                by: -foundProduct.productPrice,
                                where: {
                                    userId: foundTransaction.buyerId
                                }
                            });
                        } else {
                            return Promise.reject('Not enough money available to buy the product!');
                        }
                    })
                    .then(() => {
                        return User.increment('wallet', {
                            by: foundProduct.productPrice,
                            where: {
                                userId: foundTransaction.userId
                            }
                        });
                    });
                })
        .then(() => {
            foundTransaction.update({
                transactionStatus: 2
            });
        })
        .then(() => {
            return Promise.resolve(foundTransaction);
        });
            } else {
                return Promise.reject('Transaction not found!');
            }
        })
        .catch(err => Promise.reject({message: err}));
    }

    public declineTransaction(transactionId: number): Promise<TransactionAttributes> {
        return Transaction.findByPk(transactionId)
        .then((foundTransaction) => {
            if (foundTransaction != null) {
                return Product.findByPk(foundTransaction.productId).then(foundProduct => {
                    return foundProduct.update({
                        isAvailable: true
                    });
                })
                .then(() => {
                    foundTransaction.update({
                        transactionStatus: 3
                    });
                })
                .then(() => {
                    return Promise.resolve(foundTransaction);
                });
            } else {
                return Promise.reject('Transaction not found!');
            }
        })
        .catch(err => Promise.reject(err));
    }

    public getAllTransactionsOfSeller(sellerId: number): Promise<Transaction[]> {
        const {Op} = require('sequelize');
        return Transaction.findAll({
            include: 'product',
            where: {
                [Op.and]: [
                    { userId: sellerId }
                ]
            },
            
        })
        .catch(err => Promise.reject(err));
    }

    public getAllTransactionsOfBuyer(buyerId: number): Promise<Transaction[]> {
        const {Op} = require('sequelize');
        return Transaction.findAll({
            include: 'product',
            where: {
                [Op.and]: [
                    { buyerId: buyerId }
                ]
            }
        })
        .catch(err => Promise.reject(err));
    }

    public getTransactionsOfSeller(sellerId: number, transactionStatus: number): Promise<Transaction[]> {
        const {Op} = require('sequelize');
        return Transaction.findAll({
            include: 'product',
            where: {
                [Op.and]: [
                    {
                        userId: sellerId,
                        transactionStatus: transactionStatus
                    }
                ]
            }
        })
        .catch(err => Promise.reject(err));
    }

    public getTransactionsOfBuyer(buyerId: number, transactionStatus: number): Promise<Transaction[]> {
        const {Op} = require('sequelize');
        return Transaction.findAll({
            include: 'product',
            where: {
                [Op.and]: [
                    {
                        buyerId: buyerId,
                        transactionStatus: transactionStatus
                    }
                ]
            }
        })
        .catch(err => Promise.reject(err));
    }
}
