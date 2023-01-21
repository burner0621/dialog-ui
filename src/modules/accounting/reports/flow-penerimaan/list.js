import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var UnitLoader = require('../../../../loader/garment-units-loader');
var SupplierLoader = require('../../../../loader/garment-supplier-loader');
var UnitReceiptLoader = require('../../../../loader/garment-unit-receipt-note-loader');

@inject(Router, Service)
export class List {

     reprosesOption = ['','Bahan Baku', 'Bahan Embalase','Bahan Pendukung','Subkon'];
     unitOption = ['','CENTRAL 2A', 'CENTRAL 2B','CENTRAL 2C/EX. K4','CENTRAL 1A/EX. K3','CENTRAL 1B'];
  constructor(router, service) {
        this.service = service;
        this.router = router;

    }
    @bindable categoryselect
    @bindable unitselect
    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }
    get unitLoader(){
        return UnitLoader;
    }
    unitView = (unit) => {
      
        return `${unit.Code} - ${unit.Name}`
    }

    categoryselectChanged(newvalue) {
        //console.log(newvalue)
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
       // console.log(this.category)
    }
    unitselectChanged(newvalue){
        
        if (newvalue) {
            if (newvalue === "CENTRAL 2A") {
                this.unit = "C2A";
                this.unitname = "CENTRAL 2A";
            }
            else if (newvalue === "CENTRAL 2B") { 
                this.unit = "C2B";
                this.unitname = "CENTRAL 2B";
            }
            else if (newvalue === "CENTRAL 2C/EX. K4") {
                this.unit = "C2C";
                this.unitname = "CENTRAL 2C/EX. K4";
            }else if(newvalue === "CENTRAL 1A/EX. K3"){
                this.unit = "C1A";
                this.unitname = "CENTRAL 1A/EX. K3";
            }else if(newvalue === "CENTRAL 1B"){
                this.unit = "C1B";
                this.unitname = "CENTRAL 1B";
            }else{
                this.unit = "";
                this.unitname = "";
            }
        }

        //console.log(this.unit);
        //console.log(this.uniname);
    }
    get supplierLoader(){
        return SupplierLoader;
    }
     get unitReceiptLoader(){
        return UnitReceiptLoader;
     
    }
   
    // columns = [
    //     { field: "no", title: "No" , sortable: false},
    //     { field: "kdbarang", title: "Kode Barang", sortable: false },
    //     { field: "nmbarang", title: "Nama Barang", sortable: false },
    //     { field: "nopo", title: "No PO", sortable: false },
    //     { field: "keterangan", title: "Keterangan Barang", sortable: false },
    //     { field: "noro", title: "No RO", sortable: false },
    //     { field: "artikel", title: "Artikel", sortable: false },
    //     { field: "kdbuyer", title: "Kode Buyer", sortable: false },
    //     { field: "Jenis", title: "Jenis", sortable: false },
    //     { field: "asal", title: "Asal", sortable: false },
    //     { field: "nobukti", title: "Nomor Bukti", sortable: false },
    //      { field: "tanggal", title: "Tanggal", sortable: false, formatter: function (value, data, index) {
    //             return moment(value).format("DD/MM/YYYY");
    //      }},
    //     { field: "jumlahbeli", title: "Jumlah Beli ", sortable: false },
    //     { field: "satuanbeli", title: "Satuan Beli", sortable: false },
    //     { field: "jumlahterima", title: "Jumlah Terima", sortable: false },
    //     { field: "satuanterima", title: "Satuan Terima", sortable: false },
    //     { field: "jumlah", title: "Jumlah Harga", sortable: false, formatter:(value,data)=>{
    //         return value.toLocaleString('en-EN', { minimumFractionDigits: 2 });
    //         }  
    //     },
    //     { field: "tipepembayaran", title: "Metode Pembayaran", sortable: false },
       
    // ]
    // Values() {
    //     this.arg.dateFrom = this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : null;
    //     this.arg.dateTo = this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : null;
    //     this.arg.category = this.category ? this.category : "";
    //     // this.arg.refNo = this.poRefPR ? this.poRefPR : "";
    //     // this.arg.roNo = this.roNo ? this.roNo : "";
    //     // this.arg.doNo =this.doNo ? this.doNo : "";
    //     // this.arg.supplier =  this.supplier ? this.supplier.code : "";
    //     this.arg.unit = this.unit ? this.unit : "";
    //     console.log(this.arg);
    // }
    
    // listDataFlag = false;
    // loader = (info) => {
    //     var order = {};

    //     if (info.sort)
    //         order[info.sort] = info.order;

    //     this.arg = {
    //         page: parseInt(info.offset / info.limit, 10) + 1,
    //         size: info.limit,
    //         keyword: info.search,
    //         order: order
    //     };
    //     return this.listDataFlag ? (
    //         this.Values(),
    //         this.service.search(this.arg)
    //             .then(result => {
    //                         return {
    //                     total: result.info.total,
    //                     data: result.data,
    //                 }
    //             })
    //     ) : { total: 0, data: {} };
    // }
    search() {
        // console.log(this.dateTo);
        let args = {
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : null,
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            category : this.category ? this.category : "",
            unit : this.unit ? this.unit : ""
          }
        //this.listDataFlag = true;
        this.service.search(args)
            .then(result => {
                console.log(result)
                this.AmountTotal1 = 0;
                this.AmountTotal2 = 0;
                this.data=[];
                //var datatemp = [];
                for (var i of result){
                    
                    this.AmountTotal1 += i.jumlahterima;
                    this.AmountTotal2 += i.jumlah;
                    i.jumlah = i.jumlah.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

                    this.data.push(i);
                }
                this.AmountTotal1 = this.AmountTotal1.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                this.AmountTotal2 = this.AmountTotal2.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                // this.data = result.data;
            })

        // this.table.refresh();
    }


    
     ExportToExcel() {
        console.log(this.unitname);
        var info = {
            
            category : this.category ? this.category : "",
            categoryname: this.category === "BB" ? "GUDANG BAHAN BAKU" : this.category === "BE" ? "GUDANG BAHAN EMBALASE" : this.category === "BP" ?  "GUDANG BAHAN PENDUKUNG" : "",
            unit : this.unit ? this.unit : "",
            unitname: this.unitname ? this.unitname: "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        console.log(info);
        this.service.generateXls(  info.unit,  info.category, info.dateFrom, info.dateTo, info.unitname, info.categoryname)
    }
  

    reset() {
       
    
        this.unit = "";
        this.dateFrom = "";
        this.dateTo = "";
        this.category = "";
      
        
    }
}
