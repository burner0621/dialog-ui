import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var PurchasePriceCorrectionLoader = require('../../../loader/garment-purchase-correction-loader');
var SupplierLoader = require('../../../loader/garment-supplier-loader');

@inject(Router, Service)
export class List {
  constructor(router, service) {
        this.service = service;
        this.router = router;

    }
    get purchasePriceCorrectionLoader(){
        return PurchasePriceCorrectionLoader;
    }
    get supplierLoader(){
        return SupplierLoader;
    }
  searching() {
        var info = {
            no : this.no ? this.no : "",
            supplier : this.supplier ? this.supplier.code : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.search(info.no,info.supplier,info.dateFrom,info.dateTo)
            .then(result => {
             this.data = result;
            
              this.data = [];
                 var counter = 1;
                for (var pr of result) {
              
                 if(pr.itemsProdId === pr.fulProdId  )
                 {
                       var _data = {};
                       _data.no=  pr.no;
                        _data.date =pr.date;
                        _data.index = counter;
                        _data.noPOEks = pr.noPOEks;
                        _data.correctionType=  pr.correctionType;
                        _data.currrencyCode =pr.currrencyCode;
                        _data.deliveryorderNo = pr.deliveryorderNo;
                        _data.supplier = pr.supplier;
                        _data.noPR = pr.noPR;
                        _data.noRefPR = pr.noRefPR;
                        _data.noRO = pr.noRO;
                        _data.itemCode = pr.itemCode;
                        _data.supplier = pr.supplier;
                        _data.itemName = pr.itemName;
                        _data.qty = pr.qty;
                        _data.unitCode = pr.unitCode;
                        _data.pricePerUnit = pr.pricePerUnit;
                        _data.priceTotal = pr.priceTotal;
                        _data.itemName = pr.itemName;
                        _data.currencyCode =pr.currencyCode;

                        var correction=pr.fulfillments.corrections ? pr.fulfillments.corrections :pr.fulfillments.correction;

                        if(!correction.length)
                        {
                            _data.qtyBegin = pr.fulfillments.deliveredQuantity;
                        }else 
                        {
                            _data.qtyBegin = correction[correction.length -1].correctionQuantity;

                        }


                        if(!correction.length)
                        {
                            _data.correctionPricePerUnit = pr.fulfillments.pricePerDealUnit;
                        }else 
                        {
                            _data.correctionPricePerUnit = correction[correction.length -1].correctionPricePerUnit;

                        }
                         if(!correction.length)
                        {
                            _data.correctionPriceTotal = pr.fulfillments.pricePerDealUnit *  pr.fulfillments.deliveredQuantity;
                        }else 
                        {
                            _data.correctionPriceTotal = correction[correction.length -1].correctionPriceTotal;

                        }
                        this.data.push(_data);
                   counter ++;
                   }
                }
            });
    }
    
     ExportToExcel() {
        var info = {
            no : this.no ? this.no : "",
            supplier : this.supplier ? this.supplier.code : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
       }
        this.service.generateXls(info.no,info.supplier,info.dateFrom,info.dateTo)
    }
  

    reset() {
       
        this.no = "";
        this.supplier = "";
        this.dateFrom = "";
        this.dateTo = "";
       
       
    }
}