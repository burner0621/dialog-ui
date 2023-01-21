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
                  var datas = [];
                  for (var item of this.data){
                      item.plDate=moment(item.plDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(item.plDate).format("DD MMM YYYY");
                      item.invoiceDate=moment(item.invoiceDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(item.invoiceDate).format("DD MMM YYYY");                      
                      item.truckingDate=moment(item.truckingDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(item.truckingDate).format("DD MMM YYYY");                    
                      item.pebDate=moment(item.pebDate).format("DD MMM YYYY")=="01 Jan 0001" ? "-" : moment(item.pebDate).format("DD MMM YYYY");                    
                      datas.push(item);
                    }
                  this.data = datas;;   
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
        this.data = [];          
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 
}