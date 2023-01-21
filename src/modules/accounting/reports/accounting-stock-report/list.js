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
    tableData = []
    searching() {
        var args = {
            page: this.info.page,
            size: this.info.size,
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            unitcode : this.unit ? this.unit : "",
            category : this.category ? this.category : "",
            //suppliertype : this.Tipe
        };
        console.log(args)
        this.service.search(args)
            .then(result=>{
                // console.log(result)
                this.data=[];
                // this.AmountTotal1 = 0;
                // this.AmountTotal2 = 0;
                // this.AmountTotal3 = 0;
                // this.AmountTotal4 = 0;
                // this.AmountTotal5 = 0;
                // this.AmountTotal6 = 0;
                // this.AmountTotal7 = 0;
                // this.AmountTotal8 = 0;
                // this.AmountTotal9 = 0;
                // this.AmountTotal10 = 0;
                // this.AmountTotal11 = 0;
                // this.AmountTotal12 = 0;
                // this.AmountTotal13 = 0;
                // this.AmountTotal14 = 0;
                // this.AmountTotal15 = 0;
                // this.AmountTotal16 = 0;
                // this.AmountTotal17 = 0;
                // this.AmountTotal18 = 0;
                // this.AmountTotal19 = 0;
                // this.AmountTotal20 = 0;
                // this.AmountTotal21 = 0;
                // this.AmountTotal22 = 0;
                // this.AmountTotal23 = 0;
                // this.AmountTotal24 = 0;
                // this.AmountTotal25 = 0;
                // this.AmountTotal26 = 0;
                // this.AmountTotal27 = 0;
                // this.AmountTotal28 = 0;
                // this.AmountTotal29 = 0;
                // this.AmountTotal30 = 0;
                // this.AmountTotal31 = 0;
                // this.AmountTotal32 = 0;
                // this.AmountTotal33 = 0;
                // this.AmountTotal34 = 0;
                // this.AmountTotal35 = 0;
                // this.AmountTotal36 = 0;
                // this.AmountTotal37 = 0;
                // this.AmountTotal38 = 0;
                for(var _data of result.data){
                    //console.log(_data)
                    
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
                // this.AmountTotal1 += _data.BeginningBalanceQty;
                // this.AmountTotal2 += _data.BeginningBalancePrice;
                // this.AmountTotal3 += _data.ReceiptCorrectionQty;
                // this.AmountTotal4 += _data.ReceiptCorrectionPrice;
                // this.AmountTotal5 += _data.ReceiptPurchaseQty;
                // this.AmountTotal6 += _data.ReceiptPurchasePrice;
                // this.AmountTotal7 += _data.ReceiptProcessQty;
                // this.AmountTotal8 += _data.ReceiptProcessPrice;
                // this.AmountTotal9 += _data.ReceiptKon2AQty;
                // this.AmountTotal10 += _data.ReceiptKon2APrice;
                // this.AmountTotal11 += _data.ReceiptKon2BQty;
                // this.AmountTotal12 += _data.ReceiptKon2BPrice;
                // this.AmountTotal13 += _data.ReceiptKon2CQty;
                // this.AmountTotal14 += _data.ReceiptKon2CPrice;
                // this.AmountTotal15 += _data.ReceiptKon1AQty;
                // this.AmountTotal16 += _data.ReceiptKon1APrice;
                // this.AmountTotal17 += _data.ReceiptKon1BQty;
                // this.AmountTotal18 += _data.ReceiptKon1BPrice;
                // this.AmountTotal19 += _data.ExpendReturQty;
                // this.AmountTotal20 += _data.ExpendReturPrice;
                // this.AmountTotal21 += _data.ExpendRestQty;
                // this.AmountTotal22 += _data.ExpendRestPrice;
                // this.AmountTotal23 += _data.ExpendProcessQty;
                // this.AmountTotal24 += _data.ExpendProcessPrice;
                // this.AmountTotal25 += _data.ExpendSampleQty;
                // this.AmountTotal26 += _data.ExpendSamplePrice;
                // this.AmountTotal27 += _data.ExpendKon2AQty;
                // this.AmountTotal28 += _data.ExpendKon2APrice;
                // this.AmountTotal29 += _data.ExpendKon2BQty;
                // this.AmountTotal30 += _data.ExpendKon2BPrice;
                // this.AmountTotal31 += _data.ExpendKon2CQty;
                // this.AmountTotal32 += _data.ExpendKon2CPrice;
                // this.AmountTotal33 += _data.ExpendKon1AQty;
                // this.AmountTotal34 += _data.ExpendKon1APrice;
                // this.AmountTotal35 += _data.ExpendKon1BQty;
                // this.AmountTotal36 += _data.ExpendKon1BPrice;
                // this.AmountTotal37 += _data.EndingBalanceQty;
                // this.AmountTotal38 += _data.EndingBalancePrice;
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
                    _data.ExpendSubconPrice = _data.ExpendSubconPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ReceiptCorrectionPrice = _data.ReceiptCorrectionPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ReceiptKon1APrice = _data.ReceiptKon1APrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ReceiptKon2APrice = _data.ReceiptKon2APrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ReceiptKon2BPrice = _data.ReceiptKon2BPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ReceiptKon2CPrice = _data.ReceiptKon2CPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ReceiptKon1BPrice = _data.ReceiptKon1BPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ReceiptProcessPrice = _data.ReceiptProcessPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ReceiptSubconPrice = _data.ReceiptSubconPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    _data.ReceiptPurchasePrice = _data.ReceiptPurchasePrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    this.data.push(_data);

                }
                // this.AmountTotal1 = this.AmountTotal1.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal2 = this.AmountTotal2.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal3 = this.AmountTotal3.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal4 = this.AmountTotal4.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal5 = this.AmountTotal5.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal6 = this.AmountTotal6.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal7 = this.AmountTotal7.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal8 = this.AmountTotal8.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal9 = this.AmountTotal9.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal10 = this.AmountTotal10.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal11 = this.AmountTotal11.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal12 = this.AmountTotal12.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal13 = this.AmountTotal13.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal14 = this.AmountTotal14.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal15 = this.AmountTotal15.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal16 = this.AmountTotal16.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal17 = this.AmountTotal17.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal18 = this.AmountTotal18.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal19 = this.AmountTotal19.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal20 = this.AmountTotal20.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal21 = this.AmountTotal21.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal22 = this.AmountTotal22.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal23 = this.AmountTotal23.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal24 = this.AmountTotal24.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal25 = this.AmountTotal25.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal26 = this.AmountTotal26.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal27 = this.AmountTotal27.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal28 = this.AmountTotal28.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal29 = this.AmountTotal29.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal30 = this.AmountTotal30.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal31 = this.AmountTotal31.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal32 = this.AmountTotal32.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal33 = this.AmountTotal33.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal34 = this.AmountTotal34.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal35 = this.AmountTotal35.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal36 = this.AmountTotal36.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal37 = this.AmountTotal37.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // this.AmountTotal38 = this.AmountTotal38.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                //console.log(this.data)

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
            unitcode : this.unit ? this.unit : "",
            category : this.category ? this.category : "",
            categoryname: this.categoryname ? this.categoryname : "",
            unitname: this.unitname ? this.unitname : ""
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
