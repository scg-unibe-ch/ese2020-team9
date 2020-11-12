import express, { response } from 'express';
import { Router, Request, Response } from 'express';
import { request } from 'http';
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

transactionController.get('/sell/:userId', (req: Request, res: Response) => {
    transactionService.getAllTransactionsOfSeller(parseInt(req.params.userId, 10))
    .then((transactions) => res.status(200).send(transactions))
    .catch(err => res.status(404).send(err));
});

transactionController.get('/buy/:userId', (req: Request, res: Response) => {
    transactionService.getAllTransactionsOfBuyer(parseInt(req.params.userId, 10))
    .then((transactions) => res.status(200).send(transactions))
    .catch(err => res.status(404).send(err));
});

transactionController.get('/sell/:userId/status/:transactionStatus', (req: Request, res: Response) => {
    transactionService.getTransactionsOfSeller(parseInt( req.params.userId, 10), parseInt(req.params.transactionStatus, 10))
    .then((transactions) => res.status(200).send(transactions))
    .catch(err => res.status(404).send(err));
});

transactionController.get('/buy/:userId/status/:transactionStatus', (req: Request, res: Response) => {
    transactionService.getTransactionsOfBuyer(parseInt(req.params.userId, 10), parseInt(req.params.transactionStatus, 10))
    .then((transactions) => res.status(200).send(transactions))
    .catch(err => res.status(404).send(err));
});

transactionController.put('/confirm/:transactionId', (req: Request, res: Response) => {
    transactionService.confirmTransaction(parseInt(req.params.transactionId, 10))
    .then(() => res.status(200).send({message: 'Transaction successfully confirmed!'}))
    .catch(err => res.status(500).send(err));
});

export const TransactionController: Router = transactionController;
