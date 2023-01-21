import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;

    }
    bind(context) {
        this.context = context;
    }

    searching() {
        var info = {


            dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD"),
            dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD"),

        }
        this.service.search(info)
            .then(result => {
                console.log(result);
                this.data = [];
                for (var _data of result.data) {
                    _data.Nominal = _data.Description.includes("PENERIMAAN") || _data.Description.includes("PENGELUARAN") ? '' : (_data.AccPrice + _data.FabricPrice + _data.FinishedGoodPrice).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.Description = _data.Description;
                    _data.FabricQty = _data.Description.includes("PENERIMAAN") || _data.Description.includes("PENGELUARAN") ? '' : _data.FabricQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.FabricPrice = _data.Description.includes("PENERIMAAN") || _data.Description.includes("PENGELUARAN") ? '' : _data.FabricPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.FinishedGoodQty = _data.Description.includes("PENERIMAAN") || _data.Description.includes("PENGELUARAN") ? '' : _data.FinishedGoodQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.FinishedGoodPrice = _data.Description.includes("PENERIMAAN") || _data.Description.includes("PENGELUARAN") ? '' : _data.FinishedGoodPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.AccPrice = _data.Description.includes("PENERIMAAN") || _data.Description.includes("PENGELUARAN") ? '' : _data.AccPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                    this.data.push(_data);
                    console.log(this.data);
                }

            });
    }

    ExportToExcel() {
        var info = {
            dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD"),
            dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD"),

        }
        this.service.generateExcel(info);
    }
    reset() {
        this.dateFrom = null;
        this.dateTo = null;
    }
}