import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/core/services/snackbar.service';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { MvEmployee } from './employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  errorMessage = '';
  displayedColumns: string[];
  dataSource: MatTableDataSource<MvEmployee>;
  initialSelection = [];
  allowMultiSelect = false;
  selectedEmployee: MvEmployee = <MvEmployee>{};
  selection = new SelectionModel<MvEmployee>(this.allowMultiSelect, this.initialSelection);

  constructor(private employeeService: EmployeeService,
    private snackBar: SnackbarService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.displayedColumns = [
      'employeeId',
      'organizationName',
      'name',
      'address',
      'email',
      'mobile'
    ];
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.employeeService.getAllEmployee().subscribe((data: any) => {
      if (data) {
        this.dataSource = new MatTableDataSource<MvEmployee>(data);
      } else {
        this.dataSource = new MatTableDataSource<MvEmployee>();
        this.errorMessage = 'No records found';
      }
    });
  }

  rowClick(e: any, row: MvEmployee) {
    this.selectedEmployee = { ...row };
    this.selection.toggle(row);
  }

  addEmployee() {
    this.selection.clear();
    this.selectedEmployee = <MvEmployee>{};
    this.openDialog('add');
  }

  editEmployee() {
    this.openDialog('edit');
  }

  openDialog(action: string) {
    if (action === 'edit' && !this.selection.hasValue()) {
      this.snackBar.openSnackBar('No employee selected', 'warning');
      return;
    }

    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '400px',
      data: { data: this.selectedEmployee, action: action }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedEmployee = result;

        if (action === 'edit') {
          this.employeeService.editEmployee(result).subscribe(result => {
            this.snackBar.openSnackBar('Employee Updated', 'success');
            this.getAllEmployee();
          });
        } else if (action === 'add') {
          this.employeeService.addEmployee(result).subscribe(result => {
            this.snackBar.openSnackBar('Employee Added', 'success');
            this.getAllEmployee();
          });
        }
      }

    });
  }
}
