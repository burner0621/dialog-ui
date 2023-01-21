import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var UnitLoader = require('../../../../loader/unit-loader');
var MaterialTypeLoader = require('../../../../loader/spinning-material-types-loader');

@inject(Router, Service)
export class excel {

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 8
        }
    }

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }

    spinningFilter = { "(Code == \"S1\" || Code == \"S2\")": true };

    columns = [
        [
            {field: "index", title: "No" , sortable: false},
            {field: "UnitName", title: "Unit"},
            {
                field: "LotDate", title: "Tanggal", formatter: function (value, data, index) {
                    return value ? moment(value).format("DD MMM YYYY") : "-";
                }
            },
            {field: "LotNo", title: "Lot"},
            {field: "YarnTypeName", title: "Tipe Benang"},
            {field: "ProductCode", title: "Kode Serat"},
            {field: "ProductName", title: "Nama Serat"},
            {field: "ProductComposition", title: "Komposisi"},
            {field: "ProductPrice", title: "Harga"},
        ]
    ];

    get unitLoader(){
        return UnitLoader;
    }

    get materialTypeLoader() {
        return MaterialTypeLoader;
    } 
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.title = "Laporan Lot Configuration";

        this.flag = false;
        this.today = new Date();
        this.error = {};
    }

    bind(context){
        this.context = context;
    }

    reset(){
        this.unit = null;
        this.dateFrom = "";
        this.dateTo = "";
        this.yarn = null;
    }

    searching() {
        this.error = {};

        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            this.lotTable.refresh();
        }
    }

    loader = (info) => {
        var order = {};

        if(info.sort)
            order[info.sort] = info.order;

        let args = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            order: order,
            unit: this.unit ? this.unit.Id : 0,
            yarn: this.yarn ? this.yarn.Id : "",
            dateFrom: this.dateFrom ? moment(this.dateFrom).format("MM/DD/YYYY") : "",
            dateTo: this.dateTo ? moment(this.dateTo).format("MM/DD/YYYY") : ""
        };

        return this.flag ?
            (
                this.service.searching(args)
                    .then(result => {
                        var index=0;
                        for(var a of result.data.lotConfigurationDto){
                            index++;
                            a.index=index;
                        }

                         return {
                            total: result.info.total,
                            data: result.data.lotConfigurationDto
                        };
                    })
            ) : { total: 0, data: [] };
    }

    xls() {
        this.error = {};
        if (Object.getOwnPropertyNames(this.error).length === 0) {
            let args = {
                unit: this.unit ? this.unit.Id : 0,
                yarn: this.yarn ? this.yarn.Id : "",
                dateFrom: this.dateFrom ? moment(this.dateFrom).format("MM/DD/YYYY") : "",
                dateTo: this.dateTo ? moment(this.dateTo).format("MM/DD/YYYY") : ""
            };

            this.service.generateExcel(args)
            .catch(e => {
                alert(e.replace(e, "Error: ", ""));
            });
        }
    }
}