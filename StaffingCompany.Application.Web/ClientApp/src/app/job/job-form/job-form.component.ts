import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganizationService } from 'src/app/organization/organization.service';
import { SnackbarService } from 'src/core/services/snackbar.service';
import { MvJob } from '../job.model';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit, AfterViewInit{

  action: string;
  selectedJob: MvJob = <MvJob>{};
  employeeForm: FormGroup;

  organizations = [];

  constructor(public dialogRef: MatDialogRef<JobFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    public organizationService: OrganizationService,
    public snackBar: SnackbarService) {
    dialogRef.disableClose = true;
    this.action = data.action;
    this.selectedJob = data.data || {};
  }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      organizationId: ['', Validators.required],
      post: [''],
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
    this.selectedJob.insertPersonId = 4200;
    this.dialogRef.close(this.selectedJob);
  }

}
