import { inject, bindable } from 'aurelia-framework';
import { Service,CoreService } from "./service";
import { Router } from 'aurelia-router';
var moment = require('moment');

@inject(Router, Service,CoreService)
export class List {
    
    @bindable selectedUnit;
    async bind(context) {
        this.context = context;
        if (!this.unit) {
            var units = await this.coreService.getSampleUnit({ size: 1, keyword: 'SMP1', filter: JSON.stringify({ Code: 'SMP1' }) });
            this.selectedUnit = units.data[0];
            this.unit=this.selectedUnit;
        }
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`
    }

    constructor(router, service,coreService) {
        this.service = service;
        this.router = router;
        this.today = new Date();
        this.coreService=coreService;
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

    @bindable KtgrItem;
    
    KategoriItems= ['','BAHAN BAKU','BAHAN EMBALANCE','BAHAN PENDUKUNG'];

    search(){
            this.info.page = 1;
            this.info.total=0;
            this.searching();        
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
        console.log(args)
        this.service.search(args)
            .then(result=>{
                this.data=[];
                
                for(var _data of result.data){
                    
                    if(args.unitcode == "C2A"){
                        _data.ReceiptPurchaseQty = _data.ReceiptPurchaseQty + _data.ReceiptKon2AQty,
                        _data.ReceiptPurchasePrice = _data.ReceiptPurchasePrice + _data.ReceiptKon2APrice
                    }else if (args.unitcode == "C2B"){
                        _data.ReceiptPurchaseQty = _data.ReceiptPurchaseQty + _data.ReceiptKon2BQty,
                        _data.ReceiptPurchasePrice = _data.ReceiptPurchasePrice + _data.ReceiptKon2BPrice
                    }else if (args.unitcode == "C2C"){
                        _data.ReceiptPurchaseQty = _data.ReceiptPurchaseQty + _data.ReceiptKon2CQty,
                        _data.ReceiptPurchasePrice = _data.ReceiptPurchasePrice + _data.ReceiptKon2CPrice
                    }else if (args.unitcode == "C1A"){
                        _data.ReceiptPurchaseQty = _data.ReceiptPurchaseQty + _data.ReceiptKon1AQty,
                        _data.ReceiptPurchasePrice = _data.ReceiptPurchasePrice + _data.ReceiptKon1APrice
                    }else{
                        _data.ReceiptPurchaseQty = _data.ReceiptPurchaseQty + _data.ReceiptKon1BQty,
                        _data.ReceiptPurchasePrice = _data.ReceiptPurchasePrice + _data.ReceiptKon1BPrice
                    }
                
                    _data.ReceiptPurchasePrice = _data.ReceiptPurchasePrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.BeginningBalancePrice = _data.BeginningBalancePrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.EndingBalancePrice = _data.EndingBalancePrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ExpendKon1APrice = _data.ExpendKon1APrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ExpendKon2APrice = _data.ExpendKon2APrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ExpendKon2BPrice = _data.ExpendKon2BPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ExpendKon2CPrice = _data.ExpendKon2CPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ExpendKon1BPrice = _data.ExpendKon1BPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ExpendProcessPrice = _data.ExpendProcessPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ExpendRestPrice = _data.ExpendRestPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ExpendReturPrice = _data.ExpendReturPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ExpendSamplePrice = _data.ExpendSamplePrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ReceiptCorrectionPrice = _data.ReceiptCorrectionPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ReceiptKon1APrice = _data.ReceiptKon1APrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ReceiptKon2APrice = _data.ReceiptKon2APrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ReceiptKon2BPrice = _data.ReceiptKon2BPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ReceiptKon2CPrice = _data.ReceiptKon2CPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ReceiptKon1BPrice = _data.ReceiptKon1BPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ReceiptProcessPrice = _data.ReceiptProcessPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    // _data.ExpendSubconPrice = _data.ExpendSubconPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    // _data.ExpendOtherPrice = _data.ExpendOtherPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    this.data.push(_data);

                }
                console.log(this.data)
                this.info.total=result.info.total
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
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            unitcode : this.unit ? this.unit.Code : "",
            category : this.category ? this.category : "",
            categoryname: this.categoryname ? this.categoryname : "",
            unitname: this.unit ? this.unit.Name : ""
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

    UnitItemChanged(newvalue){
        console.log(newvalue);
        if (newvalue) {
            if (newvalue === "KONFEKSI 2A") {
                this.unit = "C2A";
                this.unitname = "KONFEKSI 2A";
            }
            else if (newvalue === "KONFEKSI 2B") { 
                this.unit = "C2B"; 
                this.unitname = "KONFEKSI 2B";
            }
            else if (newvalue === "KONFEKSI 2C") {
                this.unit = "C2C"; 
                this.unitname = "KONFEKSI 2C";
            }else if(newvalue === "KONFEKSI 1A"){
                this.unit = "C1A";
                this.unitname = "KONFEKSI 1A";
            }else if(newvalue === "KONFEKSI 1B"){
                this.unit = "C1B";
                this.unitname = "KONFEKSI 1B";
            }else{
                this.unit = "";
                this.unitname = "";
            }
        }else{
            this.unit = "";
            this.unitname = "";
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
