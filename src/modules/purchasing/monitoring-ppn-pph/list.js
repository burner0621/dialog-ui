import { inject } from 'aurelia-framework';
import { Service } from "./service";

import moment from 'moment';

var SupplierLoader = require('../../../loader/supplier-loader');

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
        { field: "tglppn", title: "Tgl Faktur Pajak" , sortable: false , formatter: function (value, data, index) {
            return moment(value).format("DD/MM/YYYY");
        }},
        { field: "noppn", title: "No Seri Pajak", sortable: false },
 
        { field: "supplier", title: "Nama Supplier", sortable: false },

        { field: "nospb", title: "No Surat Perintah Bayar", sortable: false },
        { field: "tglspb", title: "Tgl Surat Perintah Bayar" , sortable: false , formatter: function (value, data, index) {
                return moment(value).format("DD/MM/YYYY");
            }},

        { field: "amountspb", title: "Nilai SPB", sortable: false, formatter:(value,data)=>{
                 return value.toLocaleString('en-EN', { minimumFractionDigits: 2 });
            }},    

        { field: "amountppn", title: "Nilai PPN", sortable: false, formatter:(value,data)=>{
            return value.toLocaleString('en-EN', { minimumFractionDigits: 2 });
            }},

        { field: "amountpph", title: "Nilai PPH", sortable: false, formatter:(value,data)=>{
            return value.toLocaleString('en-EN', { minimumFractionDigits: 2 });
           }},    
       
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
        this.taxno = null;
        this.supplierId = null;
        this.dateTo = undefined;
        this.dateFrom = undefined;
        this.taxdateTo = undefined;
        this.taxdateFrom = undefined;
        this.error = {};

        this.flag = false;
        this.prTable.refresh();
    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        let args = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            supplierId: this.supplier ? this.supplier._id: "",
            taxno: this.taxno ? this.taxno : "",
            dateTo: this.dateTo? moment(this.dateTo).format("MM/DD/YYYY"):"",
            dateFrom: this.dateFrom? moment(this.dateFrom).format("MM/DD/YYYY"):"",
            taxdateTo: this.taxdateTo? moment(this.taxdateTo).format("MM/DD/YYYY"):"",
            taxdateFrom: this.taxdateFrom? moment(this.taxdateFrom).format("MM/DD/YYYY"):"",
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
            supplierId: this.supplier ? this.supplier._id: "",
            taxno: this.taxno ? this.taxno : "",
            dateTo: this.dateTo? moment(this.dateTo).format("MM/DD/YYYY"):"",
            dateFrom: this.dateFrom? moment(this.dateFrom).format("MM/DD/YYYY"):"",
            taxdateTo: this.taxdateTo? moment(this.taxdateTo).format("MM/DD/YYYY"):"",
            taxdateFrom: this.taxdateFrom? moment(this.taxdateFrom).format("MM/DD/YYYY"):"",

        };

            this.service.getXls(args)
                .catch(e => {
                    alert(e.replace(e, "Error: ", ""));
                });
        }
    }

    get supplierLoader() {
        return SupplierLoader;
    }
   
}
