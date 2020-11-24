import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Transaction} from "../models/transaction.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpClient: HttpClient) { }

  /** post requests **/
  //should be used in product-detail/shipping
  buyProduct(transaction: Transaction): Observable<any>{
    return this.httpClient.post(environment.endpointURL + 'transaction/', transaction);
  }

  /** put requests **/
  sellProduct(transaction: Transaction): Observable<Transaction> {
    return this.httpClient.put<Transaction>(environment.endpointURL + 'transaction/confirm/' + transaction.transactionId, transaction);
  }

  declineProduct(transaction: Transaction): Observable<Transaction> {
    return this.httpClient.put<Transaction>(environment.endpointURL + 'transaction/decline/' + transaction.transactionId, transaction);
  }

}
