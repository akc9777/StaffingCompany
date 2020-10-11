import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material/material.module';
import { FormModule } from '../shared/form/form.module';
import { SnackbarService } from 'src/core/services/snackbar.service';
import { InvoiceService } from './invoice.service';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';

const routes: Routes = [
  {
    path: '',
    component: InvoiceComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormModule
  ],
  declarations: [InvoiceComponent, InvoiceDetailComponent],
  providers: [SnackbarService, InvoiceService],
  entryComponents: [InvoiceDetailComponent]
})
export class InvoiceModule { }
