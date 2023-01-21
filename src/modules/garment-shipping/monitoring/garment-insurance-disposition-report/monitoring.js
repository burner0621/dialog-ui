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
        
        const moment = require('moment');
        moment.locale('id');        
    }    

    policytype = "";
    dateFrom = null;
    dateTo = null;
    tableData = [];
    @bindable patype;

    PAType = ['','Piutang', 'Kargo'];


    patypeChanged(newvalue) {
        if (newvalue) {
            if (newvalue === "Piutang") {
                this.policytype = "Piutang";
            }
            else {
                this.policytype = "Kargo"; 
            }
        }
    }
    
    searching() {
        {
        var info = {
            policytype : this.policytype ? this.policytype : "",  
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
                  var subTotalBuyer4 = {};
                  var subTotalBuyer5 = {};
                  var subTotalBuyer6 = {};
                                    
                  for (var data of result) {
                       var Buyer = data.policyType;
                        if (!dataByBuyer[Buyer]) dataByBuyer[Buyer] = [];                 
                            dataByBuyer[Buyer].push({                            
                     
                            dispositionNo : data.dispositionNo,
                            paymentDate : moment(data.paymentDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.paymentDate).format("DD MMM YYYY"),
                            policyDate : moment(data.policyDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.policyDate).format("DD MMM YYYY"),                       
                            policyType : data.policyType,
                            bankName : data.bankName,
                            insuranceCode : data.insuranceCode,
                            insuranceName : data.insuranceName,
                            buyerCode : data.buyerCode,
                            buyerName : data.buyerName,
                            policyNo : data.policyNo,
                            invoiceNo : data.invoiceNo,
                            rate : data.rate.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                            currencyRate : data.currencyRate.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                            amount : data.amount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                            premiAmount : data.premiAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),      
                            amountC1A : data.amountC1A.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                            amountC1B : data.amountC1B.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                            amountC2A : data.amountC2A.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                            amountC2B : data.amountC2B.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                            amountC2C : data.amountC2C.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),

                        });
                        
                        if (!subTotalBuyer[Buyer]){
                           subTotalBuyer[Buyer] = 0;
                           } 
                           subTotalBuyer[Buyer] += data.amount;

                        if (!subTotalBuyer1[Buyer]) {
                           subTotalBuyer1[Buyer] = 0;
                           } 
                           subTotalBuyer1[Buyer] += data.premiAmount;
                           
                        if (!subTotalBuyer2[Buyer]) {
                            subTotalBuyer2[Buyer] = 0;
                            } 
                            subTotalBuyer2[Buyer] += data.amountC1A;  
                            
                        if (!subTotalBuyer3[Buyer]) {
                                subTotalBuyer3[Buyer] = 0;
                            } 
                            subTotalBuyer3[Buyer] += data.amountC1B;     

                        if (!subTotalBuyer4[Buyer]) {
                                subTotalBuyer4[Buyer] = 0;
                            } 
                            subTotalBuyer4[Buyer] += data.amountC2A;     

                        if (!subTotalBuyer5[Buyer]) {
                                subTotalBuyer5[Buyer] = 0;
                            } 
                            subTotalBuyer5[Buyer] += data.amountC2B;     

                        if (!subTotalBuyer6[Buyer]) {
                                subTotalBuyer6[Buyer] = 0;
                            } 
                            subTotalBuyer6[Buyer] += data.amountC2C;   

                }
     
               var buyers = [];
               this.TotAmt = 0;
               this.TotPrm = 0;
               this.Tot1A = 0;
               this.Tot1B = 0;
               this.Tot2A = 0;
               this.Tot2B = 0;
               this.Tot2C = 0;
                               
               for (var data in dataByBuyer) {
                   buyers.push({
                   data: dataByBuyer[data],
                   buyer: dataByBuyer[data][0].policyType,
                   subTotal: (subTotalBuyer[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal1: (subTotalBuyer1[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal2: (subTotalBuyer2[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                   
                   subTotal3: (subTotalBuyer3[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),      
                   subTotal4: (subTotalBuyer4[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),      
                   subTotal5: (subTotalBuyer5[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),      
                   subTotal6: (subTotalBuyer6[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                                                         
                 });
                   this.TotAmt += subTotalBuyer[data];
                   this.TotPrm += subTotalBuyer1[data];  
                   this.Tot1A += subTotalBuyer2[data];  
                   this.Tot1B += subTotalBuyer3[data]; 
                   this.Tot2A += subTotalBuyer4[data];  
                   this.Tot2B += subTotalBuyer5[data]; 
                   this.Tot2C += subTotalBuyer6[data];                     
               }
               this.TotAmt = this.TotAmt.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.TotPrm = this.TotPrm.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.Tot1A = this.Tot1A.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.Tot1B = this.Tot1B.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });   
               this.Tot2A = this.Tot2A.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.Tot2B = this.Tot2B.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.Tot2C = this.Tot2C.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });   
                          
               this.buyers = buyers;
             });   
        }   
    }

    ExportToExcel() {
        {
            var info = {
                policytype : this.policytype ? this.policytype : "",            
                dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
            }

        this.service.xls(info)
            .catch(e => {
                alert(e.replace(e, "Error: ",""))
            });
        }
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.policytype = "";        
        this.buyers = [];
        this.TotAmt = null;
        this.TotPrm = null;
        this.Tot1A = null;
        this.Tot1B = null;
        this.Tot2A = null;
        this.Tot2B = null;
        this.Tot2C = null;        
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;
    } 
}