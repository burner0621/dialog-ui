import { inject } from 'aurelia-framework'
import { Service } from "./service";
import numeral from 'numeral';

@inject(Service)
export class Monitoring {
    constructor(service) {
        this.service = service;

        const moment = require('moment');
        moment.locale('id');

        this.currentYear = moment().year();
   
        this.filterYear = this.currentYear;
   
        this.yearOptions = {
            min: this.currentYear - 50,
            max: this.currentYear + 50
        }
    }

    controlOptions = {
        label: { length: 4 },
        control: { length: 3 }
    }

    searching() {
        {
        var info = {
            year : this.filterYear,           
        }

         this.service.search(info)
            .then(result => {
                  this.data = result.data;
                  console.log(result);
                  var dataByBuyer = {};
                  var subTotalBuyer = {};
                  var subTotalBuyer1 = {};
                  var subTotalBuyer2 = {};
                  
                  for (var data of result.data) {
                       var Buyer = data.buyerName;
                        if (!dataByBuyer[Buyer]) dataByBuyer[Buyer] = [];                 
                            dataByBuyer[Buyer].push({                            
                         
                            buyerName : data.buyerName,
                            comodityName : data.comodityName,
                            pcsQuantity : data.pcsQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                            setsQuantity : data.setsQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                            amount : data.amount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                            
                        });
                        
                        if (!subTotalBuyer[Buyer]){
                           subTotalBuyer[Buyer] = 0;
                           } 
                           subTotalBuyer[Buyer] += data.pcsQuantity;

                        if (!subTotalBuyer1[Buyer]) {
                           subTotalBuyer1[Buyer] = 0;
                           } 
                           subTotalBuyer1[Buyer] += data.setsQuantity;
                           
                        if (!subTotalBuyer2[Buyer]) {
                            subTotalBuyer2[Buyer] = 0;
                            } 
                            subTotalBuyer2[Buyer] += data.amount;
                    
                }
     
               var buyers = [];
               this.TotPcs = 0;
               this.TotSets = 0;
               this.TotAmount = 0;
               console.log(dataByBuyer);
                
               for (var data in dataByBuyer) {
                   buyers.push({
                   data: dataByBuyer[data],
                   buyer: dataByBuyer[data][0].buyerName,
                   subTotal: (subTotalBuyer[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal1: (subTotalBuyer1[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal2: (subTotalBuyer2[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),

                 });
                   this.TotPcs += subTotalBuyer[data];
                   this.TotSets += subTotalBuyer1[data]; 
                   this.TotAmount += subTotalBuyer2[data];                      
               }
               this.TotPcs = this.TotPcs.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.TotSets = this.TotSets.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.TotAmount = this.TotAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.buyers = buyers;
              
             });                
        }   
    }


    reset() {
        const now = new Date();

        this.selectedYear = now.getFullYear().toString();

        this.listDataFlag = false;
        this.buyers = [];
        this.TotPcs = null;            
        this.TotSets = null; 
        this.TotAmount = null; 
    }

    ExportToExcel() {
        {
            var info = {
                year : this.filterYear, 
            }

        this.service.generateExcel(info)
            .catch(e => {
                alert(e.replace(e, "Error: ",""))
            });
        }
    }
}