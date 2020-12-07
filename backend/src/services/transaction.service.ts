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
        .catch(err => Promise.reject({message: err}));
    }


    public confirmTransaction(transactionId: number): Promise<TransactionAttributes> {
        return Transaction.findByPk(transactionId).then((foundTransaction) => {
            if (foundTransaction != null) {
                return Product.findByPk(foundTransaction.productId).then(foundProduct => {
                    return User.findByPk(foundTransaction.buyerId).then(foundBuyer => {
                        if (foundBuyer.wallet >= foundProduct.productPrice) {
                            return foundProduct.update({
                                sellDate: new Date(Date.now()),
                                buyerId: foundTransaction.buyerId
                            }).then(() => {
                                this.updateUser(foundBuyer, foundProduct, true);
                            }).then(() => {
                                return User.findByPk(foundTransaction.userId);
                            }).then((foundSeller) => {
                                this.updateUser(foundSeller, foundProduct, false);
                            }).then(() => {
                                foundTransaction.update({
                                    transactionStatus: 2
                                });
                            })
                            .then(() => {
                                return Promise.resolve(foundTransaction);
                            });
                        } else {
                            Promise.reject('Not enough money available to buy the product!');
                        }
                    });
                });
            } else {
                return Promise.reject('Transaction not found!');
            }
        })
        .catch(err => Promise.reject({message: err}));
    }

    private updateUser(user: User, product: Product, isBuyer: boolean) {
        let activityScoreIncrement = product.productPrice * 0.1;
        let walletIncrement = product.productPrice;
        if (isBuyer) { walletIncrement = walletIncrement * -1; }
        if (!isBuyer) { activityScoreIncrement = activityScoreIncrement * 2; }
        return User.increment('wallet', {
            by: walletIncrement,
            where: {
                userId: user.userId
            }
        }).then(() => {
            this.incrementActivityScore(user.userId, activityScoreIncrement);
        }).then(() => {
            this.updateOverallScore(user, activityScoreIncrement);
        });
    }

    private incrementActivityScore(userId: number, activityScoreIncrement: number) {
        return User.increment('activityScore', {
            by: activityScoreIncrement,
            where: {
                userId: userId
            }
        });
    }

    private updateOverallScore(user: User, activityScoreIncrement: number) {
        const gameScore = user.gameScore;
        const activityScore = user.activityScore + activityScoreIncrement;
        const newOverallScore = gameScore * activityScore;
        user.overallScore = newOverallScore;
        return user.save();
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
        .catch(err => Promise.reject({message: err}));
    }

    public getAllTransactionsOfSeller(sellerId: number): Promise<Transaction[]> {
        const {Op} = require('sequelize');
        return Transaction.findAll({
            include: [
                Transaction.associations.product,
                Transaction.associations.seller,
                Transaction.associations.buyer
            ],
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
            include: [
                Transaction.associations.product,
                Transaction.associations.seller,
                Transaction.associations.buyer
            ],
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
            include: [
                Transaction.associations.product,
                Transaction.associations.seller,
                Transaction.associations.buyer
            ],
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
            include: [
                Transaction.associations.product,
                Transaction.associations.seller,
                Transaction.associations.buyer
            ],
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
