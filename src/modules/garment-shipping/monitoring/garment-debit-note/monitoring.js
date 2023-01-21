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
    dateFrom = null;
    dateTo = null;
   
    get garmentbuyerLoader() {
        return GarmentBuyerLoader;
    }

    buyerAgentView = (buyerAgent) => {
        return `${buyerAgent.Code} - ${buyerAgent.Name}`
    }

    activate() {
       
    }

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
                  var dataByBuyer = {};
                  var subTotalBuyer = {};
                 
                  for (var data of result) {
                       var Buyer = data.buyerName;
                        if (!dataByBuyer[Buyer]) dataByBuyer[Buyer] = [];                 
                            dataByBuyer[Buyer].push({                                                    
                            buyerCode : data.buyerCode,
                            buyerName : data.buyerName,
                            dnNo : data.dnNo,
                            dnDate : moment(data.dnDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.dnDate).format("DD MMM YYYY"),                 
                            description : data.description,
                            currencyCode : data.currencyCode,                            
                            amount : data.amount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        });
                        
                        if (!subTotalBuyer[Buyer]){
                           subTotalBuyer[Buyer] = 0;
                           } 
                           subTotalBuyer[Buyer] += data.amount;
                }
     
               var buyers = [];
               this.TotAmount = 0;
                
               for (var data in dataByBuyer) {
                   buyers.push({
                   data: dataByBuyer[data],
                   buyer: dataByBuyer[data][0].buyerName,
                   subTotal: (subTotalBuyer[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                });
                   this.TotAmount += subTotalBuyer[data];
               }
               this.TotAmount = this.TotAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.buyers = buyers;
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
        this.buyers = [];
        this.TotAmount = null;            
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;
    } 
}