import { assert } from 'console';
import { Transaction, TransactionAttributes } from '../models/transaction.model';


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
}



// confirm transaction
  // status changes 
  // money is transferred
  // buyer id is inserted into product
  // sellDate is updated
  // isAvailable turns false


// decline transaction
    // status changes


// make a function get sold products
// make a function get bought products