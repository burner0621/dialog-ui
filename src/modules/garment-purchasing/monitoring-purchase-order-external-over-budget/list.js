import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var Unit = require('../../../loader/unit-loader');
var Supplier = require('../../../loader/garment-supplier-loader');
var POEksternal = require('../../../loader/garment-purchase-order-external-loader');

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.statusApprove = this.statusApprove.map(status => {
            status.toString = function () {
                return this.name;
            }
            return status;
        })
    }

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }

    Values() {
        this.arg.dateFrom = this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : null;
        this.arg.dateTo = this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : null;
        this.arg.supplier = this.supplier ? this.supplier.Id : null;
        this.arg.unit = this.unit ? this.unit.Id : null;
        this.arg.epono = this.epono ? this.epono.EPONo : null;
        this.arg.status = this.isApproved ? this.isApproved.name : null;
    }


    listDataFlag = false;
    statusApprove = [{
        "name": "",
        "value": -1
    }, {
        "name": "BELUM",
        "value": 0
    }, {
        "name": "SUDAH",
        "value": 1
    }];

    columns = [
        { field: "no", title: "No.", sortable: false },
        { field: "poExtNo", title: "No. PO Eksternal", sortable: false },
        { field: "poExtDate", title: "Tanggal PO Eksternal", sortable: false },
        { field: "supplierCode", title: "Kode Supplier", sortable: false },
        { field: "supplierName", title: "Nama Supplier", sortable: false },
        { field: "prNo", title: "No. Purchase Request", sortable: false },
        { field: "prDate", title: "Tanggal Purchase Request", sortable: false },
        { field: "prRefNo", title: "No. Ref. Purchase Request", sortable: false },
        { field: "unit", title: "Unit", sortable: false },
        { field: "productName", title: "Nama Barang", sortable: false },
        { field: "productCode", title: "Kode Barang", sortable: false },
        { field: "productDesc", title: "Keterangan Barang", sortable: false },
        { field: "quantity", title: "Jumlah Barang", sortable: false },
        { field: "uom", title: "Satuan Barang", sortable: false },
        { field: "budgetPrice", title: "Harga Budget", sortable: false },
        { field: "price", title: "Harga  Beli", sortable: false },
        { field: "totalBudgetPrice", title: "Total Harga Budget", sortable: false },
        { field: "totalPrice", title: "Total Harga Beli", sortable: false },
        { field: "overBudgetValue", title: "Nilai Over Budget", sortable: false },
        { field: "overBudgetValuePercentage", title: "Nilai Over Budget (%)", sortable: false },
        { field: "status", title: "Status Approve", sortable: false },
        { field: "overBudgetRemark", title: "Keterangan Over Budget", sortable: false }
    ]

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
            this.Values(),
            this.service.search(this.arg)
                .then(result => {
                            return {
                        total: result.info.total,
                        data: result.data,
                    }
                })
        ) : { total: 0, data: {} };
    }

    ExportToExcel() {
        var info = {
            status :  this.isApproved ? this.isApproved.name  : "",
            epono : this.epono ? this.epono.EPONo : "",
            supplier : this.supplier ? this.supplier.Id : "",
            unit : this.unit ? this.unit.Id : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.generateExcel(info.epono,  info.unit,  info.supplier,  info.status,   info.dateFrom, info.dateTo)
       
    }

    search() {
        this.listDataFlag = true;
        this.table.refresh();
    }

    get unitLoader() {
        return Unit;
    }

    get supplierLoader() {
        return Supplier;
    }

    get poexternalLoader() {
        return POEksternal;
    }

    reset() {
        this.unit = ""; 
        this.supplier = "";
        this.epono = "";
        this.dateFrom = null;
        this.dateTo = null;
        this.isApproved = this.statusApprove[0];
        this.listDataFlag = false;
        this.table.refresh();
    }

}