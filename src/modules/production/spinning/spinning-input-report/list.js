import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var UnitLoader = require('../../../../loader/unit-loader');
var YarnLoader = require('../../../../loader/spinning-yarn-loader');

@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    columns =[
        {
            field: "Date", title: "Date", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "Unit", title: "Unit Name" },
        { field: "Yarn", title: "Yarn Name" },
        // { field: "Machine", title: "Machine Name" },
        // { field: "Lot", title: "Lot" },
        { field: "FirstShift", title: "Shift I" },
        { field: "SecondShift", title: "Shift II" },
        { field: "ThirdShift", title: "Shift III" },
        { field: "Total", title: "Total" },
    ];

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false,
        sortable:false,
    }

    listDataFlag = false;
    spinningFilter = { "division.name": { "$regex": "SPINNING", "$options": "i" } };

    filter() {
        this.arg = {};
        this.arg.Filter = {
            "UnitName": this.unit != null || this.unit != undefined ? this.unit.name :"all",
            "YarnName":this.yarn !=null||this.yarn != undefined? this.yarn.Name:"all",
            "DateFrom": moment(this.dateFrom?this.dateFrom:new Date("12-25-1900")).format("DD MMM YYYY HH:mm"),
            "DateTo":  moment(this.dateTo?this.dateTo:new Date()).format("DD MMM YYYY HH:mm")
        };
    }

    ExportToExcel(){
        this.filter()
        this.service.generateExcel(this.arg)
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
        }

        return this.listDataFlag ? (
            this.filter(),
            this.service.search(this.arg).then((result) => {

                for(var i of result){
                    i.FirstShift= parseFloat(i.FirstShift.toFixed(2));
                    i.SecondShift= parseFloat(i.FirstShift.toFixed(2));
                    i.ThirdShift= parseFloat(i.FirstShift.toFixed(2));
                    i.Total=parseFloat(i.Total.toFixed(2));
                }

                return {
                    data: result
                }
            })
        ) : { total: 0, data: {} };
    }

    search() {
            this.listDataFlag = true;
            this.table.refresh();
    }

    reset() {
        this.unit = null;
        this.yarn = null;
        this.dateFrom = undefined;
        this.dateTo = undefined;
        this.error = "";
    }

    unitChanged(newValue, oldValue) {
        if (this.unit && this.unit._id) {
            this.data.Unit = this.unit
        }
        else {
            this.unit = null;
        }
    }

    yarnChanged(newValue, oldValue) {
        if (this.yarn && this.yarn.Id) {
            this.data.Yarn = this.yarn
        }
        else {
            this.yarn = null;
        }
    }

    get unitLoader() {
        return UnitLoader;
    }

    get yarnLoader() {
        return YarnLoader;
    }
}
