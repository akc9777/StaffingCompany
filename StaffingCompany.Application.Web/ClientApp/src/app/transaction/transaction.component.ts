import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/core/services/snackbar.service';
import { MvTransaction } from './transaction.model';
import { TransactionService } from './transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  dataSource: MatTableDataSource<MvTransaction>;
  displayedColumns = [];
  initialSelection = [];
  errorMessage = '';
  allowMultiSelect = true;
  selection = new SelectionModel<MvTransaction>(this.allowMultiSelect, this.initialSelection);

  constructor(private transactionService: TransactionService,
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
      'date'
    ];
    this.getAllTransaction();
  }

  getAllTransaction() {
    this.transactionService.getAllTransaction().subscribe((data: any) => {
      if (data) {
        this.dataSource = new MatTableDataSource<MvTransaction>(data);
      } else {
        this.dataSource = new MatTableDataSource<MvTransaction>();
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

}
