import { inject } from 'aurelia-framework';
import { Service } from "./service";

import moment from 'moment';

var UnitLoader = require('../../../loader/unit-loader');
var SupplierLoader = require('../../../loader/supplier-loader');
var PRLoader = require('../../../loader/purchase-request-by-user-loader');
var BudgetLoader = require('../../../loader/budget-loader');
var CategoryLoader = require('../../../loader/category-loader');
var SPBLoader = require('../../../loader/unit-payment-order-loader')

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
        { field: "tglspb", title: "TglSPB" , sortable: false , formatter: function (value, data, index) {
                return moment(value).format("DD/MM/YYYY");
            }},
        { field: "nospb", title: "NoSPB", sortable: false },
        { field: "namabrg", title: "NamaBrg", sortable: false },
        { field: "satuan", title: "Sat", sortable: false },
         { field: "jumlah", title: "Jml", sortable: false },
         { field: "hrgsat", title: "HrgSat", sortable: false },
         { field: "jumlahhrg", title: "JmlHrg", sortable: false },
         { field: "ppn", title: "Ppn", sortable: false },
         { field: "total", title: "Total", sortable: false },
         { field: "pph", title: "Pph", sortable: false },
         { field: "tglpr", title: "Tglpr", sortable: false, formatter: function (value, data, index) {
                return moment(value).format("DD/MM/YYYY");
            } },
        { field: "nopr", title: "NoPR", sortable: false },
         { field: "tglbon", title: "TglBon", sortable: false, formatter: function (value, data, index) {
                return moment(value).format("DD/MM/YYYY");
            } },
        { field: "nobon", title: "NoBon", sortable: false },
        { field: "tglinv", title: "TglInv", sortable: false, formatter: function (value, data, index) {
                return moment(value).format("DD/MM/YYYY");
            } },
        { field: "noinv", title: "NoInv", sortable: false },
        { field: "jt", title: "Jt", sortable: false, formatter: function (value, data, index) {
                return moment(value).format("DD/MM/YYYY");
            } },
        { field: "kodesupplier", title: "KdSupp", sortable: false },
        { field: "supplier", title: "Supp", sortable: false },
        { field: "unit", title: "unit", sortable: false },
        { field: "div", title: "Div", sortable: false },
        { field: "adm", title: "ADM", sortable: false },
        { field: "term", title: "Term", sortable: false },
        { field: "matauang", title: "MtUang", sortable: false },
        { field: "kategori", title: "Kat", sortable: false },
         
         
       
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
        this.supplier = null;
        this.spb = null;
        this.category = null;
        this.budget = null;
        this.poStatus = "";
        this.prStatus = "";
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
            supplierId: this.supplier ? this.supplier._id: "",
            noSPB: this.spb ? this.spb.no:"",
            unitId: this.unit ? this.unit.Id : "",
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
            supplierId: this.supplier ? this.supplier._id: "",
            noSPB: this.spb ? this.spb.no:"",
            unitId: this.unit ? this.unit.Id : "",
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

     get supplierLoader() {
        return SupplierLoader;
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

    get spbLoader() {
        return SPBLoader;
    }

    prView = (tr) => {
      return `${tr.no}`;
  }
}
