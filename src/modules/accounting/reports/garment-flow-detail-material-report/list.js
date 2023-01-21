import { inject, bindable } from 'aurelia-framework';
import moment from 'moment';
import { Service } from './service';
import { Router } from 'aurelia-router';

var UnitLoader = require('../../../../loader/garment-units-loader');

@inject(Router, Service)
export class List {
    @bindable KtgrItem;
    // @bindable categoryselect
    @bindable unitselect
    KategoriItem = ['','BAHAN BAKU','BAHAN PENDUKUNG', 'BAHAN EMBALACE'];
    unitOption = ['','CENTRAL 2A', 'CENTRAL 2B','CENTRAL 2C/EX. K4','CENTRAL 1A/EX. K3','CENTRAL 1B'];

    KtgrItemChanged(newvalue){
        if (newvalue) {
            if (newvalue === "BAHAN BAKU") {
                this.category = "BB";
                this.categoryname = "BAHAN BAKU";
                this.productcode = "";
            }
            else if (newvalue === "BAHAN PENDUKUNG") { 
                this.category = "BP";
                this.categoryname = "BAHAN PENDUKUNG";
                this.productcode = "";
            }
            else if (newvalue === "BAHAN EMBALACE") {
                this.category = "BE"; 
                this.categoryname = "BAHAN EMBALACE";
                this.productcode = "";
            }
            // else if(newvalue === "INTERLINING"){

            //     this.category = "BP";
            //     this.productcode = "INT";
            //     this.categoryname = "PROSES";
            // }
        }
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
    constructor(router, service) {
        this.service = service;
        this.router = router;
    }
 
    // columns = [
    //     { field: "ProductCode", title: "Kode Barang" , sortable: false},
    //     { field: "ProductName", title: "Nama Barang" , sortable: false},
        
    //     { field: "POSerialNumber", title: "No PO", sortable: false },
    //     { field: "ProductRemark", title: "Keterangan Barang", sortable: false },
    //     { field: "RONo", title: "No. R/O", sortable: false },
    //     { field: "Article", title: "Artikel", sortable: false },
    //     { field: "BuyerCode", title: "Kode Buyer", sortable: false },
    //     { field: "RONoDO", title: "Untuk RO", sortable: false },
    //     { field: "ArticleDO", title: "Untuk Artikel", sortable: false },
    //     { field: "UnitDestination", title: "Tujuan", sortable: false },
    //     { field: "UnitDOType", title: "Jenis", sortable: false },
    //     { field: "UENNo", title: "No. Bukti", sortable: false },
         
    //     { field: "ExpenditureDate", title: "Tanggal", sortable: false, formatter: function (value, data, index) {
    //         return moment(value).format("DD/MM/YYYY");
    //     }},
    //     { field: "Quantity", title: "Quantity", sortable: false },
    //     { field: "UomUnit", title: "Satuan", sortable: false },
    //     { field: "Total", title: "Jumlah", sortable: false, formatter:(value,data)=>{
    //         return value.toLocaleString('en-EN', { minimumFractionDigits: 2 });
    //     }  }
       
    // ]   ;

    // controlOptions = {
    //     label: {
    //         length: 4,
    //     },
    //     control: {
    //         length: 4,
    //     },
    // };

    // tableOptions = {
    //     showColumns: false,
    //     search: false,
    //     showToggle: false,
    // };

    

    // loader = (info) => {
    //     // console.log(this);
    //     let order = {};
    //     if (info.sort)
    //         order[info.sort] = info.order;

    //     let filter = {};

    //     if (this.category) {
    //         filter.category = this.category;
    //     }
    //     if (this.productcode) {
    //         filter.productcode = this.productcode;
    //     }
    //     if (this.unit) {
    //         filter.unit = this.unit.Code;
    //         //filter.unitname = this.unit.Name
    //     }
    //     if (this.dateFrom && this.dateFrom != 'Invalid Date') {
    //         filter.dateFrom = this.dateFrom;
    //         filter.dateTo = this.dateTo;

    //         filter.dateFrom = moment(filter.dateFrom).format("MM/DD/YYYY");
    //         filter.dateTo = moment(filter.dateTo).format("MM/DD/YYYY");
    //     }

    //     let arg = {
    //         page: parseInt(info.offset / info.limit, 10) + 1,
    //         size: info.limit,
    //         // filter: JSON.stringify(filter),
    //         order: order,
    //         // select: ['no', 'date', 'dueDate', 'invoceNo', 'supplier.name', 'division.name', 'position'],
    //     };

    //     Object.assign(arg, filter);

    //     return this.flag ? (
    //         this.service.search(arg)
    //             .then(result => {
    //                 // let unitPaymentOrders = result.data.map(p => p.no);

    //                 // return this.azureService.search({ unitPaymentOrders })
    //                 // .then(response => {
    //                 // let expeditions = response.data;

    //                 // for (let d of result.data) {
    //                 //     let expedition = expeditions.find(p => p.UnitPaymentOrderNo == d.no);

    //                 //     if (expedition) {
    //                 //         Object.assign(d, expedition);
    //                 //     }
    //                 // }

    //                 return {
    //                     total: result.info.total,
    //                     data: result.data
    //                 }
    //                 // });
    //             })
    //     ) : { total: 0, data: [] };
    // }

    search() {
        //this.flag = true;
        let args = {
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : null,
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            category : this.category ? this.category : "",
            unit : this.unit ? this.unit : "",
            productcode : this.productcode != "" ? this.productcode : "",
          }
          this.service.search(args)
          .then(result => {
              console.log(result)
              this.AmountTotal1 = 0;
              this.AmountTotal2 = 0;
              this.data=[];
              //var datatemp = [];
              for (var i of result){
                  
                  this.AmountTotal1 += i.Quantity;
                  this.AmountTotal2 += i.Total;
                  i.Total = i.Total.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

                  this.data.push(i);
              }
              this.AmountTotal1 = this.AmountTotal1.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
              this.AmountTotal2 = this.AmountTotal2.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
              // this.data = result.data;
          })
        // this.tableList.refresh();
    }

    reset() {
        this.flag = false;
        this.category = undefined;
        this.KtgrItem ="";
        this.dateFrom = undefined;
        this.dateTo = undefined;
        // this.tableList.refresh();
    }

    xls() {
        let filter = {};


        if (this.category) {
            filter.category = this.category;
            filter.categoryname = this.categoryname;
        }
        if (this.productcode) {
            filter.productcode = this.productcode;
        }
        if (this.unit){
          filter.unit = this.unit;
          filter.unitname = this.unitname;
        }

        if (this.dateFrom && this.dateFrom != 'Invalid Date') {
            filter.dateFrom = this.dateFrom;
            filter.dateTo = this.dateTo;

            filter.dateFrom = moment(filter.dateFrom).format("MM/DD/YYYY");
            filter.dateTo = moment(filter.dateTo).format("MM/DD/YYYY");
        }

        this.service.xls(filter);
    }

    unitView = (unit) => {

      return `${unit.Code} - ${unit.Name}`
    }

    get unitLoader() {
      return UnitLoader;
    }
    
}
