import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
  constructor(router, service) {
        this.service = service;
        this.router = router;
        this.units = this.units.map(unit => {
            unit.toString = function () {
                return this.name;
            }
            return unit;
        })
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
     
    units = [
        {
            "name": "All",
            "value": 0
        },
        {
            "name": "KONF 2A/EX.K1",
            "value": 1
        }, {
            "name": "KONF 2B/EX.K2",
            "value": 2
        }, {
            "name": "KONF 2C/EX.K3",
            "value": 3
        }, {
            "name": "KONF 1A/EX.K4",
            "value": 4
        }, {
            "name": "KONF 1B/EX.2D",
            "value": 5
        }];


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
            unit : this.unit.value,
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.search(args)
     
            .then(result => {
               this.info.total=result.info.total;    
               this.data=result.data;
               
            });
            
    }

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }
      reset() {
        this.type = "";
        this.dateFrom = "";
        this.dateTo = "";
        
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
                unit : this.unit.value,
                dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
            }
            this.service.generateExcel(info);
        }
    }
    
}