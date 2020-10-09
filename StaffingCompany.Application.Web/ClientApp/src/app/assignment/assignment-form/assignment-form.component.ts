import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/employee/employee.service';
import { JobService } from 'src/app/job/job.service';
import { OrganizationService } from 'src/app/organization/organization.service';
import { SnackbarService } from 'src/core/services/snackbar.service';
import { MvAssignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.scss']
})
export class AssignmentFormComponent implements OnInit, AfterViewInit {

  action: string;
  selectedAssignment: MvAssignment = <MvAssignment>{};
  assignmentForm: FormGroup;

  organizations = [];
  employees = [];
  jobs = [];

  constructor(public dialogRef: MatDialogRef<AssignmentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    public organizationService: OrganizationService,
    public employeeService: EmployeeService,
    public jobService: JobService,
    public snackBar: SnackbarService) {
    dialogRef.disableClose = true;
    this.action = data.action;
    this.selectedAssignment = data.data || {};
  }

  ngOnInit() {
    this.assignmentForm = this.fb.group({
      organizationId: ['', Validators.required],
      jobId: ['', Validators.required],
      employeeId: ['', Validators.required],
      description: ['', Validators.required],
      unit: ['', Validators.required],
      rate: ['', Validators.required]
    });
    this.getAllOrganization();
    this.getAllJob();
    this.getAllEmployee();
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

  getAllJob() {
    this.jobService.getAllJob().subscribe(data => {
      if (data) {
        data.forEach(element => {
          this.jobs.push({
            value: element.jobId,
            selectValue: element.post
          });
        });
      }
    });
  }

  getAllEmployee() {
    this.employeeService.getAllEmployee().subscribe(data => {
      if (data) {
        data.forEach(element => {
          this.employees.push({
            value: element.employeeId,
            selectValue: element.lastName + ' ' + element.firstName
          });
        });
      }
    });
  }

  ngAfterViewInit() {
    this.assignmentForm.updateValueAndValidity();
  }

  cancelClick() {
    this.dialogRef.close();
    this.snackBar.openSnackBar('Action Cancelled', 'warn');
  }

  submitForm() {
    this.selectedAssignment.insertPersonId = 4200;
    this.dialogRef.close(this.selectedAssignment);
  }

}
