import express from 'express';
import { Router, Request, Response } from 'express';
import { Transaction } from 'sequelize/types';
import { TransactionService } from '../services/transaction.service';

const transactionController: Router = express.Router();
const transactionService = new TransactionService();

transactionController.post('/', (req: Request, res: Response) => {
    transactionService.startTransaction(req.body).then(() => {
        res.status(200).send({message: 'Transaction successfully initialized!'});
    })
    .catch(err => res.status(400).send(err));
});

export const TransactionController: Router = transactionController;