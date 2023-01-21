import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var SupplierLoader = require('../../../loader/garment-supplier-loader');

@inject(Service)
export class List {
    info = { page: 1,size:25};
    constructor(service) {
        this.service = service;

        this.flag = false;
        
        this.today = new Date();
        this.error = {};
    }
    @bindable KtgrItem;
    @bindable Tipe;
    bind(context) {
        console.log(context);
        this.context = context;
    }
    get supplierLoader(){
        return SupplierLoader;
    }
    SupplierItem = ['','LOCAL', 'IMPORT'];
    KategoriItem = ['','BAHAN BAKU','BAHAN PENDUKUNG', 'BAHAN EMBALANCE','PROSES'];

    KtgrItemChanged(newvalue){
        if (newvalue) {
            if (newvalue === "BAHAN BAKU") {
                this.category = "BB";
            }
            else if (newvalue === "BAHAN PENDUKUNG") { 
                this.category = "BP"; 
            }
            else if (newvalue === "BAHAN EMBALANCE") {
                this.category = "BE"; 
            }else if(newvalue === "PROSES"){
                this.category = "PRC";
            }else{
                this.category = "";
            }
        }
    }
   get suppQuery(){
        var i
         if(this.suppliertype === "LOCAL"){
                i = false;
                //supp = {"Import" : this.suppliertype}
                
                var supp = {"Import":i}
            }else if(this.suppliertype === "IMPORT"){
                i = true;
                // this.suppQuery = {"Import" : this.suppliertype}
                // SupplierItem
                var supp = {"Import":i}
            }else{
                i = "";
                // this.suppQuery = {"Import" : this.suppliertype}
            }
        //var i = this.suppliertype === "LOCAL" ? false : true;
        
        this.Tipe = i
        //console.log(this.Tipe);
        
        return supp;
    }
    searching(){
        console.log(this.Tipe);
        var info = {
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            category : this.category ? this.category : "",
            supplier : this.supplier ? this.supplier.code : "",
            suppliertype : this.Tipe
        };
        this.service.search(info)
            .then(result => {
                var databySupp = {};
                var subTotalDPPSup= {};
               var subTotalPPNSup = {};
               var subTotalSup = {};
            for(var data of result){
                console.log(data);
                var supp = data.SupplierName;
                if(!databySupp[supp]) databySupp[supp] = [];
                    databySupp[supp].push({
                        supplierName : data.SupplierName,
                        billNo : data.BillNo,
                        paymentBill : data.PaymentBill,
                        dono : data.Dono,
                        invoiceNo : data.InvoiceNo,
                        Inno : data.InternNo,
                        ktgori : data.Tipe,
                        indate : data.internDate,
                        pymentduedate : moment(data.paymentduedate).format("DD MMM YYYY") == "01 Jan 1970" ? "-" : moment(data.paymentduedate).format("DD MMM YYYY"),
                        dpp : data.dpp.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        ppn : data.totalppn.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        total : data.total.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        currencycode : data.CurrencyCode,
                        currencyrate : data.CurrencyRate.toLocaleString('en-EN', {minimumFractionDigits : 2, maximumFractionDigits: 2})
                    });
                if(!subTotalSup[supp]){
                    subTotalSup[supp]=0;
                    subTotalDPPSup[supp]=0;
                    subTotalPPNSup[supp]=0;
                }
                    subTotalSup[supp] += (data.total);
                    subTotalPPNSup[supp] += (data.totalppn);
                    subTotalDPPSup[supp] += (data.dpp);
                    //console.log( subTotalCategory[kategori])
             }

             var categories = [];
             this.jmltotal = 0;
             this.totalDPP = 0;
             this.totalPPN = 0;

             for (var data in databySupp){
                 categories.push({
                     data: databySupp[data],
                     supplier : databySupp[data][0].supplierName,
                     subtotalDPP : subTotalDPPSup[data].toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                     subtotalPPN : subTotalPPNSup[data].toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                     subtotal : subTotalSup[data].toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                 });
                 //console.log(subTotalCategory[data]);
                 this.jmltotal += subTotalSup[data];
                 this.totalDPP += subTotalDPPSup[data];
                 this.totalPPN += subTotalPPNSup[data];
             }
             this.jmltotal = this.jmltotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
             this.totalPPN = this.totalPPN.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
             this.totalDPP = this.totalDPP.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
             this.categories = categories;
             console.log(categories);
            });
    
    }
    ExportToExcel(){
        {
            var filter = {
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            category : this.category ? this.category : "",
            supplier : this.supplier ? this.supplier.Id : "",
            suppliertype: this.Tipe
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
        this.supplier = "";
        //this.suppliertype = [];
        //this.internNote = null;
        //this.currency = null;
        //this.KategoriItem = KategoriItem; 
    }
}
