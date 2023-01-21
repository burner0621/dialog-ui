import { inject, bindable } from 'aurelia-framework'
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
const GarmentBuyerLoader = require('../../../../loader/garment-buyers-loader');
const GarmentShippingInvoiceLoader = require('../../../../loader/garment-shipping-invoice-loader');

@inject(Router, Service)
export class List {
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    
    buyerAgent = null;
    invoiceNo = null;
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
        return `${invoiceNo.InvoiceNoe}`
    }
   
    activate() {
       
    }
   
    searching() {
        {
        var info = {
            buyerAgent : this.buyerAgent ? this.buyerAgent.Code : "",
            invoiceNo : this.invoiceNo ? this.invoiceNo.InvoiceNo : "",
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
                  var subTotalBuyer4 = {};
                  
                                    
                  for (var data of result) {
                       var Buyer = data.invoiceNo;
                        if (!dataByBuyer[Buyer]) dataByBuyer[Buyer] = [];                 
                            dataByBuyer[Buyer].push({                            
                       
                                invoiceNo : data.invoiceNo,
                                invoiceDate : moment(data.invoiceDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.invoiceDate).format("DD MMM YYYY"),
                                truckingDate : moment(data.truckingDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.truckingDate).format("DD MMM YYYY"),                      
                                sailingDate : moment(data.sailingDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.sailingDate).format("DD MMM YYYY"),                      
                                bookingDate : moment(data.bookingDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.bookingDate).format("DD MMM YYYY"),                      
                                expFactoryDate : moment(data.expFactoryDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.expFactoryDate).format("DD MMM YYYY"),                      
                                buyerAgentName : data.buyerAgentName,
                                consigneeName : data.consigneeName,
                                buyerBrandName : data.buyerBrandName,
                                comodityName : data.comodityName,
                                sectionCode : data.sectionCode,
                                coNo : data.coNo,
                                paymentDue : data.paymentDue,
                                pebNo : data.pebNo,
                                pebDate : moment(data.pebDate).format("DD MMM YYYY")=="01 Jan 0001"? "-" : moment(data.pebDate).format("DD MMM YYYY"),                      
                                originPort : data.originPort,
                                destinationPort : data.destinationPort,
                                shippingStaffName : data.shippingStaffName,
                                amount : data.amount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),        
                                cmtAmount : data.cmtAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                                lessfabricCost : data.lessfabricCost,
                                cmtAmountSub : data.cmtAmountSub,
                                adjustmentAmount : data.adjustmentAmount,
                                emklName : data.emklName,
                                forwarderName : data.forwarderName,
                                docSendDate : moment(data.docSendDate).format("DD MMM YYYY")=="01 Jan 0001"? "-" : moment(data.docSendDate).format("DD MMM YYYY"),                      
                                paymentDate : moment(data.paymentDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.paymentDate).format("DD MMM YYYY"),                      
                                dueDate : moment(data.dueDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.dueDate).format("DD MMM YYYY"),                      
                                diffBDCL : data.diffBDCL,                               
                                diffETDDSD : data.diffETDDSD,
                                diffDDPD : data.diffDDPD,
                        });
                        
                        if (!subTotalBuyer1[Buyer]) {
                           subTotalBuyer1[Buyer] = 0;
                           } 
                           subTotalBuyer1[Buyer] += data.amount;
                           
                        if (!subTotalBuyer2[Buyer]) {
                            subTotalBuyer2[Buyer] = 0;
                            } 
                            subTotalBuyer2[Buyer] += data.lessfabricCost;  
                            
                        if (!subTotalBuyer3[Buyer]) {
                                subTotalBuyer3[Buyer] = 0;
                            } 
                            subTotalBuyer3[Buyer] += data.cmtAmountSub;   

                        if (!subTotalBuyer4[Buyer]) {
                                subTotalBuyer4[Buyer] = 0;
                            } 
                            subTotalBuyer4[Buyer] = data.adjustmentAmount;   
                }
     
               var buyers = [];
               this.TotFOB = 0;
               this.TotLFC = 0;
               this.TotCMT = 0;
               this.TotDHL = 0;
               this.TotTBP = 0;
                
               for (var data in dataByBuyer) {
                   buyers.push({
                   data: dataByBuyer[data],
                   buyer: dataByBuyer[data][0].invoiceNo,
                   subTotal1: (subTotalBuyer1[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal2: (subTotalBuyer2[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal3: (subTotalBuyer1[data]==subTotalBuyer3[data] ? 0 :subTotalBuyer3[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                   
                   subTotal4: (subTotalBuyer4[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                                      
                   subTotal5: ((subTotalBuyer1[data]) -  (subTotalBuyer2[data]) +  (subTotalBuyer4[data])).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                                      
                 });   
                 this.TotFOB += subTotalBuyer1[data];
                 this.TotLFC += subTotalBuyer2[data];  
                 this.TotCMT += subTotalBuyer3[data];  
                 this.TotDHL += subTotalBuyer4[data]; 
                 this.TotTBP += subTotalBuyer1[data];                  
               }
               this.TotFOB = this.TotFOB.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.TotLFC = this.TotLFC.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.TotCMT = this.TotCMT.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.TotDHL = this.TotDHL.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });              
               this.TotTBP = this.TotTBP.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });                             
               this.buyers = buyers; 
             });   
        }   
    }

    ExportToExcel() {
        {
            var info = {
                buyerAgent : this.buyerAgent ? this.buyerAgent.Code : "",
                invoiceNo : this.invoiceNo ? this.invoiceNo.InvoiceNo : "",
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
        this.buyers = [];
        // this.TotDPP = null;            
        // this.TotPPN = null; 
        // this.TotAmt = null;   
        // this.TotQty = null;          
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 
}