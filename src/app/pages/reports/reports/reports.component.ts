import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../services/reports/reports.service';
import saveAs from 'file-saver';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit{
  startDate: Date | undefined;
  endDate: Date | undefined;
  allINputOrOutput: string = "";
  templateModal: boolean = false;
  itemsReports: any = [];

  userId: string | null = "";
  token: string | null = "";

  constructor(private readonly service: ReportsService){}

  ngOnInit(): void {
    this.getDataLocalStorage();
  }

  exportToCsv(){
    this.service
    .generateCsvOrExcelService(
      this.startDate, 
      this.endDate, 
      "csv", 
      this.userId, 
      this.token
    )
    .subscribe(
      (response: Blob) => {
        const filename = 'relatorio.csv';
        saveAs(response, filename);
      },
      (error) => {
        console.error('Erro ao exportar o arquivo:', error);
      }
    );
  }

  exportToExcel(){
    this.service
    .generateCsvOrExcelService(
      this.startDate, 
      this.endDate, 
      "excel", 
      this.userId, 
      this.token
    )
    .subscribe(
      (response: Blob) => {
        const filename = 'relatorio.xlsx';
        saveAs(response, filename);
      },
      (error) => {
        console.error('Erro ao exportar o arquivo:', error);
      }
    );
  }

  downloadPDF(){
    this.service.generatePdfService(this.startDate, this.endDate, this.userId, this.token).subscribe(
      (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorio.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Erro ao gerar o PDF:', error);
      }
    );
    
  }

  clearFilters(){
    this.startDate = undefined;
    this.endDate = undefined;

    this.templateModal = false;
  }

  searchData(){
    this.service.searchDataService(
      this.startDate,
      this.endDate,
      this.allINputOrOutput,
      this.userId,
      this.token
    ).subscribe({
      next: (res) => {
        this.templateModal = true;
        
        this.itemsReports = Array.isArray(res) ? res : [];
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  getDataLocalStorage(){
    this.userId = localStorage.getItem('userIdFinanceiro');
    this.token = localStorage.getItem('tokenFinanceiro');
  }
}
