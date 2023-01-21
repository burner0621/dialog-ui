import { inject } from 'aurelia-framework';
import { Service } from "./service";
import numeral from "numeral";

import moment from 'moment';

@inject(Service)

export class List {
    itemYears = [];
    constructor(service) {
        this.service = service;

        this.flag = false;
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
        if (!this.dateFrom) {
            alert("Tanggal Awal Harus Diisi");
        }
        else if(!this.dateTo){
            alert("Tanggal Akhir Harus Diisi");
        }
        else{
            this.searching();
        }
    }
    
    async searching() {
        this.data=[];
        var order = {};
        let args = {
            order: order,
            dateFrom:  this.dateFrom != "Invalid Date" ? moment(this.dateFrom).format("YYYY-MM-DD") : null,
            dateTo:   this.dateTo != "Invalid Date" ? moment(this.dateTo).format("YYYY-MM-DD") : null
        };
        this.service.search(args)
        .then(result => {
            this.data = result.data;
            //this.info.total = result.info.total;

            this.fillTable();
        });
        
    }

    fillTable() {
        const columns = [
            { field: "AccountNo", title: "No Akun", sortable: false, cellStyle: (value, row, index, field) => {
                return { classes: 'fixed' } } }  ,
            { field: "AccountName", title: "Nama Akun", sortable: false},
            { field: "Debit", title: "Debet", sortable: false, align: "right", formatter: function (value, data, index) {
                return numeral(value).format("0,000.00");}},
            { field: "Credit", title: "Kredit", sortable: false, align: "right", formatter: function (value, data, index) {
                return numeral(value).format("0,000.00");}},
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
            if(this.data[rowIndex].AccountNo=="TOTAL") {
                var rowSpan=1;
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "AccountNo", rowspan: rowSpan, colspan: 2 });
                
            }
        }

    }

    
    reset() {
        this.year = moment().format("YYYY");
        this.month = { text: "January", value: 1 };
        this.buyer = null;
        this.error = {};

        this.flag = false;
        this.table.refresh();
    }

    ExportToExcel() {
        if (!this.dateFrom) {
            alert("Tanggal Awal Harus Diisi");
        }
        else if(!this.dateTo){
            alert("Tanggal Akhir Harus Diisi");
        }
        else{
            let args = {
                dateFrom:  this.dateFrom != "Invalid Date" ? moment(this.dateFrom).format("YYYY-MM-DD") : null,
                dateTo:   this.dateTo != "Invalid Date" ? moment(this.dateTo).format("YYYY-MM-DD") : null
            };
            this.service.generateExcel(args);
        }
        
    }
}
