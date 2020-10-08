import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/core/services/snackbar.service';
import { JobFormComponent } from './job-form/job-form.component';
import { MvJob } from './job.model';
import { JobService } from './job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  errorMessage = '';
  displayedColumns: string[];
  dataSource: MatTableDataSource<MvJob>;
  initialSelection = [];
  allowMultiSelect = false;
  selectedJob: MvJob = <MvJob>{};
  selection = new SelectionModel<MvJob>(this.allowMultiSelect, this.initialSelection);

  constructor(private jobService: JobService,
    private snackBar: SnackbarService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.displayedColumns = [
      'jobId',
      'organizationId',
      'organizationName',
      'post'
    ];
    this.getAllJob();
  }

  getAllJob() {
    this.jobService.getAllJob().subscribe((data: any) => {
      if (data) {
        this.dataSource = new MatTableDataSource<MvJob>(data);
      } else {
        this.dataSource = new MatTableDataSource<MvJob>();
        this.errorMessage = 'No records found';
      }
    });
  }

  rowClick(e: any, row: MvJob) {
    this.selectedJob = { ...row };
    this.selection.toggle(row);
  }

  addJob() {
    this.selection.clear();
    this.selectedJob = <MvJob>{};
    this.openDialog('add');
  }

  editJob() {
    this.openDialog('edit');
  }

  openDialog(action: string) {
    if (action === 'edit' && !this.selection.hasValue()) {
      this.snackBar.openSnackBar('No job selected', 'warning');
      return;
    }

    const dialogRef = this.dialog.open(JobFormComponent, {
      width: '400px',
      data: { data: this.selectedJob, action: action }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedJob = result;

        if (action === 'edit') {
          this.jobService.editJob(result).subscribe(result => {
            this.snackBar.openSnackBar('Job Updated', 'success');
            this.getAllJob();
          });
        } else if (action === 'add') {
          this.jobService.addJob(result).subscribe(result => {
            this.snackBar.openSnackBar('Job Added', 'success');
            this.getAllJob();
          });
        }
      }

    });
  }

}
