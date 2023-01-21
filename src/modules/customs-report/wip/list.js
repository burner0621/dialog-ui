import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
  constructor(router, service) {
        this.service = service;
        this.router = router;
    }
    
    info = { page: 1,size:50};
     
   
    search(){
        
        this.error = {};

        if (!this.date || this.date == "Invalid Date")
            this.error.date = "Tanggal harus diisi";


        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            this.info.page = 1;
            this.searching();
        }
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };
    
    searching() {
     
    var args = {
            page: this.info.page,
            size: this.info.size,
            date  : this.date ? moment(this.date ).format("YYYY-MM-DD") : ""
             
        }
        this.service.search(args)
     
            .then(result => {
               this.data=result.data;
                   
            });
           
    }
    

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }
      reset() {
        this.date = "";
        
        this.info.page = 1;
    }

    ExportToExcel() {
        this.error = {};

        if (!this.dateTo || this.dateTo == "Invalid Date")
            this.error.dateTo = "Tanggal Akhir harus diisi";

        if (!this.dateFrom || this.dateFrom == "Invalid Date")
            this.error.dateFrom = "Tanggal Awal harus diisi";


        if (Object.getOwnPropertyNames(this.error).length === 0) {
            var info = {
                date  : this.date ? moment(this.date ).format("YYYY-MM-DD") : ""
            }
            this.service.generateExcel(info);
        }
    }
}