import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LifeFinancialComponent } from './life-financial/life-financial.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [LifeFinancialComponent],
  exports: [LifeFinancialComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FontAwesomeModule
  ]
})
export class LifeFinancialModule { }
