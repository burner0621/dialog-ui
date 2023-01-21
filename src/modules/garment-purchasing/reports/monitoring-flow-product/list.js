import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require('moment');

@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }

    info = { page: 1,size:50};

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };


    search(){
            this.info.page = 1;
            this.info.total=0;
            this.searching();        
    }
    activate() {
       
    }
    tableData = []
    searching() {
        var args = {
            // page: this.info.page,
            // size: this.info.size,
            dono : this.NoSJ ? this.NoSJ : "",
            beacukaino : this.BeacukaiNo ? this.BeacukaiNo : "",
            productCode : this.code ? this.code : "",
            // category : this.category ? this.category : "",
            //suppliertype : this.Tipe
        };
        this.service.search(args)
            .then(result=>{
                // this.data=[];

                this.rowCount=[];
                var rowDoc=[]
                    //console.log(result);
                    
                var index=0;  

                for(var _data of result){
                    

                    var bcno = _data.BCNo.toString();
                    var tipebc = _data.BCType.toString();
                    var bcdate = _data.BCDate.toString();
                    var dONo = _data.DONo.toString();
                    var dODate = _data.DODate.toString();
                    var supplierName = _data.SupplierName.toString();
                    var supplierType = _data.SupplierType.toString();
                    var dOQty = _data.DOQty.toString();
                    var urnno = _data.Urnno.toString();
                    var receiptDate = _data.ReceiptDate.toString();
                    var productCode = _data.ProductCode.toString();
                    var productName = _data.ProductName.toString();
                    var receiptQty = _data.ReceiptQty.toString();
                    var uRNType = _data.URNType.toString();
                    var dOUom = _data.DOUom.toString();
                    var pO = _data.PO.toString();
                    var arrivalDate = _data.ArrivalDate.toString();
                    
                    if(!rowDoc[dONo + dODate + arrivalDate + supplierName + supplierType + bcno + tipebc + bcdate + pO + productCode + productName 
                        + dOQty + dOUom ]){
                        rowDoc[dONo + dODate + arrivalDate + supplierName + supplierType + bcno + tipebc + bcdate + pO + productCode + productName 
                            + dOQty + dOUom ] = 1
                    }else{
                        rowDoc[dONo + dODate + arrivalDate + supplierName + supplierType + bcno + tipebc + bcdate + pO + productCode + productName 
                            + dOQty + dOUom ]++
                    }

                    if(!rowDoc[dONo + dODate + arrivalDate + supplierName + supplierType + bcno + tipebc + bcdate]){
                        rowDoc[dONo + dODate + arrivalDate + supplierName + supplierType + bcno + tipebc + bcdate] = 1
                    }else{
                        rowDoc[dONo + dODate + arrivalDate + supplierName + supplierType + bcno + tipebc + bcdate]++
                    }

                    if(!rowDoc[dONo + dODate + arrivalDate + supplierName + supplierType + bcno + tipebc + bcdate + pO + productCode + productName 
                        + dOQty + dOUom + urnno + receiptDate + receiptQty + uRNType]){
                        rowDoc[dONo + dODate + arrivalDate + supplierName + supplierType + bcno + tipebc + bcdate + pO + productCode + productName 
                            + dOQty + dOUom + urnno + receiptDate + receiptQty + uRNType ] = 1
                    }else{
                        rowDoc[dONo + dODate + arrivalDate + supplierName + supplierType + bcno + tipebc + bcdate + pO + productCode + productName 
                            + dOQty + dOUom + urnno + receiptDate + receiptQty + uRNType ]++
                    }
                    
                }

                for(var b of result){
                    let po = result.find(o=> o.DONo + o.DODate + o.ArrivalDate + o.SupplierName + o.SupplierType + o.BCNo + o.BCType + o.BCDate + o.PO + o.ProductCode + o.ProductName + o.DOQty + o.DOUom == b.DONo + b.DODate + b.ArrivalDate + b.SupplierName + b.SupplierType + b.BCNo + b.BCType + b.BCDate + b.PO + b.ProductCode + b.ProductName + b.DOQty + b.DOUom);
                    if(po) {
                        po.ponospan = rowDoc[b.DONo.toString() + b.DODate.toString() + b.ArrivalDate.toString() + b.SupplierName.toString() + b.SupplierType.toString() + b.BCNo.toString() + b.BCType.toString() + b.BCDate.toString() + b.PO.toString() + b.ProductCode.toString() + b.ProductName.toString() + b.DOQty.toString() + b.DOUom.toString()];
                    }

                    let dono = result.find(o=> o.DONo + o.DODate + o.ArrivalDate + o.SupplierName + o.SupplierType + o.BCNo + o.BCType + o.BCDate == b.DONo + b.DODate + b.ArrivalDate + b.SupplierName + b.SupplierType + b.BCNo + b.BCType + b.BCDate);
                    if(dono) {
                        dono.donospan = rowDoc[b.DONo.toString() + b.DODate.toString() + b.ArrivalDate.toString() + b.SupplierName.toString() + b.SupplierType.toString() + b.BCNo.toString() + b.BCType.toString() + b.BCDate.toString()];
                    }

                    let urn = result.find(o=> o.DONo + o.DODate + o.ArrivalDate + o.SupplierName + o.SupplierType + o.BCNo + o.BCType + o.BCDate + o.PO + o.ProductCode + o.ProductName + o.DOQty + o.DOUom + o.Urnno + o.ReceiptDate + o.ReceiptQty + o.URNType == b.DONo + b.DODate + b.ArrivalDate + b.SupplierName + b.SupplierType + b.BCNo + b.BCType + b.BCDate + b.PO + b.ProductCode + b.ProductName + b.DOQty + b.DOUom + b.Urnno + b.ReceiptDate + b.ReceiptQty + b.URNType);
                    if(urn) {
                        urn.urnspan = rowDoc[b.DONo.toString() + b.DODate.toString() + b.ArrivalDate.toString() + b.SupplierName.toString() + b.SupplierType.toString() + b.BCNo.toString() + b.BCType.toString() + b.BCDate.toString() + b.PO.toString() + b.ProductCode.toString() + b.ProductName.toString() + b.DOQty.toString() + b.DOUom.toString() + b.Urnno.toString() + b.ReceiptDate.toString() + b.ReceiptQty.toString() + b.URNType.toString()];
                    }
                }

                for(var t of result){
                    t.ReceiptDate = moment(_data.ReceiptDate).format("DD MMM YYYY")=="01 Jan 0001" || moment(_data.ReceiptDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(_data.ReceiptDate).format("DD MMM YYYY");
                    t.ExpenditureDate = moment(_data.ExpenditureDate).format("DD MMM YYYY")=="01 Jan 0001" || moment(_data.ExpenditureDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(_data.ExpenditureDate).format("DD MMM YYYY");
                    t.Urnno = t.Urnno == "urnno-" ? "-" : t.Urnno;
                    t.ReceiptUom = t.ReceiptUom == "reciptuom-" ? "-" : t.ReceiptUom;
                    t.URNType = t.URNType == "urntype-" ? "-" : t.URNType;

                }

                console.log(result);
                this.data = result;
                // this.info.total=result.info.total
            })
    }

    reset() {
        this.dateFrom= "",
        this.dateTo="",
        this.KtgrItem="",
        this.UnitItem=""
        
    }

    ExportToExcel() {
        let args = {            
            dono : this.NoSJ ? this.NoSJ : "",
            beacukaino : this.BeacukaiNo ? this.BeacukaiNo : "",
            productCode : this.code ? this.code : "",
        };
        
        this.service.generateExcel(args);
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);
        this.dateMin = moment(_startDate).format("YYYY-MM-DD");

        if (_startDate > _endDate || !this.dateTo) {
            this.dateTo = e.srcElement.value;
        }
    }

    

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }
    
}
