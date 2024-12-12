import { Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/angular-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: [
    './header.component.scss',
    './financial.component.scss'
  ]
})
export class FinancialComponent {
  backPageIcon: IconDefinition = faChevronCircleLeft;
}
