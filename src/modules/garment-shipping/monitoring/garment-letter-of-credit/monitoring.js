import { inject, bindable } from 'aurelia-framework'
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
const GarmentBuyerLoader = require('../../../../loader/garment-buyers-loader');
const GarmentLCLoader = require('../../../../loader/garment-shipping-letter-of-credit-loader');

@inject(Router, Service)
export class List {
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    
    buyerAgent = null;
    lcNo = null;
    dateFrom = null;
    dateTo = null;


    get garmentbuyerLoader() {
        return GarmentBuyerLoader;
    }

    buyerAgentView = (buyerAgent) => {
        return `${buyerAgent.Code} - ${buyerAgent.Name}`
    }

    get shippinglcLoader() {
        return GarmentLCLoader;
    }

    shippinglcNoView = (lcNo) => {
        return `${lcNo.DocumentCreditNo}`
    }
   
    activate() {
       
    }
   
    searching() {
        {
        var info = {
            buyerAgent : this.buyerAgent ? this.buyerAgent.Code : "",
            lcNo : this.lcNo ? this.lcNo.DocumentCreditNo : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }

         this.service.search(info)
            .then(result => {
                  this.data = result;
                  console.log(result);
                  var datas = [];
                  for (var item of this.data){
                      item.lcDate=moment(item.lcDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(item.lcDate).format("DD MMM YYYY");
                      item.truckingDate=moment(item.truckingDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(item.truckingDate).format("DD MMM YYYY");                    
                      item.expiredDate=moment(item.expiredDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(item.expiredDate).format("DD MMM YYYY");
                      item.latestShipment=moment(item.latestShipment).format("DD MMM YYYY")=="01 Jan 0001" ? "-" : moment(item.latestShipment).format("DD MMM YYYY");                    
                      
                      item.quantity=item.quantity.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                      item.amountToBePaid=item.amountToBePaid.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                      item.amountLC=item.amountLC.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});

                      datas.push(item);
                  }
                  this.data = datas;
             });   
        }   
    }

    ExportToExcel() {
        {
            var info = {
                buyerAgent : this.buyerAgent ? this.buyerAgent.Code : "",
                lcNo : this.lcNo ? this.lcNo.DocumentCreditNo : "",
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
        this.lcNo = null; 
        this.datas = [];
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 
}