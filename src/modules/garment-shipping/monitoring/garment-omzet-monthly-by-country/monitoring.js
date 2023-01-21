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

    dateFrom = null;
    dateTo = null;
    tableData = [];
        
    searching() {
       {
        var info = {
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        
            this.service.search(info)
                .then(result => {
                    this.tableData = result;   
                    console.log(result);                
                    this.tableData.forEach(data => {
                        data.rowSpan = data.buyers.reduce((acc, cur) => acc += cur.details.length || 1, 0) || 1;
                    })

                    this.grandTotalByUom = [];
                    this.grandTotal = 0;
                    this.tableData.forEach(data => {
                        data.buyers.forEach(buyer => {
                            buyer.details.forEach(detail => {
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
        this.tableData = [];
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;
    } 
}