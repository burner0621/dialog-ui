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
        var info = {
            dateFrom : this.dateFrom,
            dateTo : this.dateTo,
        }
 
        this.service.search(JSON.stringify(info))
            .then(result => {
                this.data = result;
                console.log(result);
                var dataByUOM = {};
                var subTotalUoM = {};
                var subTotalUoM1 = {};
                var subTotalUoM2 = {};
                var subTotalUoM3 = {};
                
                  for (var data of result) {
                       var BdgtUOM = data.UOMUnit;
                        if (!dataByUOM[BdgtUOM]) dataByUOM[BdgtUOM] = [];                 
                            dataByUOM[BdgtUOM].push({         
                            ComodityCode : data.ComodityCode,
                            ComodityName : data.ComodityName,
                            Quantity : data.Quantity.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                            UOMUnit : data.UOMUnit,
                            Amount : data.Amount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),  
                            ProfitUSD : data.ProfitUSD.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),  
                            ProfitIDR : data.ProfitIDR.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),  
                            ProfitFOB : data.ProfitFOB.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                                           
                        });
                    
                        if (!subTotalUoM[BdgtUOM]) {
                           subTotalUoM[BdgtUOM] = 0;
                           } 
                           subTotalUoM[BdgtUOM] += data.Amount;

                        if (!subTotalUoM1[BdgtUOM]) {
                            subTotalUoM1[BdgtUOM] = 0;
                            } 
                            subTotalUoM1[BdgtUOM] += data.ProfitUSD;                           

                        if (!subTotalUoM2[BdgtUOM]) {
                            subTotalUoM2[BdgtUOM] = 0;
                            } 
                            subTotalUoM2[BdgtUOM] += data.ProfitIDR;                           

                        if (!subTotalUoM3[BdgtUOM]) {
                                subTotalUoM3[BdgtUOM] = 0;
                                } 
                            subTotalUoM3[BdgtUOM] += data.ProfitFOB;                           
                        }    

               var BdgtUOMs = [];
               this.AmountTotal = 0;
               this.AmountTotal1 = 0;
               this.AmountTotal2 = 0;
               this.AmountTotal3 = 0;
                   
               for (var data in dataByUOM) {
                   BdgtUOMs.push({
                   data: dataByUOM[data],
                   UoM: dataByUOM[data][0].UOMUNit,
                   subTotal: (subTotalUoM[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal1: (subTotalUoM1[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal2: (subTotalUoM2[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal3: (subTotalUoM3[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                   
                });
                   this.AmountTotal += subTotalUoM[data];                                     
                   this.AmountTotal1 += subTotalUoM1[data];                                     
                   this.AmountTotal2 += subTotalUoM2[data];                                     
                   this.AmountTotal3 += subTotalUoM3[data];                                                        
               }
               
               this.AmountTotal = this.AmountTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.AmountTotal1 = this.AmountTotal1.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.AmountTotal2 = this.AmountTotal2.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.AmountTotal3 = this.AmountTotal3.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.BdgtUOMs = BdgtUOMs;

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
        this.BdgtUOMs = [];
        this.AmountTotal = null;   
        this.AmountTotal1 = null;   
        this.AmountTotal2 = null;   
        this.AmountTotal3 = null;    
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;
    } 
}