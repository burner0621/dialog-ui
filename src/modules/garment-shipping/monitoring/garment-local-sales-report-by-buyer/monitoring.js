import { inject, bindable } from 'aurelia-framework'
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");

const GarmentLocalBuyerLoader = require("../../../../loader/garment-leftover-warehouse-buyer-loader");
const GarmentTransactionTypeLoader = require("../../../../loader/garment-transaction-type-loader");

@inject(Router, Service)
export class List {
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
        
        const moment = require('moment');
        moment.locale('id');        
    }    

    buyer = null;
    lstype = null
    dateFrom = null;
    dateTo = null;
    tableData = [];
    
    get garmentlocalbuyerLoader() {
        return GarmentLocalBuyerLoader;
    }

    buyerView = (buyer) => {
        return `${buyer.Code} - ${buyer.Name}`
    }

    get garmenttransactiontypeLoader() {
        return GarmentTransactionTypeLoader;
    }

    lstypeView = (lstype) => {
        return `${lstype.Code} - ${lstype.Name}`
    }

   searching() {
       {
        var info = {
            buyer : this.buyer ? this.buyer.Code : "",
            lstype : this.lstype ? this.lstype.Code : "",            
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        
            this.service.search(info)
                .then(result => {
                    this.tableData = result;   
                    console.log(result);                
                    this.tableData.forEach(data => {
                        data.rowSpan = data.localSalesNo.reduce((acc, cur) => acc += cur.details.length || 1, 0) || 1;
                    })

                    this.grandTotalByUom = [];
                    this.grandTotal = 0;
                    this.tableData.forEach(data => {
                        data.localSalesNo.forEach(salesno => {
                            salesno.details.forEach(detail => {
                                const uomIndex = this.grandTotalByUom.findIndex(uom => uom.uom == detail.uomUnit);
                                if (uomIndex > -1) {
                                    this.grandTotalByUom[uomIndex].quantity += detail.quantity;
                                    this.grandTotalByUom[uomIndex].amount += detail.amount;
                                } else {
                                    this.grandTotalByUom.push({
                                        uom: detail.uomUnit,
                                        quantity: detail.quantity,
                                        amount: detail.amount
                                    });
                                }
                                this.grandTotal += detail.amount;
                            });
                        });
                    });
                });
       }
    }

    ExportToExcel() {
        {
            var info = {
                buyer : this.buyer ? this.buyer.Code : "",
                lstype : this.lstype ? this.lstype.Code : "",
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
        this.buyer = null;
        this.lstype= null;
        this.tableData = [];
        this.grandTotalByUom = null;
        this.grandTotal = null;
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;
    } 
}