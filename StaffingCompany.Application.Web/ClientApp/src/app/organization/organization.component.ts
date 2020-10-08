import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/core/services/snackbar.service';
import { OrganizationFormComponent } from './organization-form/organization-form.component';
import { MvOrganization } from './organization.model';
import { OrganizationService } from './organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  errorMessage = '';
  displayedColumns: string[];
  dataSource: MatTableDataSource<MvOrganization>;
  initialSelection = [];
  allowMultiSelect = false;
  selectedOrganization: MvOrganization = <MvOrganization>{};
  selection = new SelectionModel<MvOrganization>(this.allowMultiSelect, this.initialSelection);

  constructor(private organizationService: OrganizationService,
    private snackBar: SnackbarService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.displayedColumns = [
      'organizationId',
      'name',
      'address',
      'email',
      'mobile'
    ];
    this.getAllOrganization();
  }

  getAllOrganization() {
    this.organizationService.getAllOrganization().subscribe((data: any) => {
      if (data) {
        this.dataSource = new MatTableDataSource<MvOrganization>(data);
      } else {
        this.dataSource = new MatTableDataSource<MvOrganization>();
        this.errorMessage = 'No records found';
      }
    });
  }

  rowClick(e: any, row: MvOrganization) {
    this.selectedOrganization = { ...row };
    this.selection.toggle(row);
  }

  addOrganization() {
    this.selection.clear();
    this.selectedOrganization = <MvOrganization>{};
    this.openDialog('add');
  }

  editOrganization() {
    this.openDialog('edit');
  }

  openDialog(action: string) {
    if (action === 'edit' && !this.selection.hasValue()) {
      this.snackBar.openSnackBar('No Organization selected', 'warning');
      return;
    }

    const dialogRef = this.dialog.open(OrganizationFormComponent, {
      width: '400px',
      data: { data: this.selectedOrganization, action: action }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedOrganization = result;

        if (action === 'edit') {
          this.organizationService.editOrganization(result).subscribe(result => {
            this.snackBar.openSnackBar('Organization Updated', 'success');
            this.getAllOrganization();
          });
        } else if (action === 'add') {
          this.organizationService.addOrganization(result).subscribe(result => {
            this.snackBar.openSnackBar('Organization Added', 'success');
            this.getAllOrganization();
          });
        }
      }

    });
  }
}
