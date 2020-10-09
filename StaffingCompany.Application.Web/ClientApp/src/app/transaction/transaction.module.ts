import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionComponent } from './transaction.component';
import { RouterModule, Routes } from '@angular/router';
import { FormModule } from '../shared/form/form.module';
import { MaterialModule } from '../shared/material/material.module';
import { SnackbarService } from 'src/core/services/snackbar.service';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { TransactionService } from './transaction.service';

const routes: Routes = [
  {
    path: '',
    component: TransactionComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormModule
  ],
  declarations: [TransactionComponent, CreateInvoiceComponent],
  providers: [
    TransactionService,
    SnackbarService
  ],
  entryComponents: [CreateInvoiceComponent]
})
export class TransactionModule { }
