import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/core/services/snackbar.service';
import { MvOrganization } from '../organization.model';
import { OrganizationService } from '../organization.service';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss']
})
export class OrganizationFormComponent implements OnInit, AfterViewInit {

  action: string;
  selectedOrganization: MvOrganization = <MvOrganization>{};
  organizationForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<OrganizationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    public organizationService: OrganizationService,
    public snackBar: SnackbarService) {
    dialogRef.disableClose = true;
    this.action = data.action;
    this.selectedOrganization = data.data || {};
  }

  ngOnInit() {
    this.organizationForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.organizationForm.updateValueAndValidity();
  }

  cancelClick() {
    this.snackBar.openSnackBar('Action Cancelled', 'warn');
    this.dialogRef.close();
  }

  submitForm() {
    this.selectedOrganization.insertPersonId = 4200;
    this.dialogRef.close(this.selectedOrganization);
  }

}
