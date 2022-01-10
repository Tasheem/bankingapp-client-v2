import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckingFormComponent } from './checking-form/checking-form.component';
import { DepositWithdrawComponent } from './deposit-withdraw/deposit-withdraw.component';
import { RegisterComponent } from './register/register.component';
import { SupportingImageComponent } from './supporting-image/supporting-image.component';
import { TransactionComponent } from './transaction/transaction.component';
import { UsernameFormComponent } from './username-form/username-form.component';

const routes: Routes = [
  { path: 'transactions', component: TransactionComponent },
  { path: 'perform-transaction', component: DepositWithdrawComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create-checking', component: CheckingFormComponent },
  { path: 'update-username', component: UsernameFormComponent },
  { path: '', component: SupportingImageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
