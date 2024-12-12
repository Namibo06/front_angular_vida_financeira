import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/angular-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faChevronCircleLeft, faGear } from '@fortawesome/free-solid-svg-icons';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrl: './graphics.component.scss'
})
export class GraphicsComponent implements OnInit{
  chart: Chart | null = null;
  graphicOption: string = "";
  showHideGraphics: boolean = true;
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

  clearGraphicsInView() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null; 
    }
  }
  
  insertGraphicIntoView(event: string) {
    const selectedValue = event as ChartType; 
    const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
  
    if (!this.showHideGraphics) {
      this.showHideGraphics = true;
    }
  
    if (!canvas) {
      console.error('Elemento canvas não encontrado');
      return;
    }
  
    if (this.chart) {
      this.chart.destroy();
    }
  
    canvas.style.display = "block";
  
    this.chart = new Chart(canvas, {
      type: selectedValue,
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [13, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  
  selectGraphicOption() {
    this.showHideGraphics = true; 
    this.insertGraphicIntoView(this.graphicOption);
  }
  
}
