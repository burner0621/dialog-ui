import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import numeral from 'numeral';
var moment = require('moment');
@inject(Router, Service)
export class List {
    context = ["Rincian"];
    itemYears = [];
    columns = [
        { field: "Period", title: "Periode" },
        {
            field: "LaborTotal", title: "Jumlah Tenaga Kerja Langsung", formatter: function (value, data, index) {
                return numeral(value).format('0,000.00');
            },
        },
        {
            field: "WageTotal", title: "Besar Upah 1 Bulan", formatter: function (value, data, index) {
                return numeral(value).format('0,000.00');
            },
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
            order: order
        }

        return this.service.search(arg)
            .then(result => {
                for (var data of result.data) {
                    var month = this.itemMonths.find(x => x.value == data.Month);

                    if (month) {
                        data.Period = month.text + " " + data.Year;
                    } else {
                        data.Period = data.Year;
                    }
                }
                // result.data.forEach(labor => {
                //     labor.Period.toString = function () {
                //         var month = this.itemMonths.find(x => x.value = labor.Month);

                //         if (month) {
                //             return month.text + " " + labor.Year;
                //         } else {
                //             return labor.Year;
                //         }

                //     }
                // });
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;

        this.itemMonths = [
            { text: 'January', value: 1 },
            { text: 'February', value: 2 },
            { text: 'March', value: 3 },
            { text: 'April', value: 4 },
            { text: 'May', value: 5 },
            { text: 'June', value: 6 },
            { text: 'July', value: 7 },
            { text: 'August', value: 8 },
            { text: 'September', value: 9 },
            { text: 'October', value: 10 },
            { text: 'November', value: 11 },
            { text: 'Desember', value: 12 }
        ];
        this.currentYear = moment().format('YYYY');
        this.startYear = parseInt(this.currentYear) - 2;
        this.endYear = parseInt(this.currentYear) + 2;

        for (var i = parseInt(this.startYear); i <= this.endYear; i++) {
            this.itemYears.push(i.toString());
        }
    }

    contextCallback(event) {
        let arg = event.detail;
        let data = arg.data;
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