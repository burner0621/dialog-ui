import { inject } from 'aurelia-framework';
import { Service } from "./service";

import moment from 'moment';

var UnitLoader = require('../../../loader/unit-loader');
var TRLoader = require('../../../loader/transfer-requests-loader');

@inject(Service)

export class List {
    constructor(service) {
        this.service = service;

        this.flag = false;
        this.statuses = ["","Dibatalkan", "Belum diterima Pembelian", "Sudah diterima Pembelian", "Sudah diorder ke Supplier","Barang sudah datang sebagian","Barang sudah datang semua"];
        
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
        { field: "trNo", title: "Nomor TR" , sortable: false},
        { field: "trDate", title: "Tanggal TR", sortable: false, formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "unitName", title: "Unit" , sortable: false, formatter: function (value, data, index) {
                return data.divisionName + " - " + data.unitName;
            }
        },
        { field: "categoryName", title: "Kategori", sortable: false },
        { field: "productCode", title: "Kode Barang", sortable: false },
        { field: "productName", title: "Nama Barang", sortable: false },
        { field: "grade", title: "Grade" , sortable: false},
        { field: "quantity", title: "Jumlah", sortable: false },
        { field: "uom", title: "Satuan", sortable: false },
        { field: "requestedArrivalDate", title: "Tgl diminta datang TR", sortable: false, formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(value).format("DD MMM YYYY");
            }
        },
        { field: "deliveryDateETO", title: "Tgl diminta datang TO Eksternal", sortable: false, formatter: function (value, data, index) {
            
                return moment(value).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(value).format("DD MMM YYYY");
            }
        },
        { field: "status", title: "Status Transfer Request", sortable: false },
    ];

    search() {
        this.error = {};


        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            this.trTable.refresh();
        }
    }

    reset() {
        this.unit = undefined;
        this.status = "";
        this.dateTo = undefined;
        this.dateFrom = undefined;
        this.error = {};

        this.flag = false;
        this.trTable.refresh();
    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        let args = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            trNo: this.Tr ? this.Tr.trNo : "",
            unitId: this.unit ? this.unit._id : "",
            status: this.status,
            dateTo: this.dateTo? moment(this.dateTo).format("MM/DD/YYYY"):"",
            dateFrom: this.dateFrom? moment(this.dateFrom).format("MM/DD/YYYY"):"",

        };

        return this.flag ?
            (
                this.service.search(args)
                    .then(result => {
                        for(var a of result.data){
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
            //page: parseInt(info.offset / info.limit, 10) + 1,
            //size: info.limit,
            trNo: this.Tr ? this.Tr.trNo : "",
            unitId: this.unit ? this.unit._id : "",
            status: this.status,
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

    get trLoader() {
        return TRLoader;
    }

    trView = (tr) => {
      return `${tr.trNo}`;
  }
}
