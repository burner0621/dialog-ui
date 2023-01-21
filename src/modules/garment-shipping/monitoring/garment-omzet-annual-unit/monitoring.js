import { inject } from 'aurelia-framework'
import { Service } from "./service";
import numeral from 'numeral';

@inject(Service)
export class Monitoring {
    constructor(service) {
        this.service = service;
    }

    controlOptions = {
        label: { length: 4 },
        control: { length: 3 }
    }

    yearOptions = [];

    get filter() {
        return {
            year: this.selectedYear
        };
    }

    bind() {
        const now = new Date();

        const selectedYear = now.getFullYear();
        for (let i = selectedYear - 5; i <= selectedYear + 5; i++) {
            this.yearOptions.push(i.toString());
        }
        this.selectedYear = selectedYear.toString();
    }

    // search() {
    //     const arg = Object.assign({}, this.filter);
    //     this.service.search(arg)
    //             .then(result => {
    //                 this.data = result.data;
    //             });
    // }

    // xls() {
    //     this.service.xls(this.filter);
    // }

    reset() {
        const now = new Date();

        this.selectedYear = now.getFullYear().toString();

        this.data = {};
    }

    searching() {    
        {
         var info = {
                 year : this.selectedYear ? this.selectedYear : "",
               }
             
                 this.service.search(info)
                     .then(result => {
                         this.data = result;   
                         console.log(result);                
                         var dataByInvoice = {};
                         var subTotalInv1 = {};
                         var subTotalInv2 = {};
                         var subTotalInv3 = {};
                         var subTotalInv4 = {};
                         var subTotalInv5 = {};
                         var subTotalInv6 = {};
                         var subTotalInv7 = {};
                         var subTotalInv8 = {};
                         var subTotalInv9 = {};
                         var subTotalInv10 = {};                         
                         
                         for (var data of result) {
                             var Invoice = data.month;
                              if (!dataByInvoice[Invoice]) dataByInvoice[Invoice] = [];                 
                                  dataByInvoice[Invoice].push({   
     
                                  monthName : data.monthName,
                                  amount1 : data.amount1.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                                  amount1IDR : data.amount1IDR.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                                  amount2 : data.amount2.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                                  amount2IDR : data.amount2IDR.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                                  amount3 : data.amount3.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                                  amount3IDR : data.amount3IDR.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                                  amount4 : data.amount4.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                                  amount4IDR : data.amount4IDR.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                                  amount5 : data.amount5.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                                  amount5IDR : data.amount5IDR.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),       
     
                              });
                                     
                                 if (!subTotalInv1[Invoice]) {
                                    subTotalInv1[Invoice] = 0;
                                 } 
                                    subTotalInv1[Invoice] += data.amount1;
     
                                 if (!subTotalInv2[Invoice]) {
                                     subTotalInv2[Invoice] = 0;
                                  } 
                                     subTotalInv2[Invoice] += data.amount1IDR;
                                  
                                 if (!subTotalInv3[Invoice]) {
                                    subTotalInv3[Invoice] = 0;
                                 } 
                                    subTotalInv3[Invoice] += data.amount2;
                                    
                                 if (!subTotalInv4[Invoice]) {
                                     subTotalInv4[Invoice] = 0;
                                 } 
                                     subTotalInv4[Invoice] += data.amount2IDR;

                                if (!subTotalInv5[Invoice]) {
                                        subTotalInv5[Invoice] = 0;
                                } 
                                    subTotalInv5[Invoice] += data.amount3;
                                        
                                if (!subTotalInv6[Invoice]) {
                                    subTotalInv6[Invoice] = 0;
                                } 
                                    subTotalInv6[Invoice] += data.amount3IDR;  
                                    
                                if (!subTotalInv7[Invoice]) {
                                        subTotalInv7[Invoice] = 0;
                                } 
                                    subTotalInv7[Invoice] += data.amount4;
                                        
                                if (!subTotalInv8[Invoice]) {
                                    subTotalInv8[Invoice] = 0;
                                } 
                                    subTotalInv8[Invoice] += data.amount4IDR;  
                                    
                                if (!subTotalInv9[Invoice]) {
                                        subTotalInv9[Invoice] = 0;
                                } 
                                    subTotalInv9[Invoice] += data.amount5;
                                        
                                if (!subTotalInv10[Invoice]) {
                                    subTotalInv10[Invoice] = 0;
                                } 
                                    subTotalInv10[Invoice] += data.amount5IDR;                                      
                             }
           
                     var invoices = [];
                     this.AmountTtlUSD1 = 0;
                     this.AmountTtlIDR1 = 0;
                     this.AmountTtlUSD2 = 0;
                     this.AmountTtlIDR2 = 0;
                     this.AmountTtlUSD3 = 0;
                     this.AmountTtlIDR3 = 0;
                     this.AmountTtlUSD4 = 0;
                     this.AmountTtlIDR4 = 0;
                     this.AmountTtlUSD5 = 0;
                     this.AmountTtlIDR5 = 0;

                     this.AvgTtlUSD1 = 0;
                     this.AvgTtlIDR1 = 0;
                     this.AvgTtlUSD2 = 0;
                     this.AvgTtlIDR2 = 0;
                     this.AvgTtlUSD3 = 0;
                     this.AvgTtlIDR3 = 0;
                     this.AvgTtlUSD4 = 0;
                     this.AvgTtlIDR4 = 0;
                     this.AvgTtlUSD5 = 0;
                     this.AvgTtlIDR5 = 0;

                     for (var data in dataByInvoice) {
                         invoices.push({
                         data: dataByInvoice[data],
                         month1: dataByInvoice[data][0].month,
                         month2: dataByInvoice[data][0].monthName,                         
                        //  subTotal: (subTotalInv1[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        //  subTotal1: (subTotalInv2[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                   
                        //  subTotal2: (subTotalInv3[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                                   
                        //  subTotal3: (subTotalInv4[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                                                       
                     });
                         this.AmountTtlUSD1 += subTotalInv1[data];   
                         this.AmountTtlIDR1 += subTotalInv2[data]; 
                         this.AmountTtlUSD2 += subTotalInv3[data];   
                         this.AmountTtlIDR2 += subTotalInv4[data]; 
                         this.AmountTtlUSD3 += subTotalInv5[data];   
                         this.AmountTtlIDR3 += subTotalInv6[data]; 
                         this.AmountTtlUSD4 += subTotalInv7[data];   
                         this.AmountTtlIDR4 += subTotalInv8[data]; 
                         this.AmountTtlUSD5 += subTotalInv9[data];   
                         this.AmountTtlIDR5 += subTotalInv10[data]; 

                         this.AvgTtlUSD1 += (subTotalInv1[data]/12);
                         this.AvgTtlIDR1 += (subTotalInv2[data]/12);
                         this.AvgTtlUSD2 += (subTotalInv3[data]/12);
                         this.AvgTtlIDR2 += (subTotalInv4[data]/12);
                         this.AvgTtlUSD3 += (subTotalInv5[data]/12);
                         this.AvgTtlIDR3 += (subTotalInv6[data]/12);
                         this.AvgTtlUSD4 += (subTotalInv7[data]/12);
                         this.AvgTtlIDR4 += (subTotalInv8[data]/12);
                         this.AvgTtlUSD5 += (subTotalInv9[data]/12);
                         this.AvgTtlIDR5 += (subTotalInv10[data]/12);                         
                     }
                     
                      
                     this.AmountTtlUSD1 = this.AmountTtlUSD1.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                     this.AmountTtlIDR1 = this.AmountTtlIDR1.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                     this.AmountTtlUSD2 = this.AmountTtlUSD2.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                     this.AmountTtlIDR2 = this.AmountTtlIDR2.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                     this.AmountTtlUSD3 = this.AmountTtlUSD3.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                     this.AmountTtlIDR3 = this.AmountTtlIDR3.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                     this.AmountTtlUSD4 = this.AmountTtlUSD4.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                     this.AmountTtlIDR4 = this.AmountTtlIDR4.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                     this.AmountTtlUSD5 = this.AmountTtlUSD5.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                     this.AmountTtlIDR5 = this.AmountTtlIDR5.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                     this.AvgTtlUSD1 = this.AvgTtlUSD1.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                     this.AvgTtlIDR1 = this.AvgTtlIDR1.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                     this.AvgTtlUSD2 = this.AvgTtlUSD2.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                     this.AvgTtlIDR2 = this.AvgTtlIDR2.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                     this.AvgTtlUSD3 = this.AvgTtlUSD3.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                     this.AvgTtlIDR3 = this.AvgTtlIDR3.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                     this.AvgTtlUSD4 = this.AvgTtlUSD4.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                     this.AvgTtlIDR4 = this.AvgTtlIDR4.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                     this.AvgTtlUSD5 = this.AvgTtlUSD5.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                     this.AvgTtlIDR5 = this.AvgTtlIDR5.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });      

                     this.invoices = invoices;
                     });
                 }               
         }
     
    ExportToExcel() {
        {
        var info = {
            year : this.selectedYear ? this.selectedYear : "",
            }
     
        this.service.xls(info)
            .catch(e => {
                alert(e.replace(e, "Error: ",""))
            });
        }
    }
}