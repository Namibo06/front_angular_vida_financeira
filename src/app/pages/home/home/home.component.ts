import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.scss',
    './header.component.scss',
    './footer.component.scss'
  ]
})
export class HomeComponent implements OnInit{  
  showHideMenu: boolean = false;
  yearFinancial: number = 0;

  ngOnInit(): void {
    this.yearFinancial = this.getYearFinancial();
  }

  getYearFinancial(): number{
    return new Date().getFullYear();
  }
}
