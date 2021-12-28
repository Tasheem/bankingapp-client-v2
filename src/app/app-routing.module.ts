import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportingImageComponent } from './supporting-image/supporting-image.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  { path: 'transactions', component: TransactionComponent },
  { path: '', component: SupportingImageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
