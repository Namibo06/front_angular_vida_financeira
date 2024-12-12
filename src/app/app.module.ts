import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterModule } from './pages/register/register.module';
import { LoginModule } from './pages/login/login.module';
import { HomeModule } from './pages/home/home.module';
import { PerfilModule } from './pages/perfil/perfil.module';
import { LifeFinancialModule } from './pages/life_financial/life_financial.module';
import { FinancialModule } from './pages/financial/financial.module';
import { GoalsModule } from './pages/goals/goals.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReportsModule } from './pages/reports/reports.module';
import { GraphicsModule } from './pages/graphics/graphics.module';
import { HttpClientModule } from '@angular/common/http';

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
    GoalsModule,
    FontAwesomeModule,
    ReportsModule,
    GraphicsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
