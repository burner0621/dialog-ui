import { inject, useView, bindable, computedFrom } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { Service } from './service';
import moment from 'moment';

@inject(DialogController, Service)
@useView("modules/packing-sku-inventory/report-dyeing-printing-stock/packing-list-form.html")
export class PackingListForm {

    packingOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false,
        sortable: false
    }

    columns = [
        { field: "packagingQty", title: "Qty Pack" },
        { field: "packagingUnit", title: "Satuan Pack" },
        { field: "packagingLength", title: "Qty Per Pack" },
        { field: "balance", title: "Total Qty" }
    ];


    constructor(dialogController, service) {
        this.dialogController = dialogController;
        this.service = service;
    }

    async activate(data) {
        console.log(data);

        this.dateReport = data.dateReport;
        this.zona = data.zona;
        this.buyer = data.buyer;
        this.unit = data.data.unit;
        this.packingType = data.data.jenis;
        this.construction = data.data.construction;
        this.productionOrder = data.data.productionOrderId;
        this.grade = data.data.grade;
    }

    loader = (info) => {
        var arg = {
            dateReport: moment(this.dateReport).format("YYYY-MM-DD"),
            zona: this.zona,
            unit: this.unit,
            packingType: this.packingType ? this.packingType : null,
            construction: this.construction ? this.construction : null,
            buyer: this.buyer ? this.buyer : null,
            productionOrderId: this.productionOrder,
            grade: this.grade
        }

        return this.service.searchPacking(arg)
            .then((result) => {
                var data = {};
                data.data = result;
                data.total = result.length;

                return data;
            });
    }
}