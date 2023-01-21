import { inject } from 'aurelia-framework';
import { Service } from "./service";

import moment from 'moment';
import { ItemTemplate } from '../../../../../../samples/autocomplete/item-template';

@inject(Service)

export class List {
    constructor(service) {
        this.service = service;

        this.flag = false;
        this.types = ["", "AVAL FABRIC", "AVAL KOMPONEN", "AVAL BAHAN PENOLONG"];
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
        { field: "index", title: "No", sortable: false},
        { field: "ReceiptNoteNo", title: "No Bon Terima", sortable: false },
        {
            field: "ReceiptDate", title: "Tgl Bon Terima", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }, width: '5%'
        },
        { field: "AvalType", title: "Jenis Aval", sortable: false},
        { field: "Weight", title: "Berat", sortable: false},
        { field: "Uom", title: "Satuan", sortable: false},
        { field: "UnitCode", title: "Asal Barang", sortable: false },
        { field: "RONo", title: "Nomor RO", sortable: false },
        { field: "ProductCode", title: "Kode Barang", sortable: false },
        { field: "ProductName", title: "Nama Barang", sortable: false },
        { field: "ProductRemark", title: "Keterangan", sortable: false},
        { field: "Quantity", title: "Qty", sortable: false},
        { field: "UomUnit", title: "Satuan", sortable: false},
        { field: "AvalComponentNo", title: "No Aval Komponen", sortable: false}
    ];

    search() {
        this.info.page = 1;
        this.info.total = 0;
        this.searching();
    }
    info = { page: 1, size: 25 };
    async searching() {
        this.data=[];
        var order = {};
        let args = {
            page: this.info.page,
            size: this.info.size,
            order: order,
            type: this.type,
            dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
        };
        this.service.search(args)
        .then(result => {
            this.data = result.data;
            var temp = [];
            this.info.total = result.info.total;
            var count = 0;
            for (var item of this.data) {
                if (!temp[item.ReceiptNoteNo]) {
                    count = 1;
                    temp[item.ReceiptNoteNo] = count;
                }
                else {
                    count++;
                    temp[item.ReceiptNoteNo] = count;
                    item.ReceiptNoteNo = null;
                }
            }

            for (var item of this.data) {
                item.Weight= item.Weight==0 ? "-" : item.Weight;
                item.Remark= !item.Remark ? "-" : item.Remark;
                if (item.ReceiptNoteNo != null) {
                    item.row_count = temp[item.ReceiptNoteNo];
                }

                if(item.index == 0){
                    item.index = ""
                }
            }
            this.fillTable();
        });
        
    }

    fillTable() {
        const columns =[
            { field: "index", title: "No", sortable: false},
            { field: "ReceiptNoteNo", title: "No Bon Terima", sortable: false },
            {
                field: "ReceiptDate", title: "Tgl Bon Terima", formatter: function (value, data, index) {
                    if(moment(value).format("YYYY-MM-DD") == "0001-01-01"){
                        return "-";
                    }else{
                        return moment(value).format("DD MMM YYYY");
                    }
                }, width: '5%'
            },
            { field: "AvalType", title: "Jenis Aval", sortable: false},
            { field: "Weight", title: "Berat", sortable: false},
            { field: "Uom", title: "Satuan", sortable: false},
            { field: "UnitCode", title: "Asal Barang", sortable: false },
            { field: "RONo", title: "Nomor RO", sortable: false },
            { field: "ProductCode", title: "Kode Barang", sortable: false },
            { field: "ProductName", title: "Nama Barang", sortable: false },
            { field: "Remark", title: "Keterangan", sortable: false},
            { field: "Quantity", title: "Qty", sortable: false},
            { field: "UomUnit", title: "Satuan", sortable: false},
            { field: "AvalComponentNo", title: "No Aval Komponen", sortable: false}
        ];

        var bootstrapTableOptions = {
            undefinedText: '',
            columns: columns,
            data: this.data,
            rowStyle:this.rowFormatter
        };

        bootstrapTableOptions.height = $(window).height() - $('.navbar').height() - $('.navbar').height() - 25;
        $(this.table).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);

        for (const rowIndex in this.data) {
            if(this.data[rowIndex].ReceiptNoteNo) {
                var rowSpan=this.data[rowIndex].row_count;
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "index", rowspan: rowSpan, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "ReceiptNoteNo", rowspan: rowSpan, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "ReceiptDate", rowspan: rowSpan, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "AvalType", rowspan: rowSpan, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "Weight", rowspan: rowSpan, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "Uom", rowspan: rowSpan, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "UnitCode", rowspan: rowSpan, colspan: 1 });
            }
        }

    }

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }

    reset() {
        this.unit = undefined;
        this.type = "";
        this.dateFrom = undefined;
        this.dateTo = undefined;
        this.error = {};

        this.flag = false;
        this.table.refresh();
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
