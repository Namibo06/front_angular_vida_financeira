import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterModule } from './pages/register/register.module';
import { LoginModule } from './pages/login/login.module';
import { HomeModule } from './pages/home/home.module';
import { PerfilModule } from './pages/perfil/perfil.module';
import { LifeFinancialModule } from './pages/life-financial/life-financial.module';
import { FinancialModule } from './pages/financial/financial.module';
import { GoalsModule } from './pages/goals/goals.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RegisterModule,
    LoginModule,
    HomeModule,
    PerfilModule,
    LifeFinancialModule,
    FinancialModule,
    GoalsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
