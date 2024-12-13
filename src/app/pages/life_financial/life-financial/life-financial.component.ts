import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/angular-fontawesome';
import { faChevronCircleLeft, faGear, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { ItemService } from '../../../services/item/item.service';

@Component({
  selector: 'app-life-financial',
  templateUrl: './life-financial.component.html',
  styleUrls: [
    './header.component.scss',
    './footer.component.scss',
    './create-item.component.scss',
    './values-items.component.scss'
  ]
})
export class LifeFinancialComponent implements OnInit{
  backPageIcon: IconDefinition = faChevronCircleLeft;
  timeIcon: IconDefinition = faClock;
  configIcon: IconDefinition = faGear;

  hourActual: string = "";
  yearActual: number = 0;
  dayActual: string = "";
  monthActual: string = "";

  name: string = "";
  operation: string = "";
  price: number = 0;
  userId: string | null = "";
  token: string | null = "";
  
  allItems: any = [];
  input_value: number = 0;
  output_value: number = 0;
  total_value: number = 0;

  selectedItem: any = {};
  closeModalIcon: IconDefinition = faXmark;
  openCloseModal: boolean = false;

  positveOrNegativeTotal: boolean = false;

  constructor(
    private readonly service: ItemService
  ){}

  ngOnInit(): void {
    setInterval(() => {
      this.hourActual = this.getTimeActual();  
    },1000);

    this.yearActual = this.getYearActual();
    this.dayActual = this.getDayActual();
    this.monthActual = this.getMonthActual();

    this.getDataLocalStorage();
    this.getAllItems();
  }

  getDataLocalStorage(){
    this.userId = localStorage.getItem('userIdFinanceiro');
    this.token = localStorage.getItem('tokenFinanceiro');
  }

  createItem(){
    this.service.createItemService(this.name,this.operation,this.price,this.userId,this.token).subscribe({
      next: (res) => {
        console.log(res);
        window.location.href = "vida-financeira";
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getAllItems(){
    this.service.getAllItemsService(this.token).subscribe({
      next: (res) => {
        console.log(res);
        this.allItems = res;

        res.map((val) => {
          if(val.operation === "saida"){
            this.output_value += val.price;
          }else{
            this.input_value += val.price;
          }

          this.total_value = this.input_value - this.output_value;

          if(this.total_value < 0){
            this.positveOrNegativeTotal = false;
          }else{
            this.positveOrNegativeTotal = true;
          }
        })
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openModalForUpdate(item: any) {
    this.selectedItem = item; // Armazena o item clicado para atualização
    this.openCloseModal = true;
  }

  closeModal() {
    this.openCloseModal = false;
  }

  updateItem() {
    console.log('Item atualizado:', this.selectedItem);
    this.service.updateItemService(
      this.selectedItem._id,
      this.selectedItem.name,
      this.selectedItem.operation,
      this.selectedItem.price,
      this.token).subscribe({
        next: (res) => {
          console.log(res);

          const resExample = this.allItems;
          this.input_value = 0;
          this.output_value = 0;
          this.total_value = 0;

          resExample.map((val: { operation: string; price: any; }) => {
            const price = Number(val.price);
          
            if (val.operation === "saida") {
              this.output_value += price;
            } else {
              this.input_value += price;
            }
        
            this.total_value = this.input_value - this.output_value;

            if(this.total_value < 0){
              this.positveOrNegativeTotal = false;
            }else{
              this.positveOrNegativeTotal = true;
            }

            setTimeout(() => {
                window.location.href = 'vida-financeira';
            }, 2000);
          });
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.closeModal(); // Fecha o modal após a atualização
        }
      })
  }
  
  removeItem(itemId: string){
    this.service.deleteItemService(itemId,this.token).subscribe({
      next: (res) => {
        console.log(res);

          setTimeout(() => {
              window.location.href = 'vida-financeira';
          }, 2000);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.closeModal(); // Fecha o modal após a atualização
      }
    });
  }

  getTimeActual(): string{
    return new Date().toLocaleTimeString('pt-BR',{
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });  
  }

  getYearActual(): number{
    return new Date().getFullYear();
  }

  getDayActual(): string{
    let dateActual = new Date().getDate().toString();
    
    if(parseInt(dateActual) < 10){
      return dateActual = "0" + dateActual;
    }

    return dateActual;
  }

  getMonthActual(): string{
    let month = new Date().getMonth();
    return this.monthToString(month);
  }

  monthToString(month: number):string{
    var monthActual:string = "";

    switch (month) {
      case 0:
        monthActual = "Janeiro";
        break;

      case 1:
        monthActual = "Fevereiro";
        break;

      case 2:
        monthActual = "Março";
        break;

      case 3:
        monthActual = "Abril";
        break;

      case 4:
        monthActual = "Maio";
        break;

      case 5:
        monthActual = "Junho";
        break;

      case 6:
        monthActual = "Julho";
        break;

      case 7:
        monthActual = "Agosto";
        break;

      case 8:
        monthActual = "Setembro";
        break;

      case 9:
        monthActual = "Outubro";
        break;

      case 10:
        monthActual = "Novembro";
        break;

      case 11:
        monthActual = "Dezembro";
        break;
    
      default:
        monthActual = "Error"
        break;
    }

    return monthActual;
  }
}
