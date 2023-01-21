import { inject } from 'aurelia-framework';
import { Service } from "./service";

import moment from 'moment';

@inject(Service)

export class List {
    constructor(service) {
        this.service = service;

        this.flag = false;
        this.types = ["FABRIC", "ACCESSORIES"];
        this.error = {};
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
        { field: "ReceiptNoteNo", title: "No Bon Terima", sortable: false, width: '5%' },
        {
            field: "ReceiptDate", title: "Tgl Bon Terima", formatter: function (value, data, index) {
                if(value == null){
                    return "-"
                }else{
                    return moment(value).format("DD MMM YYYY");
                }
            }, width: '5%'
        },
        { field: "UENNo", title: "No BUK", sortable: false, width: '5%' },
        { field: "UnitFrom.Code", title: "Asal Barang", sortable: false, width: '3%' },
        { field: "POSerialNumber", title: "Nomor PO", sortable: false, width: '5%' },
        { field: "Product.Name", title: "Nama Barang", sortable: false, width: '5%' },
        { field: "Product.Code", title: "Kode Barang", sortable: false, width: '5%' },
        { field: "Composition", title: "Komposisi", sortable: false, width: '20%'},
        { field: "FabricRemark", title: "Konstruksi" , sortable: false, width: '10%'},
        { field: "Quantity", title: "Qty", sortable: false, width: '5%' },
        { field: "Price", title: "Harga", sortable: false, width: '5%' },
        { field: "Uom.Unit", title: "Satuan", sortable: false, width: '5%' },
        { field: "CustomsNo", title: "Asal BC Masuk", sortable: false, width: '5%' },
        { field: "CustomsType", title: "Tipe Beacukai", sortable: false, width: '5%' },
        { field: "CustomsDate", title: "Tanggal Beacukai",sortable: false, width: '5%' },
    ];

    search() {
        this.error = {};

        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            this.mdnTable.refresh();
        }
    }

    reset() {
        this.unit = undefined;
        this.type = "";
        this.dateFrom = undefined;
        this.dateTo = undefined;
        this.error = {};

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
            type: this.type,
            dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
        };

        return this.flag ?
            (
                this.service.search(args)
                    .then(result => {
                        result.data.forEach(s => {
                        if(s.CustomsNo != null && s.CustomsType != null && s.CustomsDate != null) {
                            s.CustomsNo.toString = function () {
                                var str = "<ul>";
                                for(var no of s.CustomsNo){
                                    str += `<li>${no}</li>`;
                                }
                                str += "</ul>";
                                return str;
                            }
                            s.CustomsType.toString = function () {
                                var str = "<ul>";
                                for(var type of s.CustomsType){
                                    str += `<li>${type}</li>`;
                                }
                                str += "</ul>";
                                return str;
                            }
                            s.CustomsDate.toString = function () {
                                var str = "<ul>";
                                for(var date of s.CustomsDate){
                                    str += `<li>${moment(date).format("DD MMM YYYY")}</li>`;
                                }
                                str += "</ul>";
                                return str;
                            }
                        }

                        if(moment(s.ReceiptDate).format("YYYY-MM-DD") == "0001-01-01") {
                            s.ReceiptDate = null
                        }

                        if(s.index == 0){
                            s.index = ""
                        }

                        });
                        return {
                            total: result.info.total,
                            data: result.data
                        };
                    })
            ) : { total: 0, data: [] };
    }

    ExportToExcel() {
        let args = {
            type: this.type,
            dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
        };
        this.service.generateExcel(args);
    }

    get unitLoader() {
        return UnitLoader;
    }
}
