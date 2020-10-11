import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from 'src/core/services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private api: WebApiService) { }

  getAllInvoice() {
    return this.api.get('invoice/getallinvoice');
  }

  getInvoice(id: any): Observable<any> {
    const parameter = '{"invoiceId":' + id + '}';
    return this.api.get('invoice/getinvoice', new HttpParams().set('json', parameter));
  }
}
