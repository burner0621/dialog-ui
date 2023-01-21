import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    rowFormatter(data, index) {
        if (data.IsPosted)
            return { classes: "success" }
        else
            return {}
    }
    context = ["Rincian"]

    columns = [
        { field: "PRNo", title: "Nomor PR" },
        { field: "RONo", title: "Nomor RO" },
        {
            field: "ShipmentDate", title: "Tanggal Shipment", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "BuyerName", title: "Buyer" },
        { field: "Items.ProductName", title: "Nama Barang" },
        { field: "Items.Quantity", title: "Jumlah", formatter: function (value) { return value.toFixed(2) } },
        { field: "Items.UomUnit", title: "Satuan" },

        { field: "CreatedBy", title: "Staff Pembelian" },
        {
            field: "IsPosted", title: "Posted",
            formatter: function (value, row, index) {
                return value ? "SUDAH" : "BELUM";
            }
        }
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            // select: ["purchaseRequest.no", "purchaseRequest.roNo", "shipmentDate", "buyer.name","_createdBy", "isPosted", "items.defaultQuantity","items.defaultUom.unit","items.product.name"],
            order: order
        }

        return this.service.search(arg)
            .then(result => {
                for (var _data of result.data) {
                    _data.BuyerName = _data.Buyer.Name;
                    _data.Items.ProductName = _data.Items[0].Product.Name;
                    _data.Items.Quantity = _data.Items[0].Quantity;
                    _data.Items.UomUnit = _data.Items[0].Uom.Unit;
                }
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}