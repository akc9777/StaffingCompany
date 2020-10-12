import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/core/services/snackbar.service';
import { InvoiceService } from '../invoice/invoice.service';
import { MvTransaction, MvTransactionInvoice } from './transaction.model';
import { TransactionService } from './transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  dataSource: MatTableDataSource<MvTransactionInvoice>;
  assignments = [];
  transactions = [];
  payload = [];
  displayedColumns = [];
  initialSelection = [];
  errorMessage = '';
  allowMultiSelect = true;
  selection = new SelectionModel<MvTransactionInvoice>(this.allowMultiSelect, this.initialSelection);

  constructor(private transactionService: TransactionService,
    private invoiceService: InvoiceService,
    private snackBar: SnackbarService) { }

  ngOnInit() {
    this.displayedColumns = [
      'select',
      'transactionId',
      'organizationId',
      'organizationName',
      'assignmentId',
      'task',
      'employeeId',
      'employeeName',
      'amount',
      'status',
      'date'
    ];
    this.getAllTransaction();
  }

  getAllTransaction() {
    this.transactionService.getAllTransaction().subscribe((data: any) => {
      if (data) {
        this.dataSource = new MatTableDataSource<MvTransactionInvoice>(data);
      } else {
        this.dataSource = new MatTableDataSource<MvTransactionInvoice>();
        this.errorMessage = 'No records found';
      }
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  createEmpInvoice() {
    if (!this.selection.hasValue()) {
      this.snackBar.openSnackBar('No transaction selected', 'warning');
    } else if (!this.isSameEmployee(this.selection.selected)) {
      this.snackBar.openSnackBar('Select transactions of same employee', 'warning');
    } else if (this.hasEmpInvoice(this.selection.selected)) {
      this.snackBar.openSnackBar('Cannot generate invoice for processed transactions', 'warning');
    }
    for (let item of this.selection.selected) {
      this.transactions.push({ transactionId: item.transactionId });
    }
    this.payload.push({
      entityType: 1,
      entityId: this.selection.selected[0].organizationId,
      transactions: JSON.stringify(this.transactions),
      insertPersonId: 4201
    });

    this.invoiceService.addInvoice(this.payload).subscribe((result => {
      this.snackBar.openSnackBar('Invoice generated', 'success');
      this.getAllTransaction();
    }));

  }

  isSameEmployee(array): boolean {
    const first = array[0];
    return array.every((element) => {
      return element.employeeId === first.employeeId;
    });
  }

  hasEmpInvoice(array): boolean {
    let result = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i].status === 1 || array[i].status === 3) {
        result = true;
        break;
      }
    }
    return result;
  }

  createOrgInvoice() {
    if (!this.selection.hasValue()) {
      this.snackBar.openSnackBar('No transaction selected', 'warning');
    } else if (!this.isSameOrganization(this.selection.selected)) {
      this.snackBar.openSnackBar('Select transactions of same organization', 'warning');
    } else if (this.hasOrgInvoice(this.selection.selected)) {
      this.snackBar.openSnackBar('Cannot generate invoice for processed transactions', 'warning');
    }
    for (let item of this.selection.selected) {
      this.transactions.push({ transactionId: item.transactionId });
    }
    this.payload.push({
      entityType: 2,
      entityId: this.selection.selected[0].organizationId,
      transactions: JSON.stringify(this.transactions),
      insertPersonId: 4201
    });

    this.invoiceService.addInvoice(this.payload).subscribe((result => {
      this.snackBar.openSnackBar('Invoice generated', 'success');
      this.getAllTransaction();
    }));
  }

  isSameOrganization(array): boolean {
    const first = array[0];
    return array.every((element) => {
      return element.organizationId === first.organizationId;
    });
  }

  hasOrgInvoice(array): boolean {
    let result = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i].status === 2 || array[i].status === 3) {
        result = true;
        break;
      }
    }
    return result;
  }

  getTransactionStatusMessage(statusCode) {
    switch (statusCode) {
      case 0: {
        return 'Not invoiced';
        break;
      }
      case 1: {
        return 'Emp invoiced';
        break;
      }
      case 2: {
        return 'Org invoiced';
        break;
      }
      case 3: {
        return 'All invoiced';
        break;
      }
    }
  }
}
