import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;

    }
    bind(context) {
        this.context = context;
    }

    searching() {
        var info = {
            categoryName : this.category ?this.category:"",
           
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") :  moment(new Date()).format("YYYY-MM-DD") ,
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") :  moment(new Date()).format("YYYY-MM-DD") ,
        }
        this.service.search(info)
            .then(result => {
                console.log(result);
                this.data = [];
                for (var _data of result.data) {
                     _data.Description = _data.Description;
                    _data.Uom = _data.Description === "PENERIMAAN" || _data.Description=== "PENGELUARAN" ? '' :_data.Uom;
                    _data.Unit2aQty = _data.Description === "PENERIMAAN" || _data.Description=== "PENGELUARAN" ? '' : _data.Unit2aQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.Unit2aPrice = _data.Description === "PENERIMAAN" || _data.Description=== "PENGELUARAN" ? '' : _data.Unit2aPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.Unit2bQty = _data.Description === "PENERIMAAN" || _data.Description=== "PENGELUARAN" ? '' : _data.Unit2bQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.Unit2bPrice = _data.Description === "PENERIMAAN" || _data.Description=== "PENGELUARAN" ? '' : _data.Unit2bPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.Unit2cQty = _data.Description === "PENERIMAAN" || _data.Description=== "PENGELUARAN" ? '' : _data.Unit2cQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.Unit2cPrice = _data.Description === "PENERIMAAN" || _data.Description=== "PENGELUARAN" ? '' : _data.Unit2cPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.Unit1aQty = _data.Description === "PENERIMAAN" || _data.Description=== "PENGELUARAN" ? '' : _data.Unit1aQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.Unit1aPrice = _data.Description === "PENERIMAAN" || _data.Description=== "PENGELUARAN" ? '' : _data.Unit1aPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.Unit1bQty = _data.Description === "PENERIMAAN" || _data.Description=== "PENGELUARAN" ? '' : _data.Unit1bQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.Unit1bPrice = _data.Description === "PENERIMAAN" || _data.Description=== "PENGELUARAN" ? '' : _data.Unit1bPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.TotalQty = _data.Description === "PENERIMAAN" || _data.Description=== "PENGELUARAN" ? '' : _data.TotalQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.TotalPrice = _data.Description === "PENERIMAAN" || _data.Description=== "PENGELUARAN" ? '' : _data.TotalPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    this.data.push(_data);
                    console.log(this.data);
                }

            });
    }

    ExportToExcel() {
        var info = {
            categoryName : this.category ?this.category:"",
            dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD"),
            dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD"),

        }
        this.service.xls(info);
    }
    @bindable category;
    
    categoryItems= ['FABRIC','ACCESSORIES','BARANG JADI']
    categoryChanged(newvalue){
        if (newvalue) {
            if (newvalue === "FABRIC") {
                
                this.categoryname = "FABRIC";
            }
            else if (newvalue === "ACCESSORIES") { 
                
                this.categoryname = "ACCESSORIES";
            }
            else if (newvalue === "BARANG JADI") {
                 
                this.categoryname = "BARANG JADI";
            } 
        }else{
            this.unit = "";
            this.unitname = "";
        }
    }
    reset() {
        this.categoryName = null;
        this.dateFrom = null;
        this.dateTo = null;
       
    }

}