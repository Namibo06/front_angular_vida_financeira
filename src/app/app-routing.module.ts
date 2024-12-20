import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register/register.component';
import { LoginComponent } from './pages/login/login/login.component';
import { HomeComponent } from './pages/home/home/home.component';
import { FinancialComponent } from './pages/financial/financial/financial.component';
import { LifeFinancialComponent } from './pages/life_financial/life-financial/life-financial.component';
import { GoalsComponent } from './pages/goals/goals/goals.component';
import { PerfilComponent } from './pages/perfil/perfil/perfil.component';
import { ReportsComponent } from './pages/reports/reports/reports.component';
import { GraphicsComponent } from './pages/graphics/graphics/graphics.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'cadastro',
    component: RegisterComponent
  },
  {
    path: 'iniciar-sessao',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'financeiro',
    component: FinancialComponent
  },
  {
    path: 'vida-financeira',
    component: LifeFinancialComponent
  },
  {
    path: 'metas',
    component: GoalsComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'relatorios',
    component: ReportsComponent
  },
  {
    path: 'graficos',
    component: GraphicsComponent
  },
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
