import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require('moment');

@inject(Router, Service)
export class Create {

    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }

    info = { page: 1,size:25};

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };

    activate() {
       
    }
   
    BackToList() {
        this.router.navigateToRoute('list');        
    }

    ExportToExcel() {
        {
        var info = {            
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
            };
        
        this.service.generateExcel(info)
        .catch(e => {
            alert(e.replace(e, "Error: ",""))
        });
    }
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);
        this.dateMin = moment(_startDate).format("YYYY-MM-DD");

        if (_startDate > _endDate || !this.dateTo) {
            this.dateTo = e.srcElement.value;
        }
    }
}