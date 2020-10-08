import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationComponent } from './organization.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material/material.module';
import { FormModule } from '../shared/form/form.module';
import { OrganizationService } from './organization.service';
import { SnackbarService } from 'src/core/services/snackbar.service';
import { OrganizationFormComponent } from './organization-form/organization-form.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormModule
  ],
  declarations: [OrganizationComponent, OrganizationFormComponent],
  providers: [
    OrganizationService,
    SnackbarService
  ],
  entryComponents: [OrganizationFormComponent]

})
export class OrganizationModule { }
