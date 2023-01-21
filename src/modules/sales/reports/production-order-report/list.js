import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");


var OrderTypeLoader = require('../../../../loader/order-type-loader');
var ProcessTypeLoader = require('../../../../loader/process-type-loader');
var BuyerLoader = require('../../../../loader/buyers-loader');
var AccountLoader = require('../../../../loader/account-loader');
var ProductionOrderLoader = require('../../../../loader/production-order-loader');

@inject(Router, Service)
export class List {
    filterAccount = {};
    filter = {};
    listDataFlag = false;
    context = ["Rincian"]

    constructor(router, service) {
        this.service = service;
        this.router = router;
        // this.filterAccount = {
        //     "roles": {
        //         "$elemMatch": {
        //             "permissions": {
        //                 "$elemMatch": {
        //                     "unit.name": "PENJUALAN FINISHING & PRINTING"
        //                 }
        //             }
        //         }
        //     }
        // }
        this.filterAccount = {"roles.0.permissions.0.unit.name.toUpper()":"PENJUALAN FINISHING & PRINTING"};
    }

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }

    Values() {
        this.arg.dateFrom = this.sdate ? moment(this.sdate).format("YYYY-MM-DD") : null;
        this.arg.dateTo = this.edate ? moment(this.edate).format("YYYY-MM-DD") : null;
        this.arg.salesContractNo = this.salesContractNo ? this.salesContractNo : null;
        this.arg.orderNo = this.productionOrder ? this.productionOrder.OrderNo : null;
        this.arg.orderTypeId = this.orderType ? this.orderType.Id : null;
        this.arg.processTypeId = this.processType ? this.processType.Id : null;
        this.arg.buyerId = this.buyer ? this.buyer.Id : null;
        this.arg.accountId = this.account ? this.account._id : null;
    }

    // columns = [
    //     { field: "no", title: "No.", sortable: false },
    //     { field: "status", title: "Status" },
    //     { field: "detail", title: "Detail", sortable: false },
    //     { field: "salesContractNo", title: "No. Sales Contract" },
    //     { field: "orderQuantity", title: "Jumlah di Sales Contract (meter)" },
    //     { field: "orderNo", title: "No. Surat Perintah Produksi" },
    //     { field: "orderType", title: "Jenis Order" },
    //     { field: "processType", title: "Jenis Proses" },
    //     { field: "construction", title: "Konstruksi" },
    //     { field: "designMotive", title: "Warna/Motif" },
    //     { field: "quantity", title: "Jumlah di Surat Perintah Produksi (meter)" },
    //     { field: "buyer", title: "Buyer" },
    //     { field: "buyerType", title: "Tipe Buyer" },
    //     { field: "staffName", title: "Nama Sales" },
    //     { field: "_createdDate", title: "Tanggal Terima Order" },
    //     { field: "deliveryDate", title: "Tanggal Permintaan Pengiriman" }
    // ]

    columns = [
        { field: "index", title: "No.", sortable: false },
        { field: "status", title: "Status" },
        { field: "detail", title: "Detail", sortable: false },
        { field: "orderNo", title: "No. SPP" },
        { field: "NoSalesContract", title: "No Sales Kontrak"},
        { field: "designNumber", title: "No Design"},
        { field: "colorType", title: "Warna" },
        { field: "Price", title : "Harga" },
        { field: "CurrCode", title : "Mata Uang"},
        { field: "orderQuantity", title: "Panjang SPP (M)" },
        { field: "orderType", title: "Jenis Order" },
        { field: "processType", title: "Jenis Proses" },
        { field: "construction", title: "Konstruksi" },
        { field: "designCode", title: "Motif" },
        // { field: "designCode", title: "Motif" },
        { field: "colorTemplate", title: "Hasil Matching" },   
        { field: "colorRequest", title: "CW" },
        { field: "buyer", title: "Buyer" },
        { field: "buyerType", title: "Tipe Buyer" },
        { field: "staffName", title: "Nama Sales" },
        { field: "_createdDate", title: "Tanggal Terima Order", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "deliveryDate", title: "Tanggal Permintaan Pengiriman", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        }
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
            this.service.getReport(this.arg)
                .then(result => {
                    var index=0;
                    for(var data of result.data){
                        index++;
                        data.index=index;
                    }
                    return {
                        total: result.info.total,
                        data: result.data,
                    }
                })
        ) : { total: 0, data: {} };
    }

    reset() {
        this.sdate = null;
        this.edate = null;
        this.salesContractNo = '';
        this.productionOrder = undefined;
        this.orderType = null;
        this.processType = null;
        this.buyer = null;
        this.account = null;
        this.filter = {};
        this.table.refresh();
    }

    search() {
        this.listDataFlag = true;
        this.table.refresh();
    }

    ExportToExcel() {
        this.Values();
        this.service.generateExcel(this.arg);
    }

    orderTypeChanged(newValue) {
        if (newValue) {
            this.filterOrder = {
                "orderType.code": newValue.code
            }
        } else {
            this.filterOrder = {};
        }
    }
    
    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian":
            window.open(`${window.location.origin}/#/sales/reports/production-order-reports/view/${encodeURIComponent(data.id)}`);
            // this.router.navigateToRoute('view', { id: data.orderNo });
                break;
        }

    }
    contextShowCallback(index, name, data) {
        switch (name) {
            default:
                return true;
        }
    }

    get processTypeLoader() {
        return ProcessTypeLoader;
    }

    get orderTypeLoader() {
        return OrderTypeLoader;
    }

    get buyerLoader() {
        return BuyerLoader;
    }

    get accountLoader() {
        return AccountLoader;
    }

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }
}
