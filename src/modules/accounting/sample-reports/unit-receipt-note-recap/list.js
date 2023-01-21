import { inject, bindable } from 'aurelia-framework';
import { Service,CoreService } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var UnitLoader = require('../../../../loader/garment-units-loader');
var SupplierLoader = require('../../../../loader/garment-supplier-loader');
var UnitReceiptLoader = require('../../../../loader/garment-unit-receipt-note-loader');

@inject(Router, Service,CoreService)
export class List {

    @bindable categoryselect;
    @bindable selectedUnit;

    reprosesOption = ['','Bahan Baku', 'Bahan Embalase','Bahan Pendukung','Subkon'];
    unitOption = ['SAMPLE'];
    
    constructor(router, service,coreService) {
        this.service = service;
        this.router = router;
        this.coreService=coreService;
    }
    
    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }

    async bind(context) {
        this.context = context;
        if (!this.unit) {
            var units = await this.coreService.getSampleUnit({ size: 1, keyword: 'SMP1', filter: JSON.stringify({ Code: 'SMP1' }) });
            this.selectedUnit = units.data[0];
            this.unit=this.selectedUnit;
        }
    }
    
    get unitLoader(){
        return UnitLoader;
    }
    
    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`
    }

    categoryselectChanged(newvalue) {
        if (newvalue) {
            if (newvalue === "Bahan Baku") {
                this.category = "BB";
            }
            else if (newvalue === "Bahan Pendukung") { 
                this.category = "BP"; 
            }
            else if (newvalue === "Bahan Embalase") {
                this.category = "BE"; 
            }else if (newvalue === "Subkon"){
                this.category = "SUBKON"
            }else{
                this.category = "";
            }
        }
    }

    get supplierLoader(){
        return SupplierLoader;
    }

    get unitReceiptLoader(){
        return UnitReceiptLoader;
     
    }
   
    search() {
        let args = {
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : null,
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            category : this.category ? this.category : "",
            unit : this.unit ? this.unit.Code : ""
        }

        this.service.search(args)
            .then(result => {
                console.log(result)
                this.AmountTotal1 = 0;
                this.AmountTotal2 = 0;
                this.data=[];
                
                for (var i of result){
                    this.AmountTotal1 += i.jumlahterima;
                    this.AmountTotal2 += i.jumlah;
                    i.jumlah = i.jumlah.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

                    this.data.push(i);
                }
                this.AmountTotal1 = this.AmountTotal1.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                this.AmountTotal2 = this.AmountTotal2.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                
            })
    }

     ExportToExcel() {
        console.log(this.unitname);
        var info = {
            
            category : this.category ? this.category : "",
            categoryname: this.category === "BB" ? "GUDANG BAHAN BAKU" : this.category === "BE" ? "GUDANG BAHAN EMBALASE" : this.category === "BP" ?  "GUDANG BAHAN PENDUKUNG" : "",
            unit : this.unit ? this.unit.Code : "",
            unitname: this.unit ? this.unit.Name: "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.generateXls(  info.unit,  info.category, info.dateFrom, info.dateTo, info.unitname, info.categoryname)
    }
  
    reset() {
        this.dateFrom = "";
        this.dateTo = "";
        this.category = "";
    }
}
