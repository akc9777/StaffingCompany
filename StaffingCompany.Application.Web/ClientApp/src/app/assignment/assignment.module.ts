import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentComponent } from './assignment.component';
import { RouterModule, Routes } from '@angular/router';
import { FormModule } from '../shared/form/form.module';
import { MaterialModule } from '../shared/material/material.module';
import { JobService } from '../job/job.service';
import { SnackbarService } from 'src/core/services/snackbar.service';
import { AssignmentFormComponent } from './assignment-form/assignment-form.component';

const routes: Routes = [
  {
    path: '',
    component: AssignmentComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormModule
  ],
  declarations: [AssignmentComponent, AssignmentFormComponent],
  providers: [
    JobService,
    SnackbarService
  ],
  entryComponents: [AssignmentFormComponent]
})
export class AssignmentModule { }
