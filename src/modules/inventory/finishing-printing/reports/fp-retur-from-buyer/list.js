import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
var ReturLoader = require('../../../../../loader/retur-from-buyer-loader');
var ProductionOrderLoader = require("../../../../../loader/production-order-loader");
var BuyerLoader = require("../../../../../loader/buyers-loader");

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

    destinationOptions = ['','Pack I', 'Pack II'];

    columns = [
        { field: "no", title: "No", sortable:false},
        { field: "code", title: "No. retur", sortable:false},
        { field: "date", title: "Tanggal Retur", sortable:false, 
            formatter: (value, data) => {
                return moment(value).format("DD/MM/YYYY");
            }
        },
        { field: "destination", title: "Yang Menerima", sortable:false},
        { field: "buyer", title: "Buyer", sortable:false},
        { field: "spk", title: "No. SPK", sortable:false},
        { field: "coverLetter", title: "No. Surat Pengantar", sortable:false},
        { field: "codeProduct", title: "Kode Barang", sortable:false},
        { field: "orderNo", title: "No. Order", sortable:false},
        { field: "productName", title: "Nama Barang", sortable:false},
        { field: "productDescription", title: "Keterangan Produk", sortable:false},
        { field: "remark", title: "Keterangan", sortable:false},
        { field: "returQuantity", title: "Jumlah Retur", sortable:false},
        { field: "uom", title: "Satuan", sortable:false},
        { field: "length", title: "Panjang (Meter)", sortable:false},
        { field: "weight", title: "Berat (Kg)", sortable:false},
    ]

    searching() {
        this.listDataFlag = true;
        this.returTable.refresh();
    }

    reset() {
        this.filter = {};
        this.data = [];
        this.listDataFlag=false;
        this.returTable.refresh();
    }

    get returLoader() {
        return ReturLoader;
    }

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }

    get buyerLoader() {
        return BuyerLoader;
    }
    ExportToExcel() {
        this.arg = {
            dateTo : this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "",
            dateFrom : this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "",
            destination : this.filter.destination ? this.filter.destination : "",
            code : this.filter.retur ? this.filter.retur.code : "",
            buyer : this.filter.buyer ? this.filter.buyer.code : "",
            productionOrderNo : this.filter.productionOrder ? this.filter.productionOrder.orderNo : ""
        };
        this.service.generateExcel(this.arg);
    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        this.arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            filter : JSON.stringify({
                dateTo : this.filter.dateTo ? moment(this.filter.dateTo).format("YYYY-MM-DD") : "",
                dateFrom : this.filter.dateFrom ? moment(this.filter.dateFrom).format("YYYY-MM-DD") : "",
                destination : this.filter.destination ? this.filter.destination : "",
                code : this.filter.retur ? this.filter.retur.code : "",
                buyer : this.filter.buyer ? this.filter.buyer.code : "",
                productionOrderNo : this.filter.productionOrder ? this.filter.productionOrder.orderNo : ""
            })
        };

        return this.listDataFlag ? (
            this.service.search(this.arg)
                .then(result => {
                    var index=((Number(result.info.page) - 1) * Number(result.info.size));
                    console.log(result.info.page);
                    console.log(result.info.size);
                    console.log(index);
                    var newData=[];
                    console.log(result);
                    for (var retur of result.data) {
                        var data = {};
                        index += 1;
                        data.no = index;
                        data.code = retur.code ? retur.code : '';
                        data.date = retur.date ? retur.date : '';
                        data.buyer = retur.buyer ? retur.buyer : '';
                        data.destination = retur.destination ? retur.destination : '';
                        data.spk = retur.spk ? retur.spk : '';
                        data.coverLetter = retur.coverLetter ? retur.coverLetter : '';
                        data.orderNo = retur.orderNo ? retur.orderNo : '';
                        data.codeProduct = retur.codeProduct ? retur.codeProduct : '';
                        data.productCode = retur.productCode ? retur.productCode : '';
                        data.productName = retur.productName ? retur.productName : '';
                        data.productDescription = retur.productDescription ? retur.productDescription : '';
                        data.remark = retur.remark ? retur.remark : '';
                        data.returQuantity = retur.returQuantity ? retur.returQuantity : '';
                        data.uom = retur.uom ? retur.uom : '';
                        data.length = retur.length ? (retur.length * retur.returQuantity).toFixed(2) : '';
                        data.weight = retur.weight ? (retur.weight * retur.returQuantity).toFixed(2) : '';

                        newData.push(data);
                    }
                    return {
                        total: result.info.total,
                        data: newData
                    }
            })
        ) : { total: 0, data: {} };
    }

    autocomplete_change(e) {
        if(e.au.controller.view.bindingContext.value == undefined || e.au.controller.view.bindingContext.value == "")
            e.au.controller.view.bindingContext.value = e.au.controller.view.bindingContext.value == undefined ? "" : undefined;
    }
}