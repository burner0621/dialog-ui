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

    paymenttype = "";
    dateFrom = null;
    dateTo = null;
    tableData = [];
    @bindable patype;

    PAYType = ['','FORWARDER', 'EMKL', 'COURIER'];
    
    paytypeChanged(newvalue) {
        if (newvalue) {
            if (newvalue === "FORWARDER") {
                this.policytype = "FORWARDER";
            }
            else if (newvalue === "EMKL") {
                this.policytype = "EMKL";
            }         
            else {
                this.policytype = "COURIER"; 
            }
        }
    }
    
    searching() {
        {
        var info = {
            paymenttype : this.paymenttype ? this.paymenttype : "",  
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
                var Buyer = data.dispositionNo;
                if (!dataByBuyer[Buyer]) dataByBuyer[Buyer] = [];                 
                    dataByBuyer[Buyer].push({        

                    dispositionNo : data.dispositionNo,
                    paymentDate : moment(data.paymentDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.paymentDate).format("DD MMM YYYY"),
                    paymentType : data.paymentType,
                    paymentMethod : data.paymentMethod,
                    paymentTerm : data.paymentTerm,
                    bankName : data.bankName,
                    accNumber : data.accNumber,   
                    xpdcCode : data.xpdcCode,
                    xpdcName : data.xpdcName,
                    buyerCode : data.buyerCode,
                    buyerName : data.buyerName,
                    invoiceNumber : data.invoiceNumber,
                    invoiceDate : moment(data.invoiceDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.invoiceDate).format("DD MMM YYYY"),
                    invoiceTaxNumber : data.invoiceTaxNumber,  
                    unitCode : data.unitCode,
                    billValue : data.billValue.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    vatValue : data.vatValue.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    incomeTaxValue : data.incomeTaxValue.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    totalBill : data.totalBill.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    unitPercentage : data.unitPercentage.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    unitAmount : data.unitAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    
                });
                
                if (!subTotalBuyer[Buyer]){
                    subTotalBuyer[Buyer] = 0;
                    } 
                    subTotalBuyer[Buyer] = data.billValue;

                if (!subTotalBuyer1[Buyer]) {
                    subTotalBuyer1[Buyer] = 0;
                    } 
                    subTotalBuyer1[Buyer] = data.vatValue;
                    
                if (!subTotalBuyer2[Buyer]) {
                    subTotalBuyer2[Buyer] = 0;
                    } 
                    subTotalBuyer2[Buyer] = data.incomeTaxValue;  
                    
                if (!subTotalBuyer3[Buyer]) {
                        subTotalBuyer3[Buyer] = 0;
                    } 
                    subTotalBuyer3[Buyer] += data.unitAmount;     

                }

                var buyers = [];
                this.Total1 = 0;
                this.Total2 = 0;
                this.Total3 = 0;
                this.Total4 = 0;
                                
                for (var data in dataByBuyer) {
                    buyers.push({
                    data: dataByBuyer[data],
                    buyer: dataByBuyer[data][0].dispositionNo,
                    subTotal: (subTotalBuyer[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    subTotal1: (subTotalBuyer1[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    subTotal2: (subTotalBuyer2[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                   
                    subTotal3: (subTotalBuyer3[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),      
                });
                    this.Total1 += subTotalBuyer[data];
                    this.Total2 += subTotalBuyer1[data];  
                    this.Total3 += subTotalBuyer2[data];  
                    this.Total4 += subTotalBuyer3[data]; 
                }
                this.Total1 = this.Total1.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                this.Total2 = this.Total2.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                this.Total3 = this.Total3.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                this.Total4 = this.Total4.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });   
                            
                this.buyers = buyers;
            });      
        }   
    }

    ExportToExcel() {
        {
            var info = {
                paymenttype : this.paymenttype ? this.paymenttype : "",            
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
        this.paymenttype = "";        
        this.buyers = [];
        this.TotAmt = null;
        this.TotPrm = null;
        this.Tot1A = null;
        this.Tot1B = null;
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;
    } 
}