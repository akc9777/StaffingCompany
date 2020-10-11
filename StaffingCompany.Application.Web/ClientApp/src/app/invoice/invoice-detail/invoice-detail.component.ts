import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MvTransactionInvoice } from 'src/app/transaction/transaction.model';
import { MvInvoiceSel } from '../invoice.model';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {

  invoice: MvInvoiceSel = <MvInvoiceSel>{};
  invoiceTransactions: MvTransactionInvoice[] = [];
  constructor(public dialogRef: MatDialogRef<InvoiceDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.invoice = this.data.invoice;
    this.invoiceTransactions = this.data.invoiceTransactions;
  }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close('close');
  }

  printInvoice() {
    this.dialogRef.close('print');
  }

}
