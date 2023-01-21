import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
var UnitLoader = require('../../../../../loader/unit-loader');

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    unit=null;
    duration='';
    dateFrom = null;
    dateTo = null;

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }
    durationItems=["8-14 hari", "15-30 hari", "> 30 hari"];

    listDataFlag = false;

    columns = [
       { field: "index", title: "No", sortable:false},
      { field: "prDate", title: "Tanggal Purchase Request", sortable:false, 
        formatter: (value, data) => {
            return moment(value).format("DD/MM/YYYY");
        }
      },
      { field: "prCreatedDate", title: "Tanggal Buat Purchase Request", sortable:false, 
        formatter: (value, data) => {
          return moment(value).format("DD/MM/YYYY");
        }
      },
      { field: "prNo", title: "No Purchase Request", sortable:false},
      { field: "division", title: "Divisi", sortable:false},
      { field: "unit", title: "Unit", sortable:false},
      { field: "budget", title: "Budget", sortable:false},
      { field: "category", title: "Kategori", sortable:false},
      { field: "productCode", title: "Kode Barang", sortable:false},
      { field: "productName", title: "Nama Barang", sortable:false},
      { field: "productQuantity", title: "Jumlah Barang", sortable:false, formatter:(value,data)=>{
        return value.toLocaleString('en-EN', { minimumFractionDigits: 2 });
    }  },
      { field: "productUom", title: "Satuan Barang", sortable:false},
      { field: "poDate", title: "Tanggal Terima PO Internal", sortable:false,
        formatter: (value, data) => {
            return moment(value).format("DD/MM/YYYY");
        }
      },
      { field: "dateDiff", title: "Selisih Tanggal PR - PO Internal (hari)", sortable:false },
      { field: "staff", title: "Nama Staff Pembelian", sortable:false},
    ]

    bind() {
        
    }

    fillValues() {
        this.arg.unitId = this.filter.unit ? this.filter.unit.Id : "";
        this.arg.duration = this.filter.duration ? this.filter.duration : "8-14 hari";
        this.arg.dateFrom = this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "";
        this.arg.dateTo = this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "";
        this.arg.offset = new Date().getTimezoneOffset() / 60 * -1;
    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        this.arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        };
        return this.listDataFlag ? (
            this.fillValues(),
            this.service.search(this.arg)
           
                .then(result => {
                    var index=0;
                        for(var a of result.data){
                            index++;
                            a.index=index;
                            
                        }
                    return {
                        total: result.info.length,
                        data: result.data
                    }
            })
        ) : { total: 0, data: {} };
    }

    searching() {
        this.listDataFlag = true;
        this.durationTable.refresh();
    }

    reset() {
        this.filter = {};
        this.data = [];
    }

    ExportToExcel() {
        this.fillValues();
        this.service.generateExcel(this.arg);
    }

    get unitLoader() {
        return UnitLoader;
    }

    autocomplete_change(e) {
        if(e.au.controller.view.bindingContext.value == undefined || e.au.controller.view.bindingContext.value == "")
            e.au.controller.view.bindingContext.value = e.au.controller.view.bindingContext.value == undefined ? "" : undefined;
    }
}
