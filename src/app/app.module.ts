import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SupportingImageComponent } from './supporting-image/supporting-image.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { TransactionComponent } from './transaction/transaction.component';
import { DepositWithdrawComponent } from './deposit-withdraw/deposit-withdraw.component';
import { BackgroundImageComponent } from './background-image/background-image.component';
import { RegisterComponent } from './register/register.component';
import { InputComponent } from './input/input.component';
import { GenderButtonsComponent } from './gender-buttons/gender-buttons.component';
import { CheckingFormComponent } from './checking-form/checking-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SupportingImageComponent,
    LoginFormComponent,
    FooterComponent,
    HamburgerMenuComponent,
    TransactionComponent,
    DepositWithdrawComponent,
    BackgroundImageComponent,
    RegisterComponent,
    InputComponent,
    GenderButtonsComponent,
    CheckingFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
