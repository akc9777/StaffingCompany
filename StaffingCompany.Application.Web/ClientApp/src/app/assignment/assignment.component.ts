import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/core/services/snackbar.service';
import { TransactionService } from '../transaction/transaction.service';
import { AssignmentFormComponent } from './assignment-form/assignment-form.component';
import { MvAssignment, MvCompletedAssignment } from './assignment.model';
import { AssignmentService } from './assignment.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {

  errorMessage = '';
  displayedColumns: string[];
  dataSource: MatTableDataSource<MvAssignment>;
  initialSelection = [];
  allowMultiSelect = false;
  selectedAssignment: MvAssignment = <MvAssignment>{};
  completedAssignment: MvCompletedAssignment = <MvCompletedAssignment>{};
  selection = new SelectionModel<MvAssignment>(this.allowMultiSelect, this.initialSelection);

  constructor(private assignmentService: AssignmentService,
    private transactionService: TransactionService,
    private snackBar: SnackbarService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.displayedColumns = [
      'assignmentId',
      'organizationName',
      'assignedTo',
      'post',
      'description',
      'rate',
      'unit',
      'status'
    ];
    this.getAllAssignment();
  }

  getAllAssignment() {
    this.assignmentService.getAllAssignment().subscribe((data: any) => {
      if (data) {
        this.dataSource = new MatTableDataSource<MvAssignment>(data);
      } else {
        this.dataSource = new MatTableDataSource<MvAssignment>();
        this.errorMessage = 'No records found';
      }
    });
  }

  rowClick(e: any, row: MvAssignment) {
    this.selectedAssignment = { ...row };
    this.selection.toggle(row);
  }

  addAssignment() {
    this.selection.clear();
    this.selectedAssignment = <MvAssignment>{};
    this.openDialog('add');
  }

  editAssignment() {
    this.openDialog('edit');
  }

  markAsComplete() {
    if (!this.selection.hasValue()) {
      this.snackBar.openSnackBar('No assignment selected', 'warning');
      return;
    } else if (this.selectedAssignment.status) {
      this.snackBar.openSnackBar('Assignment is already completed', 'warning');
      return;
    }
    this.completedAssignment.assignmentId = this.selectedAssignment.assignmentId;
    this.completedAssignment.employeeId = this.selectedAssignment.employeeId;
    this.completedAssignment.organizationId = this.selectedAssignment.organizationId;
    this.completedAssignment.insertPersonId = 4200;
    this.assignmentService.markAssignmentComplete(this.completedAssignment).subscribe(result => {
      this.snackBar.openSnackBar('Assignment marked as complete', 'success');
      this.getAllAssignment();
    });
  }

  openDialog(action: string) {
    if (action === 'edit' && !this.selection.hasValue()) {
      this.snackBar.openSnackBar('No assignment selected', 'warning');
      return;
    } else if (this.selectedAssignment.status) {
      this.snackBar.openSnackBar('Completed assignment cannot be updated', 'warning');
      return;
    }

    const dialogRef = this.dialog.open(AssignmentFormComponent, {
      width: '400px',
      data: { data: this.selectedAssignment, action: action }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedAssignment = result;

        if (action === 'edit') {
          this.assignmentService.editAssignment(result).subscribe(result => {
            this.snackBar.openSnackBar('Assignment Updated', 'success');
            this.getAllAssignment();
          });
        } else if (action === 'add') {
          this.assignmentService.addAssignment(result).subscribe(result => {
            this.snackBar.openSnackBar('Assignment Added', 'success');
            this.getAllAssignment();
          });
        }
      }

    });
  }

}
