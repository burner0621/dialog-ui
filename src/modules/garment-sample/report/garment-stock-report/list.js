import { inject, bindable } from 'aurelia-framework';
import { Service,CoreService } from "./service";
import { Router } from 'aurelia-router';
var moment = require('moment');
const UnitLoader = require('../../../../loader/garment-sample-unit-loader');

@inject(Router, Service, CoreService)
export class List {
    @bindable selectedUnit;
    constructor(router, service,coreService) {
        this.service = service;
        this.router = router;
        this.today = new Date();
        this.coreService = coreService;
    }
    async bind(context) {
        this.context = context;
        if (!this.unit) {
            var units = await this.coreService.getSampleUnit({ size: 1, keyword: 'SMP1', filter: JSON.stringify({ Code: 'SMP1' }) });
            this.selectedUnit = units.data[0];

        }
    }
    selectedUnitChanged(newValue) {
        if (newValue) {
            this.unit = newValue;
        } else {
            this.unit = null;
        }
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

    @bindable UnitItem;
    @bindable KtgrItem;
    
    KategoriItems= ['','BAHAN BAKU','BAHAN EMBALANCE','BAHAN PENDUKUNG']
    UnitItems = ['','KONFEKSI 2A','KONFEKSI 2B','KONFEKSI 2C','KONFEKSI 1A','KONFEKSI 1B']

    search(){
            this.info.page = 1;
            this.info.total=0;
            this.searching();        
    }
    activate() {
       
    }
    get unitLoader(){
        return UnitLoader;
    }
    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    
    }

    tableData = []
    searching() {
        var args = {
            page: this.info.page,
            size: this.info.size,
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            unitcode : this.unit ? this.unit.Code : "",
            category : this.category ? this.category : "",
            //suppliertype : this.Tipe
        };
        this.service.search(args)
            .then(result=>{
                this.data=[];
                 for(var _data of result.data){
                     _data.BeginningBalanceQty = _data.BeginningBalanceQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ReceiptQty = _data.ReceiptQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ReceiptCorrectionQty = _data.ReceiptCorrectionQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ExpendQty = _data.ExpendQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.EndingBalanceQty = _data.EndingBalanceQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                   this.data.push(_data);
                    
                }
                this.info.total = result.info.total;
            })
    }

    reset() {
        this.dateFrom= "",
        this.dateTo="",
        this.KtgrItem=""
        
        
    }

    ExportToExcel() {
        let args = {            
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            unitcode : this.unit ? this.unit.Code : "",
            unitname : this.unit ? this.unit.Name : "",
            category : this.category ? this.category : "",
            categoryname : this.categoryname ? this.categoryname : ""
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

     

    KtgrItemChanged(newvalue){
        if (newvalue) {
            if (newvalue === "BAHAN BAKU") {
                this.category = "BB";
                this.categoryname = "BAHAN BAKU";
            }
            else if (newvalue === "BAHAN PENDUKUNG") { 
                this.category = "BP"; 
                this.categoryname = "BAHAN PENDUKUNG";
            }
            else if (newvalue === "BAHAN EMBALANCE") {
                this.category = "BE"; 
                this.categoryname = "BAHAN EMBALANCE";
            }else{
                this.category = "";
                this.categoryname = "";
            }
        }else{
            this.unit = "";
            this.unitname = "";
        }
    }

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }
    
}
