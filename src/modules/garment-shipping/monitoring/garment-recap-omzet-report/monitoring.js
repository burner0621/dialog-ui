import { inject, bindable } from 'aurelia-framework'
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
const GarmentBuyerLoader = require('../../../../loader/garment-buyers-loader');

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
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }

        this.service.search(info)
            .then(result => {
                this.data = result;
                console.log(result);

                this.grandTotalByUom = [];
                this.grandTotal = 0;
                this.grandTotal1 = 0;
                
                var dataBySection = {};

                var subTotalSection = {};
                var subTotalSection1 = {};
                  
                  for (var data of result) {
                       var SECTION = data.omzet;
                        if (!dataBySection[SECTION]) dataBySection[SECTION] = [];                 
                            dataBySection[SECTION].push({            
                           
                                truckingDate : moment(data.truckingDate).format("DD/MM/YYYY")=="01/01/1970"? "-" : moment(data.truckingDate).format("DD/MM/YYYY"),
                                invoiceDate : moment(data.invoiceDate).format("DD/MM/YYYY")=="01/01/1970"? "-" : moment(data.invoiceDate).format("DD/MM/YYYY"),
                                pebDate : moment(data.pebDate).format("DD/MM/YYYY")=="01/01/1970"? "-" : moment(data.pebDate).format("DD/MM/YYYY"),
                                buyerAgentName : data.buyerAgentName,
                                destination : data.destination,
                                buyerAgentCode : data.buyerAgentCode,
                                comodityName : data.comodityName,
                                invoiceNo : data.invoiceNo,
                                pebNo : data.pebNo,
                                uomUnit : data.uomUnit,
                                currencyCode : data.currencyCode,
                                quantity : data.quantity.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                                 
                                amount : data.amount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), 
                                rate : data.rate.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), 
                                amountIDR : data.amountIDR.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                                 
            
                         });
                    
                        if (!subTotalSection[SECTION]) {
                           subTotalSection[SECTION] = 0;
                           } 
                           subTotalSection[SECTION] += data.amount;
 
                        if (!subTotalSection1[SECTION]) {
                            subTotalSection1[SECTION] = 0;
                           } 
                           subTotalSection1[SECTION] += data.amountIDR;
                        }
                    //
                    for (var data of result) {

                        const uomIndex = this.grandTotalByUom.findIndex(uom => uom.uomUnit == data.uomUnit);
                        if (uomIndex > -1) {
                            this.grandTotalByUom[uomIndex].quantity += data.quantity;
                            this.grandTotalByUom[uomIndex].amount += data.amount;
                            this.grandTotalByUom[uomIndex].amount1 += data.amountIDR;                            
                        } else {
                            // console.log(data.uomUnit);
                            this.grandTotalByUom.push({
                                uomUnit: data.uomUnit,
                                quantity: data.quantity,
                                amount: data.amount,
                                amount1: data.amountIDR,                                
                            });
                        }
                        // console.log(this.grandTotalByUom);
                        this.grandTotal += data.amount;
                        this.grandTotal1 += data.amountIDR;
                        
                    }
                    //
                       
               var Sections = [];
               this.AmountTotal = 0;
               this.AmountTotal1 = 0;
                      
               for (var data in dataBySection) {
                   Sections.push({
                   data: dataBySection[data],
                   SECTION: dataBySection[data][0].omzet,
                   subTotal: (subTotalSection[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal1: (subTotalSection1[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                });
                   this.AmountTotal += subTotalSection[data];                                     
                   this.AmountTotal1 += subTotalSection1[data];                                     
               }
               
               this.AmountTotal = this.AmountTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.AmountTotal1 = this.AmountTotal1.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.Sections = Sections;

                });  
    }

    ExportToExcel() {
        {
            var info = {
                dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
            }

        this.service.generateExcel(info)
            .catch(e => {
                //alert(e.replace(e, "Error: ",""))
            });
        }
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.Sections = [];
        this.AmountTotal = null;
        this.AmountTotal1 = null;
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 
}