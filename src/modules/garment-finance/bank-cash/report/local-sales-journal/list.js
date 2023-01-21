import { inject, bindable } from 'aurelia-framework'
import { Service } from "./service";
var moment = require("moment");
import numeral from "numeral";

@inject(Service)
export class List {
    itemYears = [];
    constructor(service) {
        this.service = service;

        this.flag = false;
        this.error = {};
        this.itemMonths = [
            { text: "January", value: 1 },
            { text: "February", value: 2 },
            { text: "March", value: 3 },
            { text: "April", value: 4 },
            { text: "May", value: 5 },
            { text: "June", value: 6 },
            { text: "July", value: 7 },
            { text: "August", value: 8 },
            { text: "September", value: 9 },
            { text: "October", value: 10 },
            { text: "November", value: 11 },
            { text: "Desember", value: 12 },
        ];
        this.currentYear = moment().format("YYYY");
    
        this.month = { text: "January", value: 1 };
        this.year = this.currentYear;
    
        for (var i = parseInt(this.currentYear); i >= 2018; i--) {
        this.itemYears.push(i.toString());
        }
    }
    
    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };

    activate() {
       
    }

     
    async searching() {
        this.data=[];
        var order = {};
        let args = {
            order: order,
            month: this.month.value,
            year: this.year,
        };
        this.service.search(args)
        .then(result => {
            this.data = result.data;

            this.fillTable();
        });
        
    }


    fillTable() {
        const columns = [
            { field: "remark", title: "Akun dan Keterangan", sortable: false}  ,
            { field: "account", title: "Akun", sortable: false},
            { field: "debit", title: "Debet", sortable: false, align: "right"},
            { field: "credit", title: "Kredit", sortable: false, align: "right"},
        ];
        for(var _data of this.data){
            _data.debit=_data.debit>0 ? numeral(_data.debit).format("0,000.00") : "";
            _data.credit=_data.credit>0 ? numeral(_data.credit).format("0,000.00") : "";
        }
        var bootstrapTableOptions = {
            undefinedText: '',
            columns: columns,
            data: this.data,
            rowStyle:this.rowFormatter
        };

        bootstrapTableOptions.height = $(window).height() - $('.navbar').height() - $('.navbar').height() - 25;
        $(this.table).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);

    }

    ExportToExcel() {
        if (!this.year) {
            alert("Tahun Harus Diisi");
        }
        else if(!this.month){
            alert("Bulan Harus Diisi");
        }
        let args = {
            month: this.month.value,
            year: this.year,
        };
        this.service.generateExcel(args);
    }

    reset() {
        this.year = moment().format("YYYY");
        this.month = { text: "January", value: 1 };
        this.error = {};

        this.flag = false;
        this.table.refresh();
    }

    search() {
        if (!this.year) {
            alert("Tahun Harus Diisi");
        }
        else if(!this.month){
            alert("Bulan Harus Diisi");
        }
        this.searching();
    }
}