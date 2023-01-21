import { inject, bindable } from 'aurelia-framework'
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");

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
        {
        var info = {
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }

         this.service.search(info)
            .then(result => {
                  this.data = result;
                  console.log(result);
                  var dataByBuyer = {};
                  var subTotalBuyer = {};
                  var subTotalBuyer1 = {};
                  var subTotalBuyer2 = {};
                  var subTotalBuyer3 = {};
                                    
                  for (var data of result) {
                       var Buyer = data.lsNo;
                        if (!dataByBuyer[Buyer]) dataByBuyer[Buyer] = [];                 
                            dataByBuyer[Buyer].push({                            
                         
                            buyerCode : data.buyerCode,
                            buyerName : data.buyerName,
                            kaberType : data.kaberType,
                            productCode : data.productCode,
                            transactionName : data.transactionName,
                            dispoNo : data.dispoNo,
                            bcNo : data.bcNo,
                            productName : data.productName,
                            tempo : data.tempo,
                            quantity : data.quantity.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                            uomUnit : data.uomUnit,
                            lsNo : data.lsNo,
                            useVat : data.useVat,
                            lsDate : moment(data.lsDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.lsDate).format("DD MMM YYYY"),
                            dpp : data.dpp.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                            ppn : data.ppn.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                            total : data.total.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        });
                        
                        if (!subTotalBuyer[Buyer]){
                           subTotalBuyer[Buyer] = 0;
                           } 
                           subTotalBuyer[Buyer] += data.dpp;


                        if (!subTotalBuyer1[Buyer]) {
                           subTotalBuyer1[Buyer] = 0;
                           } 
                           subTotalBuyer1[Buyer] += data.ppn;
                           
                        if (!subTotalBuyer2[Buyer]) {
                            subTotalBuyer2[Buyer] = 0;
                            } 
                            subTotalBuyer2[Buyer] += data.total;  
                            
                        if (!subTotalBuyer3[Buyer]) {
                                subTotalBuyer3[Buyer] = 0;
                            } 
                            subTotalBuyer3[Buyer] += data.quantity;     
                }
     
               var buyers = [];
               this.TotDPP = 0;
               this.TotPPN = 0;
               this.TotAmt = 0;
               this.TotQty = 0;
                
               for (var data in dataByBuyer) {
                   buyers.push({
                   data: dataByBuyer[data],
                   buyer: dataByBuyer[data][0].lsNo,
                   subTotal: (subTotalBuyer[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal1: (subTotalBuyer1[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal2: (subTotalBuyer2[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                   
                   subTotal3: (subTotalBuyer3[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                                      
                 });
                   this.TotDPP += subTotalBuyer[data];
                   this.TotPPN += subTotalBuyer1[data];  
                   this.TotAmt += subTotalBuyer2[data];  
                   this.TotQty += subTotalBuyer3[data]; 
               }
               this.TotDPP = this.TotDPP.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.TotPPN = this.TotPPN.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.TotAmt = this.TotAmt.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.TotQty = this.TotQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });              
               this.buyers = buyers;
             });   
        }   
    }

    ExportToExcel() {
        {
            var info = {
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
        this.buyers = [];
        this.TotDPP = null;            
        this.TotPPN = null; 
        this.TotAmt = null;   
        this.TotQty = null;          
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 
}