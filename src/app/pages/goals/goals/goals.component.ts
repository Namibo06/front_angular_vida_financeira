import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/angular-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faChevronCircleLeft, faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: [
    './goals.component.scss',
    './header.component.scss'
  ]
})
export class GoalsComponent implements OnInit{
  backPageIcon: IconDefinition = faChevronCircleLeft;
  timeIcon: IconDefinition = faClock;
  configIcon: IconDefinition = faGear;

  hourActual: string = "";

  ngOnInit(): void {
    setInterval(() => {
      this.hourActual = this.getTimeActual();  
    },1000);
  }

  getTimeActual(): string{
    return new Date().toLocaleTimeString('pt-BR',{
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });  
  }

}