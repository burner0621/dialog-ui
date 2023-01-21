import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var ProductLoader = require('../../../loader/product-purchasing-loader');

@inject(Router, Service)
export class List {
  constructor(router, service) {
        this.service = service;
        this.router = router;
    }
    
    info = { page: 1,size:50};

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };

  get productLoader() {
      return ProductLoader;
  }
 
    search(){
         this.error = {};

        if (!this.dateTo || this.dateTo == "Invalid Date")
            this.error.dateTo = "Tanggal Akhir harus diisi";

        if (!this.dateFrom || this.dateFrom == "Invalid Date")
            this.error.dateFrom = "Tanggal Awal harus diisi";

        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            this.info.page = 1;
            this.info.total=0;
            this.searching();
        }
    }

    searching() {
     
    var args = {
            page: this.info.page,
            size: this.info.size,
            product : this.product ? this.product.Id : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.search(args)
              .then(result => {
               this.data=result.data;  
               for (var item of this.data){
                    item.InvoiceDate=moment(item.InvoiceDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(item.InvoiceDate).format("DD MMM YYYY");
                  }
            });
    }

    ExportToExcel() {
        this.error = {};

        if (!this.dateTo || this.dateTo == "Invalid Date")
            this.error.dateTo = "Tanggal Akhir harus diisi";

        if (!this.dateFrom || this.dateFrom == "Invalid Date")
            this.error.dateFrom = "Tanggal Awal harus diisi";


        if (Object.getOwnPropertyNames(this.error).length === 0) {
            var info = {
                product : this.product ? this.product.Id : "",
                dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
            }
            this.service.generateExcel(info);
        }
    }
 
    changePage(e) {
        var page = e.detail;
        console.log(page); 
        this.info.page = page;
        this.search();
    }
    
    reset() {
        this.product = "";
        this.dateFrom = "";
        this.dateTo = "";
        this.info.page = 1;
        this.data = [];
    }

    
}