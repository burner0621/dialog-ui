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
        { field: "ExpenditureNoteNo", title: "No Bon Terima", sortable: false },
        {
            field: "ExpenditureDate", title: "Tgl Bon Terima", formatter: function (value, data, index) {
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
                if (!temp[item.ExpenditureNo]) {
                    count = 1;
                    temp[item.ExpenditureNo] = count;
                }
                else {
                    count++;
                    temp[item.ExpenditureNo] = count;
                    item.ExpenditureNo = null;
                }
            }

            for (var item of this.data) {
                if(item.index == 0) {
                    item.index = "";
                }
                if (item.ExpenditureNo != null) {
                    item.row_count = temp[item.ExpenditureNo];
                }
            }
            this.fillTable();
        });
        
    }

    fillTable() {
        const columns =[
            { field: "index", title: "No", sortable: false},
            { field: "ExpenditureNo", title: "No Bon Keluar", sortable: false },
            {
                field: "ExpenditureDate", title: "Tgl Bon Keluar", formatter: function (value, data, index) {
                    if(moment(value).format("YYYY-MM-DD") == "0001-01-01"){
                        return "-";
                    }else{
                        return moment(value).format("DD MMM YYYY");
                    }
                }, width: '5%'
            },
            { field: "AvalType", title: "Jenis Aval", sortable: false},
            { field: "ExpenditureTo", title: "Tujuan", sortable: false},
            { field: "OtherDescription", title: "Keterangan Tujuan", sortable: false},
            { field: "LocalSalesNoteNo", title: "No Nota Jual Lokal", sortable: false },
            { field: "AvalReceiptNo", title: "No Penerimaan", sortable: false},
            { field: "ProductCode", title: "Kode Barang", sortable: false },
            { field: "ProductName", title: "Nama Barang", sortable: false },
            { field: "UnitCode", title: "Unit Asal", sortable: false },
            { field: "Quantity", title: "Qty", sortable: false},
            { field: "UomUnit", title: "Satuan", sortable: false},
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
            if(this.data[rowIndex].ExpenditureNo) {
                var rowSpan=this.data[rowIndex].row_count;
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "index", rowspan: rowSpan, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "ExpenditureNo", rowspan: rowSpan, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "ExpenditureDate", rowspan: rowSpan, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "AvalType", rowspan: rowSpan, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "ExpenditureTo", rowspan: rowSpan, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "OtherDescription", rowspan: rowSpan, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "LocalSalesNoteNo", rowspan: rowSpan, colspan: 1 });
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
