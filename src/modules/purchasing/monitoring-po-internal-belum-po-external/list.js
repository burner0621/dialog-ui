import { inject } from 'aurelia-framework';
import { Service } from "./service";

import moment from 'moment';

var UnitLoader = require('../../../loader/unit-loader');
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
        { field: "UnitName", title: "Unit Yang Mengajukan" , sortable: false },
        { field: "CategoryName", title: "Kategori Barang", sortable: false },
        { field: "PRNo", title: "No Purchase Request" , sortable: false},
       
        { field: "PRDate", title: "Tanggal Purchase Request", sortable: false, formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "ExpectedDeliveryDate", title: "Tanggal Diminta Datang PR", sortable: false, formatter: function (value, data, index) {
            
                return moment(value).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(value).format("DD MMM YYYY");
            }
        },
        { field: "ProductCode", title: "Kode Barang", sortable: false },
        { field: "ProductName", title: "Nama Barang", sortable: false },
        { field: "Quantity", title: "Jumlah Diminta", sortable: false, formatter:(value,data)=>{
            return value.toLocaleString('en-EN', { minimumFractionDigits: 2 });
        }  },
        { field: "UOMUnit", title: "Satuan", sortable: false },
        
        { field: "StaffName", title: "Staff Pembelian", sortable: false },
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
        this.dateTo = undefined;
        this.dateFrom = undefined;
        this.error = {};
        this.flag = false;
        this.poTable.refresh(); 
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
            unitId: this.unit ? this.unit.Id : "",
            categoryId: this.category ? this.category._id : "",
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
}
