import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var productionLoader = require('../../../../../loader/production-order-loader');
var motifLoader = require('../../../../../loader/strike-off-loader');

@inject(Router, Service)

export class List {
    constructor(router, service) {
        this.router = router;
        this.service = service;
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
        {field: "createdBy", title: "User"},
        {field: "productionOrderNo", title: "No. SPP"},
        {field: "date", title: "Tanggal", formatter: function (value, data, index) {
            return moment(value).format("DD-MMM-YYYY");
        }},
        {field: "quantity", title: "Qty"},
        {field: "materialName", title: "Jenis Benang"},
        {field: "materialConstructionName", title: "Konstruksi"},
        {field: "materialWidth", title:"Lebar"},
        {field: "strikeOff", title: "Design"},
        {field: "strikeOffType", title: "Jenis Print"},
        {field: "color", title:"Warna"},
        {field: "name", title: "Nama"},
        {field: "receiptQty", title: "Resep"},
        {field: "adj1Qty", title: "Adjs 1"},
        {field: "adj2Qty", title: "Adjs 2"},
        {field: "adj3Qty", title: "Adjs 3"},
        {field: "adj4Qty", title: "Adjs 4"},
        {field: "totalRealization", title: "Pembuatan (Kg)"},
        {field: "totalScreen", title: "Jml Screen"}
    ];

    search(){
        this.flag=true;
        this.receiptTable.refresh();
    }

    reset(){
        this.productionOrder = undefined;
        this.strikeOff = undefined;
        this.dateFrom = undefined;
        this.dateTo = undefined;
        this.flag= false;
        this.receiptTable.refresh();
    }

    loader = (info) => {
        var order = {};

        if(info.sort)
            order[info.sort] = info.order;

        let args = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            order: order,
            productionOrderNo: this.productionOrder ? this.productionOrder.OrderNo : "",
            strikeOffCode: this.strikeOff ? this.strikeOff.Code : "",
            dateFrom: this.dateFrom ? moment(this.dateFrom).format("MM/DD/YYYY") : "",
            dateTo: this.dateTo ? moment(this.dateTo).format("MM/DD/YYYY") : ""
        };

        return this.flag ?
            (
                this.service.search(args)
                    .then(result => {
                        return {
                            total: result.info.total,
                            data: result.data
                        };
                    })
            ) : { total: 0, data: [] };
    }

    ExportToExcel(){
        let args =
        {
            productionOrderNo: this.productionOrder ? this.productionOrder.OrderNo : "",
            strikeOffCode: this.strikeOff ? this.strikeOff.Code : "",
            dateFrom: this.dateFrom ? moment(this.dateFrom).format("MM/DD/YYYY") : "",
            dateTo: this.dateTo ? moment(this.dateTo).format("MM/DD/YYYY") : ""
        };
        this.service.generateExcel(args);
    }

    get prodcutionOrderLoader(){
        return productionLoader;
    }

    get strikeOffLoader(){
        return motifLoader;
    }
}

