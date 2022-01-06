import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositWithdrawComponent } from './deposit-withdraw/deposit-withdraw.component';
import { RegisterComponent } from './register/register.component';
import { SupportingImageComponent } from './supporting-image/supporting-image.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  { path: 'transactions', component: TransactionComponent },
  { path: 'perform-transaction', component: DepositWithdrawComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: SupportingImageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
