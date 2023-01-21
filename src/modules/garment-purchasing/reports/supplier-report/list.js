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
    jnsSpl = false;
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
                  console.log(result);
                  var dataBySupplier = {};
                  var subTotalSupplier = {};
                  for (var data of result) {
                       var Supplier = data.SupplierName;
                        if (!dataBySupplier[Supplier]) dataBySupplier[Supplier] = [];                 
                            dataBySupplier[Supplier].push({                            
                            supplierName : data.SupplierName,
                            unitName : data.UnitName,
                            categoryName : data.CategoryName,
                            paymentMethod : data.PaymentMethod,
                            quantity : data.Quantity,
                            uomUnit : data.UOMUnit,
                            smallQty : data.SmallQty,
                            smallUom : data.SmallUom, 
                            Amount : data.AmountIDR.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        });
                        
                   if (!subTotalSupplier[Supplier]){
                       subTotalSupplier[Supplier] = 0;
                   } 
                       subTotalSupplier[Supplier] += data.AmountIDR;
                }
     
               var suppliers = [];
               this.AmtTotal = 0;
                
               for (var data in dataBySupplier) {
                   suppliers.push({
                   data: dataBySupplier[data],
                   supplier: dataBySupplier[data][0].supplierName,
                   subTotal: (subTotalSupplier[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                 });
                   this.AmtTotal += subTotalSupplier[data];
               }
               this.AmtTotal = this.AmtTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.suppliers = suppliers;
             });
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
        this.category = null; 
        this.suppliers = [];
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 
}