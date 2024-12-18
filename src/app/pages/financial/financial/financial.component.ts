import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/angular-fontawesome';
import { faChevronCircleLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FinancialService } from '../../../services/financial/financial.service';

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: [
    './header.component.scss',
    './financial.component.scss'
  ]
})
export class FinancialComponent implements OnInit{
  backPageIcon: IconDefinition = faChevronCircleLeft;
  closeIcon: IconDefinition = faXmark;

  selectedItem: any = {};
  openCloseModalFinancial: boolean = false;
  userId: string | null = "";
  token: string | null = "";
  valueModal: number = 0;
  financialId: string = "";

  emergecyFund: number = 0;
  variableIncome: number = 0;
  fixedIncome: number = 0;
  totalValues: number = 0;
  valueModalUpdate: number = 0;

  constructor(
    private readonly service: FinancialService
  ){}

  ngOnInit(): void {
    this.getDataLocalStorage();
    this.getOneFinancial();
  }

  getDataLocalStorage(){
    this.userId = localStorage.getItem('userIdFinanceiro');
    this.token = localStorage.getItem('tokenFinanceiro');
  }

  openModalFinancial(type: string){
    this.selectedItem = type;
    this.openCloseModalFinancial = true;
  }

  closeModalFinancial(){
    this.openCloseModalFinancial = false;
  }

  getOneFinancial() {
    this.service.getOneFinancialService(this.userId, this.token).subscribe({
      next: (response) => {
        if(response === null){
          this.createFinancial();

          setTimeout(() => {
            window.location.href = "financeiro";
          }, 1000);
        }else{
          this.financialId = response._id;
          this.emergecyFund = response.emergency_fund;
          this.variableIncome = response.variable_income;
          this.fixedIncome = response.fixed_income;
          this.totalValues = response.total;

          this.totalValues = this.variableIncome + this.emergecyFund + this.fixedIncome;
        }
      },
      error: (err) => {
        console.log("Erro ao buscar dados financeiros:", err);
        this.createFinancial(); 
      }
    });
  }
  
  createFinancial(){
    const emergency_fund = 0.00;
    const variable_income = 0.00;
    const fixed_income = 0.00;
  
    this.service.createFinancialService(
      emergency_fund,
      variable_income,
      fixed_income,
      this.userId,
      this.token
    ).subscribe({
      next: (res) => {
        console.log("Dados financeiros criados com sucesso:", res);
      },
      error: (err) => {
        console.log("Erro ao criar dados financeiros:", err);
      }
    });
  }  

  updateFinancial(type: string, valueModal: number){
    this.service.updateFinancialService(
      type,
      valueModal,
      this.totalValues,
      this.financialId,
      this.userId,
      this.token
    ).subscribe({
      next: (res) => {  
        console.log(res);

        setTimeout(() => {
          window.location.href = "financeiro";
        }, 1000);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
