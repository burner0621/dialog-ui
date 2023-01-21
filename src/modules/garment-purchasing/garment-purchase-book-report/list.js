import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
var UnitLoader = require('../../../loader/unit-loader');

@inject(Router, Service)
export class List {
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
        this.YearItem = [ ,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010
    ,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025
    ,2026,2027,2028,2029,2030];
    }
   
    unit=null;    
    jnsSpl = false;
    payMtd = " ";    
    category= " ";
    dateFrom = null;
    dateTo = null;
    @bindable JenisSpl;
    @bindable KtgrItem;
    @bindable Year;
         
    SupplierType = ['LOCAL', 'IMPORT'];
    KategoriItem = ['','BAHAN BAKU', 'NON BAHAN BAKU'];
    
   
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
    }

    KtgrItemChanged(newvalue) {
        if (newvalue) {
            if (newvalue === "BAHAN BAKU") {
                this.category = "FABRIC";
            }
           
            else {
                this.category = "NON BAHAN BAKU"; 
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
            year : this.Year ? this.Year: 0,
            // dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            // dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.search(info)
            .then(result => {
                this.data=[];
                this.jan_qty =0 ;
                this.feb_qty =0 ;
                this.mar_qty =0 ;
                this.apr_qty =0 ;
                this.mei_qty =0 ;
                this.jun_qty =0 ;
                this.jul_qty=0;
                this.aug_qty=0;
                this.sep_qty=0;
                this.oct_qty=0;
                this.nov_qty=0;
                this.dec_qty=0;

                this.jan_nom =0 ;
                this.feb_nom =0 ;
                this.mar_nom =0 ;
                this.apr_nom =0 ;
                this.mei_nom =0 ;
                this.jun_nom =0 ;
                this.jul_nom=0;
                this.aug_nom=0;
                this.sep_nom=0;
                this.oct_nom=0;
                this.nov_nom=0;
                this.dec_nom=0;
                var subTotalSupplier1 = {};
                for(var _data of result){
                    this.jan_qty += _data.Qty_Jan;
                    this.feb_qty += _data.Qty_Feb;
                    this.mar_qty += _data.Qty_Mar;
                    this.apr_qty += _data.Qty_Apr;
                    this.mei_qty += _data.Qty_Mei;
                    this.jun_qty += _data.Qty_Jun;
                    this.jul_qty += _data.Qty_Jul;
                    this.aug_qty += _data.Qty_Aug;
                    this.sep_qty += _data.Qty_Sep;
                    this.nov_qty += _data.Qty_Nov;
                    this.dec_qty += _data.Qty_Dec;

                    this.jan_nom += _data.Nominal_Jan;
                    this.feb_nom += _data.Nominal_Feb;
                    this.mar_nom += _data.Nominal_Mar;
                    this.apr_nom += _data.Nominal_Apr;
                    this.mei_nom += _data.Nominal_Mei;
                    this.jun_nom += _data.Nominal_Jun;
                    this.jul_nom += _data.Nominal_Jul;
                    this.aug_nom += _data.Nominal_Aug;
                    this.sep_nom += _data.Nominal_Sep;
                    this.oct_nom += _data.Nominal_Oct;
                    this.nov_nom += _data.Nominal_Nov;
                    this.dec_nom += _data.Nominal_Dec;

                    _data.Qty_Jan=_data.Qty_Jan.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Qty_Feb=_data.Qty_Feb.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Qty_Mar=_data.Qty_Mar.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Qty_Apr=_data.Qty_Apr.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Qty_Mei=_data.Qty_Mei.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Qty_Jun=_data.Qty_Jun.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Qty_Jul=_data.Qty_Jul.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Qty_Aug=_data.Qty_Aug.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Qty_Sep=_data.Qty_Sep.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Qty_Oct=_data.Qty_Oct.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Qty_Nov=_data.Qty_Nov.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Qty_Dec=_data.Qty_Dec.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Nominal_Jan=_data.Nominal_Jan.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Nominal_Feb=_data.Nominal_Feb.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Nominal_Mar=_data.Nominal_Mar.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Nominal_Apr=_data.Nominal_Apr.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Nominal_Mei=_data.Nominal_Mei.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Nominal_Jun=_data.Nominal_Jun.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Nominal_Jul=_data.Nominal_Jul.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Nominal_Aug=_data.Nominal_Aug.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Nominal_Sep=_data.Nominal_Sep.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Nominal_Oct=_data.Nominal_Oct.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Nominal_Nov=_data.Nominal_Nov.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    _data.Nominal_Dec=_data.Nominal_Dec.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});

                    this.data.push(_data);
                }

                this.jan_qty = this.jan_qty.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                this.feb_qty = this.feb_qty.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                this.mar_qty = this.mar_qty.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                this.apr_qty = this.apr_qty.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                this.mei_qty = this.mei_qty.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                this.jun_qty = this.jun_qty.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                this.jul_qty = this.jul_qty.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                this.aug_qty = this.aug_qty.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                this.sep_qty = this.sep_qty.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                this.oct_qty = this.oct_qty.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                this.nov_qty = this.nov_qty.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                this.dec_qty = this.dec_qty.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});

                this.jan_nom = this.jan_nom.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                this.feb_nom = this.feb_nom.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                this.mar_nom = this.mar_nom.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                this.apr_nom = this.apr_nom.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                this.mei_nom = this.mei_nom.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                this.jun_nom = this.jun_nom.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                this.jul_nom = this.jul_nom.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                this.aug_nom = this.aug_nom.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                this.sep_nom = this.sep_nom.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                this.oct_nom = this.oct_nom.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                this.nov_nom = this.nov_nom.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                this.dec_nom = this.dec_nom.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});

                console.log(this.jan_qty);
            
                
                
               
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
                year : this.Year ? this.Year: 0,
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
        this.Year =null;
    }

    // dateFromChanged(e) {
    //     var _startDate = new Date(e.srcElement.value);
    //     var _endDate = new Date(this.dateTo);

    //     if (_startDate > _endDate)
    //         this.dateTo = e.srcElement.value;

    // } 
}