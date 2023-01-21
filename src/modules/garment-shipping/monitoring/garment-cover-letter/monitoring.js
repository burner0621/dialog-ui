import { inject, bindable } from 'aurelia-framework'
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
const GarmentBuyerLoader = require('../../../../loader/garment-buyers-loader');
const GarmentEMKLLoader = require('../../../../loader/garment-emkl-loader');


@inject(Router, Service)
export class List {
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    
    buyerAgent = null;
    emkl = null;
    dateFrom = null;
    dateTo = null;
   
    get garmentbuyerLoader() {
        return GarmentBuyerLoader;
    }

    buyerAgentView = (buyerAgent) => {
        return `${buyerAgent.Code} - ${buyerAgent.Name}`
    }

    get garmentemklLoader() {
        return GarmentEMKLLoader;
    }

    emklView = (emkl) => {
        return `${emkl.Code} - ${emkl.Name}`
    }

    activate() {
       
    }

    searching() {
        {
        var info = {
            buyerAgent : this.buyerAgent ? this.buyerAgent.Code : "",
            emkl : this.emkl ? this.emkl.Code : "",            
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
                       var Buyer = data.buyerAgentName;
                        if (!dataByBuyer[Buyer]) dataByBuyer[Buyer] = [];                 
                            dataByBuyer[Buyer].push({      
                         
                            invoiceNo : data.invoiceNo,
                            clDate : moment(data.clDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.clDate).format("DD MMM YYYY"),
                            bookingDate : moment(data.bookingDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.bookingDate).format("DD MMM YYYY"),
                            exportDate : moment(data.exportDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.exportDate).format("DD MMM YYYY"),                            
                            emklName : data.emklName,
                            forwarderName : data.forwarderName,
                            shippingStaffName : data.shippingStaffName,
                            buyerAgentCode : data.buyerAgentCode,
                            buyerAgentName : data.buyerAgentName,
                            destination : data.destination,
                            address : data.address,
                            pic : data.pic,
                            attn : data.attn,
                            phone : data.phone,
                            containerNo : data.containerNo,
                            truck : data.truck,
                            plateNumber : data.plateNumber,
                            driverName : data.driverName,
                            unitName : data.unitName,    
                            contaainerNo : data.containerNo,
                            shippingSeal : data.shippingSeal,
                            dlSeal : data.dlSeal,                            
                            pcsQuantity : data.pcsQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                            setsQuantity : data.setsQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                            packQuantity : data.packQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                            totalCarton : data.totalCarton.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    
                        });
                        
                        if (!subTotalBuyer1[Buyer]) {
                           subTotalBuyer1[Buyer] = 0;
                           } 
                           subTotalBuyer1[Buyer] += data.pcsQuantity;

                        if (!subTotalBuyer2[Buyer]) {
                            subTotalBuyer2[Buyer] = 0;
                            } 
                            subTotalBuyer2[Buyer] += data.setsQuantity;

                        if (!subTotalBuyer3[Buyer]) {
                            subTotalBuyer3[Buyer] = 0;
                                } 
                            subTotalBuyer3[Buyer] += data.packQuantity;

                        if (!subTotalBuyer4[Buyer]) {
                            subTotalBuyer4[Buyer] = 0;
                                } 
                            subTotalBuyer4[Buyer] += data.totalCarton;
         
                }
     
               var buyers = [];
               this.TotPcs = 0;
               this.TotSets = 0;
               this.TotPack = 0;
               this.TotCtns = 0;
                              
               for (var data in dataByBuyer) {
                   buyers.push({
                   data: dataByBuyer[data],
                   buyer: dataByBuyer[data][0].buyerAgentName,
                   subTotal1: (subTotalBuyer1[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal2: (subTotalBuyer2[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal3: (subTotalBuyer3[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal4: (subTotalBuyer4[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                 });
                   this.TotPcs += subTotalBuyer1[data];   
                   this.TotSets += subTotalBuyer2[data];
                   this.TotPack += subTotalBuyer3[data];   
                   this.TotCtns += subTotalBuyer4[data];
               }
               this.TotPcs = this.TotPcs.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.TotSets = this.TotSets.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.TotPack = this.TotPack.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.TotCtns = this.TotCtns.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.buyers = buyers;
             });   
        }   
    }

    ExportToExcel() {
        {
            var info = {
                buyerAgent : this.buyerAgent ? this.buyerAgent.Code : "",
                emkl : this.emkl ? this.emkl.Code : "", 
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
        this.emkl = null;
        this.buyers = [];
        this.TotPcs = null;
        this.TotSets = null;
        this.TotPack = null;
        this.TotGross = null;
        this.TotNett = null;
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;
    } 
}