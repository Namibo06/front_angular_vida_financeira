import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/angular-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faChevronCircleLeft, faGear } from '@fortawesome/free-solid-svg-icons';
import { Chart, ChartType } from 'chart.js/auto';
import { ItemService } from '../../../services/item/item.service';

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

  userId: string | null = "";
  token: string | null = "";

  startDate: Date | undefined;
  endDate: Date | undefined;

  constructor(private readonly service: ItemService){}
  
  ngOnInit(): void {
    setInterval(() => {
      this.hourActual = this.getTimeActual();  
    },1000);

    this.getDataLocalStorage();
  }

  getDataLocalStorage(){
    this.userId = localStorage.getItem('userIdFinanceiro');
    this.token = localStorage.getItem('tokenFinanceiro');
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

    this.startDate = undefined;
    this.endDate = undefined;
  }
  
  insertGraphicIntoView(event: string, totalInputs: number, totalOutputs: number) {
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
        labels: ['Entrada', 'Saída'],
        datasets: [
          {
            label: '# Quantidade',
            data: [totalInputs,totalOutputs],
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
    console.log(this.startDate);
    console.log(this.endDate);

    this.service.getGraphicsInputAndOutput(
      this.userId,
      this.token,
      this.startDate,
      this.endDate
    ).subscribe({
      next: (res) => {

        this.insertGraphicIntoView(this.graphicOption,res.total_inputs,res.total_outputs);
      },
      error: (err) => {
        console.log(err);
      }
    });

  }
}
