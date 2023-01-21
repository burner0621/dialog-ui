import { inject } from 'aurelia-framework';
import { Service } from "./service";

import moment from 'moment';

var UnitLoader = require('../../../loader/unit-loader');
var AccountLoader = require('../../../loader/account-loader');
var CategoryLoader = require('../../../loader/category-loader');

@inject(Service)

export class List {
    constructor(service) {
        this.service = service;

        this.flag = false;
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
        { field: "prDate", title: "Tanggal PR", sortable: false, formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "prNo", title: "No PR" , sortable: false},
        { field: "category", title: "Kategori", sortable: false },
        { field: "productName", title: "Nama Barang", sortable: false },
        // { field: "quantity", title: "Jumlah", sortable: false },
        { field: "quantity", title: "Jumlah Diminta", sortable: false, formatter:(value,data)=>{
            return value.toLocaleString('en-EN', { minimumFractionDigits: 2 });
        }  },
        { field: "uom", title: "Satuan", sortable: false },
        { field: "expectedDeliveryDatePO", title: "Tgl diminta datang PR", sortable: false, formatter: function (value, data, index) {
            
                return moment(value).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(value).format("DD MMM YYYY");
            }
        },
        { field: "unit", title: "Unit" , sortable: false },
        { field: "poStatus", title: "Status", sortable: false },
        { field: "staff", title: "Staff", sortable: false },
    ];

    search() {
        this.error = {};


        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            this.poTable.refresh();
        }
    }

    reset() {
        this.unit = null;
        this.category = null;
        this.account = null;
        this.dateTo = undefined;
        this.dateFrom = undefined;
        this.error = {};
        this.staffName=null;
        this.flag = false;
        //this.poTable.refresh();
    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        let args = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            unitId: this.unit ? this.unit.Id : "",
            categoryId: this.category ? this.category._id : "",
            staff: this.staffName ? this.staffName.username : "",
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
            staff: this.staffName ? this.staffName.username : "",
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
    
    get categoryLoader() {
        return CategoryLoader;
    }
    
    get accountLoader() {
        return AccountLoader;
    }
    accountView = (account) => {
      return `${account.username}`;
  }
}
