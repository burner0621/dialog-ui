import { inject, bindable } from 'aurelia-framework'
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
const GarmentBuyerLoader = require('../../../../loader/garment-buyers-loader');
const GarmentShippingInvoiceLoader = require('../../../../loader/garment-shipping-invoice-loader');

@inject(Router, Service)
export class List {

    PaymentTermOptions = [" ","LC", "TT/OA"];
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    
    buyerAgent = null;
    invoiceNo = null;
    paymentTerm = null;
    dateFrom = null;
    dateTo = null;

    get garmentbuyerLoader() {
        return GarmentBuyerLoader;
    }

    buyerAgentView = (buyerAgent) => {
        return `${buyerAgent.Code} - ${buyerAgent.Name}`
    }

    get shippinginvoiceLoader() {
        return GarmentShippingInvoiceLoader;
    }

    shippinginvoiceNoView = (invoiceNo) => {
        return `${invoiceNo.invoiceNo}`
    }
   
    activate() {
       
    }
   
    searching() {
        {
        var info = {
            buyerAgent : this.buyerAgent ? this.buyerAgent.Name : "",
            invoiceNo : this.invoiceNo ? this.invoiceNo.invoiceNo : "",
            paymentTerm : this.paymentTerm ? this.paymentTerm : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }

         this.service.search(info)
            .then(result => {
                  this.data = result;
                  console.log(result);
                  var dataByBuyer = {};
                  var subTotalBuyer1 = {};
                  var subTotalBuyer2 = {};
                  var subTotalBuyer3 = {};
                                    
                  for (var data of result) {
                       var Buyer = data.invoiceNo;
                        if (!dataByBuyer[Buyer]) dataByBuyer[Buyer] = [];                 
                            dataByBuyer[Buyer].push({                            
                               
                                invoiceNo : data.invoiceNo,
                                invoiceDate : moment(data.invoiceDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.invoiceDate).format("DD MMM YYYY"),
                                docUploadDate : moment(data.docUploadDate).format("DD MMM YYYY")=="01 Jan 0001"? "-" : moment(data.docUploadDate).format("DD MMM YYYY"),                      
                                paymentDate : moment(data.paymentDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.paymentDate).format("DD MMM YYYY"),                      
                                paymentTerm : data.paymentTerm,    
                            
                                buyerName : data.buyerName,
                                sectionCode : data.sectionCode,
                                bankName : data.bankName,
                                amount : data.amount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),        
                                toBePaid : data.toBePaid.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                                paidAmount : data.paidAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                                balanceAmount : data.balanceAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                         
                                nettNegoTT : data.nettNegoTT.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),    
                                bankChargeTT : data.bankChargeTT.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),    
                                otherChargeTT : data.otherChargeTT.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),    
           
                                bankComissionLC : data.bankComissionLC.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),    
                                discreapancyFeeLC : data.discreapancyFeeLC.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),    
                                nettNegoLC : data.nettNegoLC.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),    
                                creditInterestLC : data.creditInterestLC.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),               
                                bankChargeLC : data.bankChargeLC.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),    
             
                                lcNo : data.lcNo,
                                srNo : data.srNo,
                                srDate : moment(data.srDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.srDate).format("DD MMM YYYY"),                      
                            
                        });
                        
                        if (!subTotalBuyer1[Buyer]) {
                           subTotalBuyer1[Buyer] = 0;
                           } 
                           subTotalBuyer1[Buyer] = data.amount;
                           
                        if (!subTotalBuyer2[Buyer]) {
                            subTotalBuyer2[Buyer] = 0;
                            } 
                            subTotalBuyer2[Buyer] += data.toBePaid;  
                            
                        if (!subTotalBuyer3[Buyer]) {
                                subTotalBuyer3[Buyer] = 0;
                            } 
                            subTotalBuyer3[Buyer] += data.nettNego;                                      
                }
     
               var buyers = [];
               this.TotNett = 0;
                  
               for (var data in dataByBuyer) {
                   buyers.push({
                   data: dataByBuyer[data],
                   buyer: dataByBuyer[data][0].invoiceNo,
                   subTotal1: (subTotalBuyer1[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal2: (subTotalBuyer2[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal3: (subTotalBuyer3[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal4: (subTotalBuyer2[data] - subTotalBuyer3[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                                      
                   });   
                 this.TotNett += subTotalBuyer3[data];                                   
               }
               this.TotNett = this.TotNett.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.buyers = buyers; 
             });   
        }   
    }

    ExportToExcel() {
        {
            var info = {
                buyerAgent : this.buyerAgent ? this.buyerAgent.Name : "",
                invoiceNo : this.invoiceNo ? this.invoiceNo.invoiceNo : "",
                paymentTerm : this.paymentTerm ? this.paymentTerm : "",
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
        this.invoiceNo = null; 
        this.paymentTerm = null;
        this.buyers = [];
        this.TotNett = null;            
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 
}