import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/angular-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faChevronCircleLeft, faGear, faXmark } from '@fortawesome/free-solid-svg-icons';
import { GoalsService } from '../../../services/goals/goals.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: [
    './goals.component.scss',
    './header.component.scss'
  ]
})
export class GoalsComponent implements OnInit{
  openCloseModalUpdate: boolean =false;;
  backPageIcon: IconDefinition = faChevronCircleLeft;
  timeIcon: IconDefinition = faClock;
  configIcon: IconDefinition = faGear;
  closeModalIcon: IconDefinition = faXmark;
  checkIcon: IconDefinition = faCheck;

  title: string = "";
  status: string = "";
  number_status: number = 0;
  goalsId: string = "";
  userId: string | null = "";
  token: string | null = "";
  modalCreate: boolean = false;

  hourActual: string = "";

  allGoals: any = [];
  selectedItem: any = {};

  constructor(
    private readonly service: GoalsService
  ){}

  ngOnInit(): void {
    setInterval(() => {
      this.hourActual = this.getTimeActual();  
    },1000);

    this.getDataLocalStorage();
    this.getAllGoals();
  }

  goalsStep(goalId: string, status: string) {
    const steps = ['pensando', 'primeiro_passo', 'em_andamento', 'concluido'];
  
    const selectedIndex = steps.indexOf(status);
    this.updateGoalsStep(selectedIndex + 1, status, goalId);
  
    if (selectedIndex !== -1) {
      steps.forEach((step, index) => {
        const element = document.getElementById(`${goalId}-${step}`);
        if (element) {
          if (index <= selectedIndex) {
            element.classList.add('completed');
          } else {
            element.classList.remove('completed');
          }
        }
      });
    }
  }
  
  updateGoalsStep(indexGoals: number, status: string, goalId: string) {
    this.service.updateStepsGoalsService(status, indexGoals, this.token, this.userId, goalId).subscribe({
      next: (res) => {
        console.log(res);
        this.allGoals = this.allGoals.map((goal: { _id: string; number_status: number; }) => {
          if (goal._id === goalId) {
            goal.number_status = indexGoals;
          }
          return goal;
        });
  
        setTimeout(() => {
          window.location.href = "metas";
        }, 2000);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  createGoals(){
    this.service.createGoalsService(this.title,this.token,this.userId).subscribe({
      next: (res) => {
        console.log(res);
        setTimeout(() => {
          window.location.href = "metas";
        }, 2000);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.closeModalCreate();
      }
    })
  }

  getAllGoals(){
    this.service.getAllGoalsService(this.token).subscribe({
      next: (res) => {
        console.log(res);
        this.allGoals = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  openModalUpdate(item: string){
    this.selectedItem = item;
    this.openCloseModalUpdate = true;
  }

  closeModalUpdate(){
    this.openCloseModalUpdate = false;
  }

  updateTitle(){
    this.service.updateTitleGoalsService(this.selectedItem.title,this.userId,this.selectedItem._id,this.token).subscribe({
      next: (res) => {
        console.log(res);

        setTimeout(() => {
          window.location.href = "metas";
        }, 2000);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.closeModalCreate();
      }
    });
  }

  removeGoals(goalsId: string){
    this.service.removeGoalsService(goalsId,this.token).subscribe({
      next: (res) => {
        console.log(res);

        setTimeout(() => {
          window.location.href = "metas";
        }, 2000);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.closeModalUpdate();
      }
    });
  }

  openModalCreate(){
    this.modalCreate=true;
  }

  closeModalCreate(){
    this.modalCreate=false;
  }

  getTimeActual(): string{
    return new Date().toLocaleTimeString('pt-BR',{
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });  
  }

  getDataLocalStorage(){
    this.userId = localStorage.getItem('userIdFinanceiro');
    this.token = localStorage.getItem('tokenFinanceiro');
  }

}