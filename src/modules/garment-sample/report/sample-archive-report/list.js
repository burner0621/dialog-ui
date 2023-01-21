import { inject, bindable } from 'aurelia-framework';
import {Service} from "./service";
import moment from 'moment';
import "bootstrap-table";
import "bootstrap-table/dist/bootstrap-table.css";
import "bootstrap-table/dist/locale/bootstrap-table-id-ID.js";

import "../../../../components/bootstrap-table-fixed-columns/bootstrap-table-fixed-columns";
import "../../../../components/bootstrap-table-fixed-columns/bootstrap-table-fixed-columns.css";

const SampleLoader = require('../../../../loader/garment-sample-request-loader');
const ComodityLoader = require('../../../../loader/garment-comodities-loader');

@inject(Service)
export class List {
    @bindable selectedUnit;

    Types = ["", "ARSIP MD", "ARSIP SAMPLE"];

    constructor(service) {
        this.service = service;
    }
    controlOptions = {
        label: {
        length: 4
        },
        control: {
        length: 5
        }
    }
    rowFormatter(data, index) {
        if (data.status === "Belum")
            return { classes: "danger" };
        else if(data.status === "Sudah")
            return { classes: "success" };
        else
            return {};
    }
    
    searching() { 
        var info = {
            type : this.type ? this.type : "",
            roNo : this.sample ? this.sample.RONoSample : "",
            comodity : this.comodity ? this.comodity.Code : ""
        }
        
        this.service.search(info)
            .then(result => {
                this.data = result;
                var temp = [];
                var count = 0;
                
                for (var item of this.data) {
                    if (!temp[item.roNo+item.archiveType] ) {
                        count = 1;
                        temp[item.roNo+item.archiveType] = count;
                    }
                    else {
                        count++;
                        temp[item.roNo+item.archiveType] = count;
                        item.roNo = null;
                    }
                }

                for (var item of this.data) {
                    if (item.roNo != null && item.archiveType) {
                        item.row_count = temp[item.roNo+item.archiveType];
                    }
                }
                console.log(item)
                this.fillTable();
            });
        }
    fillTable() {
        let columns = [
            { field: 'archiveType', title: 'Tempat Arsip', footerFormatter: "" },
            { field: 'roNo', title: 'roNo', footerFormatter: "" },
            { field: 'article', title: 'Artikel', footerFormatter: "" },
            { field: 'buyer', title: 'Buyer', footerFormatter: "" },
            { field: 'comodity', title: 'Comodity', footerFormatter: "" },
            { field: 'size', title: 'Size', footerFormatter: "" },
            { field: 'qty', title: 'Quantity', footerFormatter: "" },
            { field: 'uom', title: 'Satuan', footerFormatter: "" },
            { field: 'description', title: 'Keterangan', footerFormatter: "" },
        ]

        var bootstrapTableOptions = {
            undefinedText: '',
            columns: columns,
            data: this.data
            
        };

        bootstrapTableOptions.height = $(window).height() - $('.navbar').height() - $('.navbar').height() - 25;
        $(this.table).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);

        for (const rowIndex in this.data) {
            if(this.data[rowIndex].roNo) {
                var rowSpan=this.data[rowIndex].row_count;
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "archiveType", rowspan: rowSpan, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "roNo", rowspan: rowSpan, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "article", rowspan: rowSpan, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "buyer", rowspan: rowSpan, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "comodity", rowspan: rowSpan, colspan: 1 });
            }
        }

    }
    
        changePage(e) {
            var page = e.detail;
            this.args.page = page;
            this.searching();
        }
    
    
    ExportToExcel() {
        var info = {
            type : this.type ? this.type : "",
            roNo : this.sample ? this.sample.RONoSample : "",
            comodity : this.comodity ? this.comodity.Code : ""
        }
        this.service.generateExcel(info);
    }

     
    reset() {
        this.type = "";
        this.sample = null;
        this.comodity=null;
    }
  
    get comodityLoader(){
        return ComodityLoader;
    }
    get sampleLoader(){
        return SampleLoader;
    }
    comodityView = (como) => {
        return `${como.Code} - ${como.Name}`;
    
    }
}