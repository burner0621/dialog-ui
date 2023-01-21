import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require('moment');
var UnitLoader = require('../../../loader/unit-loader');
var NoteLoader = require('../../../loader/unit-payment-orders-loader');
var BudgetLoader = require('../../../loader/budget-loader');
var CategoryLoader = require('../../../loader/category-loader');
var SupplierLoader = require('../../../loader/supplier-loader');
var AccountLoader = require('../../../loader/account-loader');
var PurchaseOrderLoader = require('../../../loader/purchase-order-by-user-loader');

@inject(Router, Service)
export class List {

    // poStates = [
    //     {
    //         "name": "",
    //         "value": -1
    //     }, {
    //         "name": "Dibatalkan",
    //         "value": 0
    //     }, {
    //         "name": "PO Internal belum diorder",
    //         "value": 1
    //     }, {
    //         "name": "Sudah dibuat PO Eksternal",
    //         "value": 2
    //     }, {
    //         "name": "Sudah diorder ke Supplier",
    //         "value": 3
    //     }, {
    //         "name": "Barang sudah datang parsial",
    //         "value": 4
    //     }, {
    //         "name": "Barang sudah datang",
    //         "value": 5
    //     }, {
    //         "name": "Barang sudah diterima Unit parsial",
    //         "value": 6
    //     }, {
    //         "name": "Barang sudah diterima Unit",
    //         "value": 7
    //     }, {
    //         "name": "Sebagian sudah dibuat SPB",
    //         "value": 8
    //     }, {
    //         "name": "Complete",
    //         "value": 9
    //     }];


    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
        // this.poStates = this.poStates.map(poState => {
        //     poState.toString = function () {
        //         return this.name;
        //     }
        //     return poState;
        // })
        this.data = [];
    }
    attached() {
    }

    activate() {
    }

    view(data) {
        this.router.navigateToRoute('view', { id: data._id });
    }

    search() {
         var dateFormat = "DD MMM YYYY";
         var locale = 'id-ID';
      var nilais='';
         var moment = require('moment');
         moment.locale(locale);
        // if (!this.poState)
        //     this.poState = this.poStates[0];
     //   this.service.getDataSpb(this.unit ? this.unit._id : "", this.purchaseOrder ? this.purchaseOrder.purchaseRequest.no : "", this.noSpb ? this.noSpb : "", this.supplier ? this.supplier._id : "", this.dateFrom, this.dateTo, this.staffName ? this.staffName.username : "")
this.service.getDataSpb(this.unit ? this.unit._id : "", this.supplier ? this.supplier._id : "", this.dateFrom, this.dateTo)
            .then(data => {
                 //this.data = data;
                 var hasil=0;
                 var hasil2=0;
            var dataTemp = [];
                      for (var a of data) {
                  if(a.useIncomeTax==true){
                        hasil=(a.items.unitReceiptNote.items.deliveredQuantity*a.items.unitReceiptNote.items.pricePerDealUnit)/10; 
                    }else{
                        hasil=0;
                    }

                    if(a.useVat==true){
                        hasil2=((a.items.unitReceiptNote.items.deliveredQuantity*a.items.unitReceiptNote.items.pricePerDealUnit)*a.vat.rate)/100; 
                    }else{
                        hasil2=0;
                    }
var Tempo= a.tgltambah;
var JatuhTempo = new Date(a.items.unitReceiptNote.date);
                JatuhTempo.setDate(JatuhTempo.getDate() + Tempo);
var index=1;
               var temp = {
                        "no": a.no,
            "date": a.date,
            "_createdBy": a._createdBy,
            "product": a.items.unitReceiptNote.items.product.name,
            "banyak": a.items.unitReceiptNote.items.deliveredQuantity,
            "harga": a.items.unitReceiptNote.items.pricePerDealUnit,
            "invoceDate": a.invoceDate,
            "invoceNo": a.invoceNo,
            "dueDate": a.dueDate || JatuhTempo,
            "supplier": a.suppliernm,
            "divisi": a.division.name,
            "useIncomeTax":hasil,
            "useVat":hasil2,
            "tot": (a.items.unitReceiptNote.items.deliveredQuantity*a.items.unitReceiptNote.items.pricePerDealUnit)+hasil,
            "namaUnit": a.namaUnit,
            "nopr": a.items.unitReceiptNote.items.purchaseOrder.purchaseRequest.no,
            "datepr": a.items.unitReceiptNote.items.purchaseOrder.purchaseRequest.date,
            "nonote":a.items.unitReceiptNote.no,
   
            "matauang":a.matauang,
            "satuan":a.satuan,
            "codesupplier":a.codesupplier,
            "datenote":a.items.unitReceiptNote.date,
            "kategori":a.kategori,
                      
                    }
                     dataTemp.push(temp);
                      }

            this.data = dataTemp;
     })
          
             
    }


    reset() {
        this.unit = "";
        this.purchaseOrder = "";
        this.supplier = "";
        this.dateFrom = undefined;
        this.dateTo = undefined;
        this.staffName = "";
        this.noSpb = "";
        this.data = [];
      
    }

    exportToXls() {
        // if (!this.poState)
        //     this.poState = this.poStates[0];
        this.service.generateExcel(this.unit ? this.unit._id : "", this.purchaseOrder ? this.purchaseOrder.purchaseRequest.no : "", this.noSpb ? this.noSpb : "", this.supplier ? this.supplier._id : "", this.dateFrom, this.dateTo, this.staffName ? this.staffName.username : "");
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);
        this.dateMin = moment(_startDate).format("YYYY-MM-DD");

        if (_startDate > _endDate || !this.dateTo) {
            this.dateTo = e.srcElement.value;
        }

    }

    get unitLoader() {
        return UnitLoader;
    }

    get budgetLoader() {
        return BudgetLoader;
    }

    get categoryLoader() {
        return CategoryLoader;
    }

    get purchaseOrderLoader() {
        return PurchaseOrderLoader;
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    get accountLoader() {
        return AccountLoader;
    }
    get noteLoader() {
        return NoteLoader;
    }
}