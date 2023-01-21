import { inject } from 'aurelia-framework';
import { Service } from "./service";

import moment from 'moment';
import { ItemTemplate } from '../../../../../../samples/autocomplete/item-template';

@inject(Service)

export class List {
    constructor(service) {
        this.service = service;

        this.flag = false;
        this.types = ["FABRIC", "BARANG JADI", "ACCESSORIES"];
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
            dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
        };
        this.service.search(args)
        .then(result => {
            this.data = result.data;
            this.info.total = result.info.total;
            

            this.fillTable();
        });
        
    }

    fillTable() {
        const columns = [
            { field: "ProductCode", title: "Kode Barang", sortable: false, cellStyle: (value, row, index, field) => {
                return { classes: 'fixed' } } }  ,
            { field: "ProductName", title: "Nama Barang", sortable: false },
            { field: "UomUnit", title: "Satuan", sortable: false},
            { field: "EndbalanceQty", title: "Qty", sortable: false},
            { field: "EndbalancePrice", title: "RP", sortable: false}
        ];
        for(var _data of this.data){
            console.log(_data)
            _data.EndbalanceQty=_data.EndbalanceQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            _data.EndbalancePrice=_data.EndbalancePrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        var bootstrapTableOptions = {
            undefinedText: '',
            columns: columns,
            data: this.data,
            rowStyle:this.rowFormatter
        };

        bootstrapTableOptions.height = $(window).height() - $('.navbar').height() - $('.navbar').height() - 25;
        $(this.table).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);

        for (const rowIndex in this.data) {
            if(this.data[rowIndex].ProductCode=="GRAND TOTAL") {
                var rowSpan=1;
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "ProductCode", rowspan: rowSpan, colspan: 3 });
                
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
