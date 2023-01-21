import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
var DivisionLoader = require('../../../../../loader/division-loader');

@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }


    activate(params) {
        if (params.dateFrom != null || params.dateTo != null || params.divisi != null) {
            this.dateFrom = params.dateFrom;
           this.dateTo = params.dateTo;
             this.divisiId = params.divisiId;
         
        var counttotals=0;
          
            var data = [];
           
        
  var uri = this.service.getDataStaff( this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD"): "",this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD"): "", this.divisiId ? this.divisiId : "");
           
            uri.then(data => {
                this.data = data;
               
  for (var scount of data) {
                 counttotals += scount.jumpr;
             }
             this.counttotals = counttotals;   
                }
                
            )
             

        }
     
        
    }

    searching() {
        var data = [];
        var uri = "";
      
         var counttotals=0;
            uri = this.service.getDataStaff( this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD"): "",this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD"): "", this.divisi ? this.divisi.Id : "");

        uri.then(data => {
            this.data = data;

        for (var scount of data) {
                 counttotals += scount.jumpr;
             }
             this.counttotals = counttotals;   
        })
        
    }



       view(data, dateFrom, dateTo) {
        var info = {
            staff : data.user ? data.user: "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD"): "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD"): "",
            divisi : this.divisi ? this.divisi.Id : this.divisiId ? this.divisiId : "" ,
        }
        this.router.navigateToRoute('view', { id: data.user,user: data.user,info: info});
     }




    reset() {
        this.dateFrom = "";
        this.dateTo ="";
        this.divisi = "";
    }


    get divisionLoader() {
        return DivisionLoader;
    }

     divisionView = (division) => {
        return `${division.Name}`;
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);


        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    }
}