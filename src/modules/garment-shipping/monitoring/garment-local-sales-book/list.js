import { inject, bindable } from 'aurelia-framework';
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
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
        }
        this.service.search(info)
            .then(result => {
                  this.data = result.item1;
                  console.log(result);
                  var dataBySupplier = {};
                  var subTotalSupplier1 = {};
                  var subTotalSupplier2 = {};
                  var subTotalSupplier3 = {};
                  var subTotalSupplier4 = {};
                  var subTotalSupplier5 = {}; 
                  var subTotalSupplier6 = {};
                  var subTotalSupplier7 = {};
                  var subTotalSupplier8 = {};
                  var subTotalSupplier9 = {};
                  var subTotalSupplier10 = {}; 
                  var subTotalSupplier11 = {};
                  var subTotalSupplier12 = {};
                  var subTotalSupplier13 = {}; 
                  var subTotalSupplier14 = {};
                  var subTotalSupplier15 = {}; 

                  for (var data of result.item1) {
                       var Supplier = data.transactionType;
                       let AmountA = 0,AmountB = 0,AmountC = 0,Quantity1 = 0,Quantity2 = 0,Quantity3 = 0,Quantity4 = 0,Quantity5 = 0, Amount1 = 0,Amount2 = 0,Amount3 = 0,Amount4 = 0,Amount5 = 0;

                        switch ( data.transactionCode) {
                        case 'LBJ' :
                            AmountA = data.nettAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            AmountB = data.salesAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            AmountC = data.ppnAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                            Quantity1 = data.qtyTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            Quantity2 = 0;
                            Quantity3 = 0;
                            Quantity4 = 0;
                            Quantity5 = 0;
                            
                            Amount1 = data.salesAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            Amount2 = 0;
                            Amount3 = 0;
                            Amount4 = 0;
                            Amount5 = 0;
                            break;

                        case 'LBL' :
                            AmountA = data.nettAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            AmountB = data.salesAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            AmountC = data.ppnAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                            Quantity1 = 0;
                            Quantity2 = data.qtyTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            Quantity3 = 0;
                            Quantity4 = 0;
                            Quantity5 = 0;
                                
                            Amount1 = 0;
                            Amount2 = data.salesAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            Amount3 = 0;
                            Amount4 = 0;
                            Amount5 = 0;
                            break;                            

                        case 'LBM' :
                            AmountA = data.nettAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            AmountB = data.salesAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            AmountC = data.ppnAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        
                            Quantity1 = 0;
                            Quantity2 = data.qtyTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            Quantity3 = 0;
                            Quantity4 = 0;
                            Quantity5 = 0;
                                    
                            Amount1 = 0;
                            Amount2 = data.salesAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            Amount3 = 0;
                            Amount4 = 0;
                            Amount5 = 0;
                            break;

                        case 'LJS' :
                            AmountA = data.nettAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            AmountB = data.salesAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            AmountC = data.ppnAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            
                            Quantity1 = 0;
                            Quantity2 = 0;
                            Quantity3 = data.qtyTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            Quantity4 = 0;
                            Quantity5 = 0;
                                        
                            Amount1 = 0;
                            Amount2 = 0;
                            Amount3 = data.salesAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            Amount4 = 0;
                            Amount5 = 0;
                            break;

                        case 'SBJ' :
                            AmountA = data.nettAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            AmountB = data.salesAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            AmountC = data.ppnAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                
                            Quantity1 = 0;
                            Quantity2 = 0;
                            Quantity3 = 0;
                            Quantity4 = data.qtyTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            Quantity5 = 0;
                                            
                            Amount1 = 0;
                            Amount2 = 0;
                            Amount3 = 0;
                            Amount4 = data.salesAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            Amount5 = 0;
                            break;

                        case 'SMR' :

                            AmountA = data.nettAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            AmountB = data.salesAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            AmountC = data.ppnAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                            Quantity1 = 0;
                            Quantity2 = 0;
                            Quantity3 = 0;
                            Quantity4 = 0;
                            Quantity5 = data.qtyTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                            
                            Amount1 = 0;
                            Amount2 = 0;
                            Amount3 = 0;
                            Amount4 = 0;
                            Amount5 = data.salesAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            break;

                        default:

                            AmountA = 0;
                            AmountB = 0;
                            AmountC = 0;

                            Quantity1 = 0;
                            Quantity2 = 0;
                            Quantity3 = 0;
                            Quantity4 = 0;
                            Quantity5 = 0;
                                            
                            Amount1 = 0;
                            Amount2 = 0;
                            Amount3 = 0;
                            Amount4 = 0;
                            Amount5 = 0;
                            break;

                        }      
                     
                        if (!dataBySupplier[Supplier]) dataBySupplier[Supplier] = [];                 
                            dataBySupplier[Supplier].push({                            
                            
                            lsDate : moment(data.lsDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(data.lsDate).format("DD MMM YYYY"),                      
                            clDate : moment(data.clDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(data.clDate).format("DD MMM YYYY"),                                                 
                            lsNo : data.lsNo,
                            buyerCode : data.buyerCode,
                            buyerName : data.buyerName, 
                            transactionCode : data.transactionCode,
                            transactionType : data.transactionType,                           
                            netAmt : AmountA,
                            slsAmt : AmountB,
                            ppnAmt : AmountC,
                            qty1 : Quantity1,
                            qty2 : Quantity2,
                            qty3 : Quantity3,
                            qty4 : Quantity4,
                            qty5 : Quantity5,

                            amt1 : Amount1,
                            amt2 : Amount2,
                            amt3 : Amount3,
                            amt4 : Amount4,
                            amt5 : Amount5,
                    
                        });
                    
                        if (!subTotalSupplier1[Supplier]) {
                           subTotalSupplier1[Supplier] = 0;
                          } 

                        if (!subTotalSupplier2[Supplier]) {
                           subTotalSupplier2[Supplier] = 0;
                          } 
   
                        if (!subTotalSupplier3[Supplier]) {
                           subTotalSupplier3[Supplier] = 0;
                          } 

                        if (!subTotalSupplier4[Supplier]) {
                           subTotalSupplier4[Supplier] = 0;
                          } 

                        if (!subTotalSupplier5[Supplier]) {
                            subTotalSupplier5[Supplier] = 0;
                           } 

                        if (!subTotalSupplier6[Supplier]) {
                            subTotalSupplier6[Supplier] = 0;
                           } 
 
                         if (!subTotalSupplier7[Supplier]) {
                            subTotalSupplier7[Supplier] = 0;
                           } 
    
                         if (!subTotalSupplier8[Supplier]) {
                            subTotalSupplier8[Supplier] = 0;
                           } 
 
                         if (!subTotalSupplier9[Supplier]) {
                            subTotalSupplier9[Supplier] = 0;
                           } 
 
                         if (!subTotalSupplier10[Supplier]) {
                             subTotalSupplier10[Supplier] = 0;
                            } 

                         if (!subTotalSupplier11[Supplier]) {
                             subTotalSupplier11[Supplier] = 0;
                            } 
     
                         if (!subTotalSupplier12[Supplier]) {
                             subTotalSupplier12[Supplier] = 0;
                            } 
      
                         if (!subTotalSupplier13[Supplier]) {
                             subTotalSupplier13[Supplier] = 0;
                            } 

                         if (!subTotalSupplier13[Supplier]) {
                             subTotalSupplier13[Supplier] = 0;
                            } 

                         if (!subTotalSupplier13[Supplier]) {
                             subTotalSupplier13[Supplier] = 0;
                            } 
        
                        switch (data.transactionCode) {
                        case 'LBJ' :
                            subTotalSupplier4[Supplier] += data.qtyTotal;
                            subTotalSupplier5[Supplier] += data.salesAmount;
                            break;
                        case 'LBL' || 'LBM' :
                            subTotalSupplier6[Supplier] += data.qtyTotal;
                            subTotalSupplier7[Supplier] += data.salesAmount;
                            break;
                        case 'LJS' :
                            subTotalSupplier8[Supplier] += data.qtyTotal;
                            subTotalSupplier9[Supplier] += data.salesAmount;
                            break;
                        case 'SBJ' :
                            subTotalSupplier10[Supplier] += data.qtyTotal;
                            subTotalSupplier11[Supplier] += data.salesAmount;
                            break;
                        case 'SMR' :
                            subTotalSupplier12[Supplier] += data.qtyTotal;
                            subTotalSupplier13[Supplier] += data.salesAmount;
                            break;
                        default:
                            subTotalSupplier14[Supplier] == 0;
                            subTotalSupplier15[Supplier] += 0;
                            break;
                        }      

                        subTotalSupplier1[Supplier] += data.nettAmount;
                        subTotalSupplier2[Supplier] += data.salesAmount;
                        subTotalSupplier3[Supplier] += data.ppnAmount;      
                }
     
               var suppliers = [];
               this.AmountTotal1 = 0;
               this.AmountTotal2 = 0;
               this.AmountTotal3 = 0;
               this.AmountTotal4 = 0;
               this.AmountTotal5 = 0; 
               this.AmountTotal6 = 0;
               this.AmountTotal7 = 0;
               this.AmountTotal8 = 0;
               this.AmountTotal9 = 0;
               this.AmountTotal10 = 0; 
               this.AmountTotal11 = 0;
               this.AmountTotal12 = 0;
               this.AmountTotal13 = 0;
                
               for (var data in dataBySupplier) {
                   suppliers.push({
                   data: dataBySupplier[data],
                   supplier: dataBySupplier[data][0].transactionType,
                   subTotal1: (subTotalSupplier1[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal2: (subTotalSupplier2[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal3: (subTotalSupplier3[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal4: (subTotalSupplier4[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),               
                   subTotal5: (subTotalSupplier5[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),  
                   subTotal6: (subTotalSupplier6[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal7: (subTotalSupplier7[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal8: (subTotalSupplier8[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal9: (subTotalSupplier9[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),               
                   subTotal10: (subTotalSupplier10[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),  
                   subTotal11: (subTotalSupplier11[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal12: (subTotalSupplier12[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal13: (subTotalSupplier13[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
             });
                   this.AmountTotal1 += subTotalSupplier1[data];
                   this.AmountTotal2 += subTotalSupplier2[data];
                   this.AmountTotal3 += subTotalSupplier3[data];
                   this.AmountTotal4 += subTotalSupplier4[data];
                   this.AmountTotal5 += subTotalSupplier5[data];   
                   this.AmountTotal6 += subTotalSupplier6[data];
                   this.AmountTotal7 += subTotalSupplier7[data];
                   this.AmountTotal8 += subTotalSupplier8[data];
                   this.AmountTotal9 += subTotalSupplier9[data];
                   this.AmountTotal10 += subTotalSupplier10[data];   
                   this.AmountTotal11 += subTotalSupplier11[data];
                   this.AmountTotal12 += subTotalSupplier12[data];
                   this.AmountTotal13 += subTotalSupplier13[data];                                                      
               }
               this.AmountTotal1 = this.AmountTotal1.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.AmountTotal2 = this.AmountTotal2.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.AmountTotal3 = this.AmountTotal3.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.AmountTotal4 = this.AmountTotal4.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.AmountTotal5 = this.AmountTotal5.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });            
               this.AmountTotal6 = this.AmountTotal6.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.AmountTotal7 = this.AmountTotal7.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.AmountTotal8 = this.AmountTotal8.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.AmountTotal9 = this.AmountTotal9.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.AmountTotal10 = this.AmountTotal10.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });            
               this.AmountTotal11 = this.AmountTotal11.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.AmountTotal12 = this.AmountTotal12.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.AmountTotal13 = this.AmountTotal13.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });               
               this.suppliers = suppliers;
             });
        }
    }

    ExportToExcel() {
        {
            var filter = {
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
           }

        this.service.generateExcel(filter)
            .catch(e => {
                alert(e.replace(e, "Error: ",""))
            });
        }
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.suppliers = [];
        this.AmountTotal1 = null;
        this.AmountTotal2 = null;
        this.AmountTotal3 = null;
        this.AmountTotal4 = null;
        this.AmountTotal5 = null;    
        this.AmountTotal6 = null;
        this.AmountTotal7 = null;
        this.AmountTotal9 = null;
        this.AmountTotal9 = null;
        this.AmountTotal10 = null;    
        this.AmountTotal11 = null;
        this.AmountTotal12 = null;
        this.AmountTotal13 = null;               
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 
}