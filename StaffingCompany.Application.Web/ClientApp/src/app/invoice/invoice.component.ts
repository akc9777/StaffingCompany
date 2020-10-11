import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/core/services/snackbar.service';
import { MvTransactionInvoice } from '../transaction/transaction.model';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { MvInvoiceSel } from './invoice.model';
import { InvoiceService } from './invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  errorMessage = '';
  displayedColumns: string[];
  dataSource: MatTableDataSource<MvInvoiceSel>;
  transactions: MvTransactionInvoice[] = [];
  initialSelection = [];
  allowMultiSelect = false;
  selectedInvoice: MvInvoiceSel = <MvInvoiceSel>{};
  selection = new SelectionModel<MvInvoiceSel>(this.allowMultiSelect, this.initialSelection);

  constructor(private invoiceService: InvoiceService,
    private snackBar: SnackbarService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.displayedColumns = [
      'invoiceId',
      'entityName',
      'entityType',
      'amount',
      'insertDate'
    ];
    this.getAllInvoice();
  }

  getAllInvoice() {
    this.invoiceService.getAllInvoice().subscribe((data: any) => {
      if (data) {
        this.dataSource = new MatTableDataSource<MvInvoiceSel>(data);
      } else {
        this.dataSource = new MatTableDataSource<MvInvoiceSel>();
        this.errorMessage = 'No records found';
      }
    });
  }

  rowClick(e: any, row: MvInvoiceSel) {
    this.selectedInvoice = { ...row };
    this.selection.toggle(row);
  }

  viewInvoiceDetail() {
    if (!this.selection.hasValue()) {
      this.snackBar.openSnackBar('No Invoice Selected', 'warning');
      return;
    }

    this.invoiceService.getInvoice(this.selectedInvoice.invoiceId).subscribe(result => {
      if (result) {
        this.transactions = result;
      }

      const dialogRef = this.dialog.open(InvoiceDetailComponent, {
        width: '900px',
        data: {
          invoice: this.selectedInvoice,
          invoiceTransactions: this.transactions
        }
      });
      dialogRef.afterClosed().subscribe(message => {
        if (message === 'print') {
          this.snackBar.openSnackBar('Invoice Printed', 'success');
        } else if (message === 'close') {
          this.snackBar.openSnackBar('Action Cancelled', 'warning');
        }
      });
    });

  }
}
