import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material/material.module';
import { EmployeeService } from './employee.service';
import { SnackbarService } from 'src/core/services/snackbar.service';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { FormModule } from '../shared/form/form.module';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormModule
  ],
  declarations: [EmployeeComponent, EmployeeFormComponent],
  providers: [
    EmployeeService,
    SnackbarService
  ],
  entryComponents: [EmployeeFormComponent]
})
export class EmployeeModule { }
