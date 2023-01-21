import { inject } from 'aurelia-framework';
import { Service } from "./service";

const UnitLoader = require('../../../../../../loader/garment-units-loader');
import moment from 'moment';

@inject(Service)
export class List{
    constructor(service) {
        this.service = service;

        this.flag = false;
        this.types = ["AVAL FABRIC", "AVAL KOMPONEN", "AVAL BAHAN PENOLONG"];
        this.error = {};
    }
    get unitLoader() {
        return UnitLoader;
    }
    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;

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
        { field: "index", title: "No", sortable: false, width: '2%' },
        { field: "UnitCode", title: "Unit", sortable: false, width: '5%' },
        { field: "ReferenceType", title: "Jenis Aval", sortable: false, width: '5%' },
        { field: "ProductCode", title: "Kode Barang", sortable: false, width: '3%' },
        { field: "ProductName", title: "Nama Barang", sortable: false, width: '3%' },
        { field: "BeginingbalanceQty", title: "Saldo Awal", sortable: false, width: '3%' },
        { field: "QuantityReceipt", title: "Penerimaan", sortable: false, width: '3%' },
        { field: "QuantityExpend", title: "Pengeluaran", sortable: false, width: '3%' },
        { field: "EndbalanceQty", title: "Saldo Akhir", sortable: false, width: '3%' },
        { field: "UomUnit", title: "Satuan", sortable: false, width: '3%' },
    ];

    search() {
        this.error = {};

        //if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            this.mdnTable.refresh();
        //} 
    }

    reset() {
        this.dateTo = undefined;
        this.dateFrom = undefined;
        this.typeAval = undefined;
        this.error = {};
        this.unit = {};
        this.flag = false;
        this.mdnTable.refresh();
    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        let args = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            order: order,
            dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            unit: this.unit ? this.unit.Id : "",
            typeAval: this.typeAval
        };
        return this.flag ?
            (
                this.service.search(args)
                    .then(result => {
                        for(var data of result.data){
                            if(data.index == 0){
                                data.index = ""
                            }
                        };
                        return {
                            total: result.info.total,
                            data: result.data

                        };
                    })
            ) : { total: 0, data: [] };
    }

    XLS() {
        let args = {
            dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            unit: this.unit ? this.unit.Id : "",
            typeAval: this.typeAval
        };
        this.service.xls(args);
    }
}
