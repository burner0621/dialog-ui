import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

// var purchaseOrders = require('../../../loader/garment-product-loader');
var purchaseOrders = require('../../../loader/garment-purchase-orders-loader');
var Unit = require('../../../loader/unit-loader');
var Buyer = require('../../../loader/garment-buyers-loader');
var Category = require('../../../loader/garment-category-loader');


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

    Values() {
        this.arg.dateFrom = this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : undefined;
        this.arg.dateTo = this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : undefined;
        this.arg.no = this.no ? this.no._id : undefined;
        this.arg.buyer = this.buyer ? this.buyer._id : undefined;
        this.arg.category = this.category ? this.category._id : undefined;
        this.arg.unit = this.unit ? this.unit._id : undefined;
    }


    listDataFlag = false;

    columns = [
        { field: "index", title: "No" },
        { field: "no", title: "Nomor PO" },
        {
            field: "date", title: "Tanggal PO",
            formatter: (value, data) => {
                return moment(value).format("DD-MMM-YYYY");
            }
        },
        {
            field: "shipmentDate", title: "Tanggal Shipment",
            formatter: (value, data) => {
                return moment(value).format("DD-MMM-YYYY");
            }
        },
        { field: "roNo", title: "Nomor RO" },
        { field: "buyer", title: "Buyer" },
        { field: "artikel", title: "Artikel" },
        { field: "unit", title: "Unit" },
        { field: "refNo", title: "Nomor Referensi PR" },
        { field: "category.name", title: "Kategori" },
        { field: "product.code", title: "Kode Barang" },
        { field: "product.name", title: "Nama Barang" },
        { field: "remark", title: "Keterangan" },
        { field: "defaultQuantity", title: "Jumlah" },
        { field: "defaultUom.unit", title: "Satuan" },
        { field: "budgetPrice", title: "Harga Budget" },
        { field: "_createdBy", title: "Staff" }
    ]

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        this.arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            // select: ["no", "date", "shipmentDate", "roNo", "buyer.name", "artikel", "unit.name", "items"]
        };

        return this.listDataFlag ? (
            this.Values(),
            this.service.search(this.arg)
                .then(result => {

                    var datas = [];
                    var i = ((result.info.page - 1) * result.info.size) + 1;
                    for (var data of result.data) {
                        for (var item of data.items) {
                            Object.assign(item, {
                                index: i++,
                                no: data.refNo,
                                date: data.date,
                                shipmentDate: data.shipmentDate,
                                roNo: data.roNo,
                                buyer: data.buyer.name,
                                artikel: data.artikel,
                                unit: data.unit.name,
                                _createdBy: data._createdBy
                            })
                            datas.push(item)
                        }

                    }
                    return {
                        total: result.info.total,
                        data: datas,
                    }
                })
        ) : { total: 0, data: {} };
    }

    ExportToExcel() {
        this.Values();
        this.service.generateExcel(this.arg);
    }

    search() {
        this.listDataFlag = true;
        this.table.refresh();
    }

    get purchaseOrdersLoader() {
        return purchaseOrders;
    }

    get unitLoader() {
        return Unit;
    }

    get buyerLoader() {
        return Buyer;
    }

    get categoryLoader() {
        return Category;
    }

    reset() {
        this.no = "";
        this.unit = "";
        this.category = "";
        this.buyer = "";
        this.dateFrom = null;
        this.dateTo = null;
        this.listDataFlag = false;
        this.movementTable.refresh();
    }

}