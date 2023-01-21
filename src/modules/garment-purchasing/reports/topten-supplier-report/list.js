import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
var UnitLoader = require('../../../../loader/unit-loader');

@inject(Router, Service)
export class List {
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
   
    unit=null;    
    //jnsSpl = false;
    payMtd = " ";    
    category= " ";
    dateFrom = null;
    dateTo = null;
    @bindable JenisSpl;
    @bindable KtgrItem;
         
    SupplierType = ['LOCAL', 'IMPORT'];
    KategoriItem = ['','BAHAN BAKU', 'INTERLINING', 'BAHAN PENDUKUNG'];
   
    termPaymentLocal = ['', 'DAN LIRIS', 'CMT', 'FREE FROM BUYER', 'SAMPLE']; 
    termPaymentImport = ['','T/T PAYMENT', 'CMT', 'FREE FROM BUYER', 'SAMPLE'];

    get unitLoader() {
        return UnitLoader;
    }

    activate() {
       
    }

    JenisSplChanged(newvalue) {
        if (newvalue) {
            this.jnsSpl = newvalue === "LOCAL" ? false : true;          
        }
        console.log(this.jnsSpl);
    }

    KtgrItemChanged(newvalue) {
        if (newvalue) {
            if (newvalue === "BAHAN BAKU") {
                this.category = "FABRIC";
            }
            else if (newvalue === "INTERLINING") { 
                this.category = "INTERLINING"; 
            }
            else {
                this.category = "BAHAN PENDUKUNG"; 
            }
        }
    }

    searching() {
        {
            var info = {
            unit : this.unit ? this.unit.Id : "",
            jnsSpl : this.jnsSpl ? this.jnsSpl : "",
            payMtd : this.payMtd ? this.payMtd : "",            
            category : this.category ? this.category : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.search(info)
            .then(result => {
                this.data=[];

                for(var _data of result){
                    
                    _data.Amount=_data.Amount.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.AmountIDR=_data.AmountIDR.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});

                    this.data.push(_data);
                }
                  console.log(this.data);
                 
                
               
             })
        }
    }

    ExportToExcel() {
        {
            var filter = {
            unit : this.unit ? this.unit.Id : "",
            jnsSpl : this.jnsSpl ? this.jnsSpl : "",
            payMtd : this.payMtd ? this.payMtd : "",            
            category : this.category ? this.category : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
           }

        this.service.generateExcel(filter)
            .catch(e => {
                alert(e.replace(e, "Error: ",""))
            });
        }
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.unit = null;
        this.category = undefined; 
        this.suppliers = undefined;
        this.jnsSpl = null;
        this.JenisSpl ="";
        this.KtgrItem="";
        this.data=null;
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 
}