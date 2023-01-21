import { inject } from 'aurelia-framework';
import { Service } from "./service";

import moment from 'moment';

var UnitLoader = require('../../../loader/unit-loader');
var PRLoader = require('../../../loader/purchase-request-all-loader');
var BudgetLoader = require('../../../loader/budget-loader');
var CategoryLoader = require('../../../loader/category-loader');
var ProductLoader = require('../../../loader/product-purchasing-null-tags-loader');

@inject(Service)

export class List {
    constructor(service) {
        this.service = service;

        this.flag = false;
        this.statuses = ["", "Belum diterima Pembelian", "Sudah diterima Pembelian", "Sudah diorder ke Supplier"];//,"Barang sudah datang sebagian","Barang sudah datang semua"];
        this.poStatuses = ["","Dibatalkan","PO Internal belum diorder","Sudah dibuat PO Eksternal","Sudah diorder ke Supplier","Barang sudah datang parsial","Barang sudah datang semua","Barang sudah diterima Unit parsial","Barang sudah diterima Unit semua","Sudah dibuat SPB sebagian","Sudah dibuat SPB semua"];
        
        this.error = {};
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }

    columns = [
        { field: "index", title: "No" , sortable: false},
        { field: "unit", title: "Unit" , sortable: false },
        { field: "category", title: "Kategori", sortable: false },
        { field: "budget", title: "Budget", sortable: false },
        { field: "date", title: "Tanggal PR", sortable: false, formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "no", title: "Nomor PR" , sortable: false},
        { field: "productCode", title: "Kode Barang", sortable: false },
        { field: "productName", title: "Nama Barang", sortable: false },
        // { field: "quantity", title: "Jumlah Diminta", sortable: false },
        { field: "quantity", title: "Jumlah Diminta", sortable: false, formatter:(value,data)=>{
            return value.toLocaleString('en-EN', { minimumFractionDigits: 2 });
        }  },
        { field: "uom", title: "Satuan Diminta", sortable: false },
        { field: "expectedDeliveryDatePR", title: "Tgl diminta datang PR", sortable: false, formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(value).format("DD MMM YYYY");
            }
        },
        { field: "expectedDeliveryDatePO", title: "Tgl diminta datang PO Eksternal", sortable: false, formatter: function (value, data, index) {
            
                return moment(value).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(value).format("DD MMM YYYY");
            }
        },
        { field: "dealQuantity", title: "Jumlah Deal PO Eksternal", sortable: false, formatter:(value,data)=>{
            return value.toLocaleString('en-EN', { minimumFractionDigits: 2 });
        }  },
        // { field: "dealQuantity", title: "Jumlah Deal PO Eksternal", sortable: false, formatter:(value,data)=>{
        //     return value.toLocaleString('en-EN', { minimumFractionDigits: 2 });
        // }  },
        { field: "dealUom", title: "Satuan Deal PO Eksternal", sortable: false },
        { field: "prStatus", title: "Status PR", sortable: false },
        { field: "poStatus", title: "Status Barang", sortable: false },
    ];

    search() {
        this.error = {};


        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            this.prTable.refresh();
        }
    }

    reset() {
        this.pr=null;
        this.unit = null;
        this.category = null;
        this.budget = null;
        this.poStatus = "";
        this.prStatus = "";
        this.dataProduct = null;
        this.dateTo = undefined;
        this.dateFrom = undefined;
        this.error = {};

        this.flag = false;
        //this.prTable.refresh();
    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        let args = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            no: this.pr ? this.pr.no : "",
            unitId: this.unit ? this.unit.Id : "",
            categoryId: this.category ? this.category._id : "",
            budgetId: this.budget ? this.budget._id : "",
            productId: this.dataProduct ? this.dataProduct.Id: "",
            prStatus: this.prStatus,
            poStatus: this.poStatus,
            dateTo: this.dateTo? moment(this.dateTo).format("MM/DD/YYYY"):"",
            dateFrom: this.dateFrom? moment(this.dateFrom).format("MM/DD/YYYY"):"",

        };

        return this.flag ?
            (
                this.service.search(args)
                    .then(result => {
                        var index=0;
                        for(var a of result.data){
                            index++;
                            a.index=index;
                            if(a.isCanceled){
                                a.status="Dibatalkan";
                            }
                        }
                        return {
                            total: result.info.total,
                            data: result.data
                        };
                    })
            ) : { total: 0, data: [] };
    }

    xls() {
        this.error = {};

        if (Object.getOwnPropertyNames(this.error).length === 0) {
            let args = {
            no: this.pr ? this.pr.no : "",
            unitId: this.unit ? this.unit.Id : "",
            categoryId: this.category ? this.category._id : "",
            budgetId: this.budget ? this.budget._id : "",
            productId: this.dataProduct ? this.dataProduct.Id: "",
            prStatus: this.prStatus,
            poStatus: this.poStatus,
            dateTo: this.dateTo? moment(this.dateTo).format("MM/DD/YYYY"):"",
            dateFrom: this.dateFrom? moment(this.dateFrom).format("MM/DD/YYYY"):"",

        };

            this.service.getXls(args)
                .catch(e => {
                    alert(e.replace(e, "Error: ", ""));
                });
        }
    }

    get unitLoader() {
        return UnitLoader;
    }

    get prLoader() {
        return PRLoader;
    }
    
    get categoryLoader() {
        return CategoryLoader;
    }
    
    get budgetLoader() {
        return BudgetLoader;
    }

    get productLoader() {
        return ProductLoader;
      }

    prView = (tr) => {
      return `${tr.no}`;
  }
}
