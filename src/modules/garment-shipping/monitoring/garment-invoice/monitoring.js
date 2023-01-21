import { inject, bindable } from 'aurelia-framework'
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
const GarmentBuyerLoader = require('../../../../loader/garment-buyers-loader');

@inject(Router, Service)
export class List {
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    
    buyerAgent = null;
    optionDate = "";
    dateFrom = null;
    dateTo = null;
   
    // @bindable JnsInv;
   
    // OptionDate = ['','TGL INVOICE', 'TGL TRUCKING', 'TGL PEB'];

    get garmentbuyerLoader() {
        return GarmentBuyerLoader;
    }

    buyerAgentView = (buyerAgent) => {
        return `${buyerAgent.Code} - ${buyerAgent.Name}`
    }

    activate() {
       
    }

    // JnsInvChanged(newvalue) {
    //     if (newvalue) {
    //         if (newvalue === "TGL INVOICE") {
    //             this.optionDate = "TGL INVOICE";
    //         }
    //         else if (newvalue === "TGL TRUCKING") {
    //             this.optionDate = "TGL TRUCKING";
    //         }
    //         else {
    //             this.optionDate = "TGL PEB"; 
    //         }
    //     }
    // }

    searching() {
        {
        var info = {
            buyerAgent : this.buyerAgent ? this.buyerAgent.Code : "",          
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }

         this.service.search(info)
            .then(result => {
                  this.data = result;
                  console.log(result);
                  var datas = [];
                  for (var item of this.data){
                      item.invoiceDate=moment(item.invoiceDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(item.invoiceDate).format("DD MMM YYYY");
                      item.truckingDate=moment(item.truckingDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(item.truckingDate).format("DD MMM YYYY");                    
                      item.sailingDate=moment(item.sailingDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(item.sailingDate).format("DD MMM YYYY");
                      item.pebDate=moment(item.pebDate).format("DD MMM YYYY")=="01 Jan 0001" ? "-" : moment(item.pebDate).format("DD MMM YYYY");                    
                      item.caDate=moment(item.caDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(item.caDate).format("DD MMM YYYY");
                      item.paymentDate=moment(item.paymentDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(item.paymentDate).format("DD MMM YYYY");
              
                      item.amount=item.amount.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                      item.toBePaid=item.toBePaid.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                      item.amountPaid=item.amountPaid.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
 
                      datas.push(item);
                  }
                  this.data = datas;
             });   
        }   
    }

    ExportToExcel() {
        {
            var info = {
                buyerAgent : this.buyerAgent ? this.buyerAgent.Code : "",               
                dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
            }

        this.service.generateExcel(info)
            .catch(e => {
                alert(e.replace(e, "Error: ",""))
            });
        }
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.buyerAgent = null;
        this.optionDate = null; 
        this.data = []; 
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 
}