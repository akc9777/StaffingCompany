import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobComponent } from './job.component';
import { MaterialModule } from '../shared/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { SnackbarService } from 'src/core/services/snackbar.service';
import { FormModule } from '../shared/form/form.module';
import { JobFormComponent } from './job-form/job-form.component';
import { JobService } from './job.service';

const routes: Routes = [
  {
    path: '',
    component: JobComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormModule
  ],
  declarations: [JobComponent, JobFormComponent],
  providers: [
    JobService,
    SnackbarService
  ],
  entryComponents: [JobFormComponent]
})
export class JobModule { }
