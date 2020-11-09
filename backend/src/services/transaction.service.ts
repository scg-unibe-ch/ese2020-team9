import { Transaction, TransactionAttributes } from '../models/transaction.model';


export class TransactionService {
    public startTransaction(transaction: TransactionAttributes): Promise<TransactionAttributes> {
        return(Transaction.create(transaction))
            .then(inserted => Promise.resolve(inserted)
            .catch(err => Promise.reject(err)));
    }

}
