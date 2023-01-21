import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
   
    dateFrom = null;
    dateTo = null;
      
    activate() {
       
    }

    searching() {
        console.log(this.sectioncode)
        var info = {
            dateFrom : this.dateFrom,
            dateTo : this.dateTo,
        }

        this.service.search(JSON.stringify(info))
            .then(result => {
                  this.data = result;
                  console.log(result);
 
                  var datas = [];
                  for (var item of this.data){

                    item.DeliveryDate=moment(item.DeliveryDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(item.DeliveryDate).format("DD MMM YYYY");                    
                    item.ValidatedDate=moment(item.ValidatedDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(item.ValidatedDate).format("DD MMM YYYY");                    
              
                    item.Quantity=item.Quantity.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    item.BudgetQuantity=item.BudgetQuantity.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                             
                    datas.push(item);
                }
                this.data = datas;
    
               });        
    }
          
    ExportToExcel() {
        var info = {
            dateFrom : this.dateFrom,
            dateTo : this.dateTo,
        }
        
        this.service.generateExcel(JSON.stringify(info));
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.data = [];
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;
    } 
}