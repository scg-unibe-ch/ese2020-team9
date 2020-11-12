import { Transaction, TransactionAttributes } from '../models/transaction.model';
import { User } from '../models/user.model';
import { Product, ProductAttributes } from './../models/product.model';


export class TransactionService {
    public startTransaction(transaction: TransactionAttributes): Promise<TransactionAttributes> {
        return(Transaction.create(transaction))
            .then(inserted => Promise.resolve(inserted)
            .catch(err => Promise.reject(err)));
    }


    public getAllTransactionsOfSeller(sellerId: number): Promise<Transaction[]> {
        const {Op} = require('sequelize');
        return Transaction.findAll({
            where: {
                [Op.and]: [
                    { userId: sellerId }
                ]
            }
        })
        .catch(err => Promise.reject(err));
    }

    public getAllTransactionsOfBuyer(buyerId: number): Promise<Transaction[]> {
        const {Op} = require('sequelize');
        return Transaction.findAll({
            where: {
                [Op.and]: [
                    { buyerId: buyerId }
                ]
            }
        })
        .catch(err => Promise.reject(err));
    }

    public getTransactionsOfSeller(sellerId: number, transactionId: number): Promise<Transaction[]> {
        const {Op} = require('sequelize');
        return Transaction.findAll({
            where: {
                [Op.and]: [
                    {
                        userId: sellerId,
                        transactionStatus: transactionId
                    }
                ]
            }
        })
        .catch(err => Promise.reject(err));
    }

    public getTransactionsOfBuyer(buyerId: number, transactionId: number): Promise<Transaction[]> {
        const {Op} = require('sequelize');
        return Transaction.findAll({
            where: {
                [Op.and]: [
                    {
                        buyerId: buyerId,
                        transactionStatus: transactionId
                    }
                ]
            }
        })
        .catch(err => Promise.reject(err));
    }

    public confirmTransaction(transactionId: number): Promise<TransactionAttributes> {
        return Transaction.findByPk(transactionId)
            .then((foundTransaction) => {
                if (foundTransaction != null) {
                    console.log(foundTransaction.productId);
                    Product.findByPk(foundTransaction.productId).then(foundProduct => {
                        console.log(foundProduct);
                        foundProduct.update({
                            buyerId: foundTransaction.buyerId
                        }).then(() => {
                            console.log('lolol');
                            console.log(foundProduct);
                            console.log(foundTransaction);
                            return Promise.resolve(foundTransaction);
                        }).catch(err => Promise.reject(err));
                    });
                } else {
                    return Promise.reject('Transaction not found!');
                }
            })
            .catch(err => Promise.reject(err));
        }


            /*
            return Product.findByPk(transaction.productId)
        .then(product => {
            product.update({
                buyerId: buyerId
            })

            addBuyerIdtoProduct(transaction.productId)
        }
        })
    }

    private addBuyerIdToProduct(productId: number, buyerId: number): Promise<Product | void> {
        return Product.findByPk(productId)
        .then(product => {
            product.update({
                buyerId: buyerId
            })
            .then(() => Promise.resolve(product))
            .catch(err => Promise.reject(err));
        })
    }
*/
}


// confirm transaction
  // status changes
  // money is transferred
  // buyer id is inserted into product
  // sellDate is updated
  // isAvailable turns false


// decline transaction
    // status changes


// handle errors for get methods!!! --> should not throw an error if no transaction available
// parse int outside of the function call itself...


// assert that status is correct for each call and/or change it yourself automatically


// make a function get sold products
// make a function get bought products

// Transaction has User: createAssociaton (2x) und vice versa



