import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganizationService } from 'src/app/organization/organization.service';
import { SnackbarService } from 'src/core/services/snackbar.service';
import { MvEmployee } from '../employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit, AfterViewInit {

  action: string;
  selectedEmployee: MvEmployee = <MvEmployee>{};
  employeeForm: FormGroup;

  organizations = [];

  constructor(public dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    public organizationService: OrganizationService,
    public snackBar: SnackbarService) {
    dialogRef.disableClose = true;
    this.action = data.action;
    this.selectedEmployee = data.data || {};
  }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      organizationId: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required]
    });
    this.getAllOrganization();
  }

  getAllOrganization() {
    this.organizationService.getAllOrganization().subscribe(data => {
      if (data) {
        data.forEach(element => {
          this.organizations.push({
            value: element.organizationId,
            selectValue: element.name
          });
        });
      }
    });
  }



  ngAfterViewInit() {
    this.employeeForm.updateValueAndValidity();
  }

  cancelClick() {
    this.dialogRef.close();
    this.snackBar.openSnackBar('Action Cancelled', 'warn');
  }

  submitForm() {
    this.selectedEmployee.insertPersonId = 4200;
    this.dialogRef.close(this.selectedEmployee);
  }
}
