import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from 'src/core/services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private api: WebApiService) { }

  getTransaction(id: any) {
    return this.api.get('transaction/gettransaction', JSON.stringify({ transactionId: id }));
  }

  getAllTransaction() {
    return this.api.get('transaction/getalltransaction');
  }

}
