import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var StorageLoader = require('../../../../loader/storage-loader');
var ProductLoader = require('../../../../loader/product-loader');

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }

    selectedStorage = "";

    listDataFlag = false;

    columns = [

        {
            field: "Date", title: "Tanggal",
            formatter: (value, data) => {
                return moment(value).format("DD-MMM-YYYY");
            }
        },
        { field: "ProductCode", title: "Kode Barang" },
        { field: "ProductName", title: "Barang Nama" },
        { field: "UomUnit", title: "Satuan" },
        
   
        { field: "BeginningQty", title: "Saldo Awal", formatter:(value,data)=>{
            return value.toLocaleString('en-EN', { minimumFractionDigits: 4 });
        }  },
        { field: "ReceiptQty", title: "Masuk", formatter:(value,data)=>{
            return value.toLocaleString('en-EN', { minimumFractionDigits: 4 });
        } },
        { field: "ExpandQty", title: "Keluar" , formatter:(value,data)=>{
            return value.toLocaleString('en-EN', { minimumFractionDigits: 4 });
        } },
        { field: "EndingQty", title: "Saldo Akhir" , formatter:(value,data)=>{
            return value.toLocaleString('en-EN', { minimumFractionDigits: 4 });
        } }
    ]

    bind() {
        
    }

    fillValues() {
        this.arg.dateFrom = this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "";
        this.arg.dateTo = this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "";
        this.arg.storageCode = this.selectedStorage ? this.selectedStorage.code : null;
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
                    return {
                        total: result.info.total,
                        data: result.data
                    }
                })
        ) : { total: 0, data: {} };
    }

    search() {
        this.listDataFlag = true;
        this.movementTable.refresh();
    }

    reset() {
        this.selectedStorage = "";
      
        this.dateFrom = null;
        this.dateTo = null;
        this.listDataFlag = false;
        this.movementTable.refresh();
    }

    ExportToExcel() {
        this.fillValues();
        this.service.generateExcel(this.arg);
    }

    get storageLoader() {
        return StorageLoader;
    }

    storageView = (storage) => {
        return `${storage.unit.name} - ${storage.name}`;
    }

  

    // autocomplete_change(e) {
    //     if (e.au.controller.view.bindingContext.value == undefined || e.au.controller.view.bindingContext.value == "")
    //         e.au.controller.view.bindingContext.value = e.au.controller.view.bindingContext.value == undefined ? "" : undefined;
    // }
}