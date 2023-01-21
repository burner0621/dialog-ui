import { inject, bindable } from 'aurelia-framework';
import {Service,CoreService} from "./service";
import moment from 'moment';
import "bootstrap-table";
import "bootstrap-table/dist/bootstrap-table.css";
import "bootstrap-table/dist/locale/bootstrap-table-id-ID.js";

import "../../../../components/bootstrap-table-fixed-columns/bootstrap-table-fixed-columns";
import "../../../../components/bootstrap-table-fixed-columns/bootstrap-table-fixed-columns.css";

@inject(Service, CoreService)
export class List {
    @bindable selectedUnit;

    constructor(service,coreService) {
        this.service = service;
        this.coreService = coreService;
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
        var locale = 'id-ID';
        
        var info = {
           
            receivedDateFrom : this.receivedDateFrom ? moment(this.receivedDateFrom).format("YYYY-MM-DD") : "",
            receivedDateTo : this.receivedDateTo ? moment(this.receivedDateTo).format("YYYY-MM-DD") : ""
        }
        
        this.service.search(info)
            .then(result => {
                this.data = result;
                console.log(result);
                var temp = [];
                //this.args.total = result.length;
                var count = 0;
                for (var item of this.data) {
                    if (!temp[item.sampleRequestNo] ) {
                        count = 1;
                        temp[item.sampleRequestNo] = count;
                    }
                    else {
                        count++;
                        temp[item.sampleRequestNo] = count;
                        item.sampleRequestNo = null;
                    }
                }

                for (var item of this.data) {
                    if (item.sampleRequestNo != null) {
                        item.row_count = temp[item.sampleRequestNo];
                    }
                     item.sentDate = moment(item.sentDate).locale(locale).format("DD MMMM YYYY");
                    item.receivedDate =moment(item.receivedDate).locale(locale).format("DD MMMM YYYY");
                    item.sampleRequestDate = moment(item.sampleRequestDate).locale(locale).format("DD MMMM YYYY");
                }
                this.fillTable();
            });
        }
    fillTable() {
        let columns = [
            { field: 'sampleRequestNo', title: 'No Surat Sample', footerFormatter: "" },
            { field: 'roNoSample', title: 'RO Sample', footerFormatter: "" },
            { field: 'sampleCategory', title: 'Kategori', footerFormatter: "" },
            { field: 'sampleTo', title: 'Tipe Sample', footerFormatter: "" },
            { field: 'sampleType', title: 'Jenis Sample', footerFormatter: "" },
            { field: 'buyer', title: 'Buyer', footerFormatter: "" },
            { field: 'style', title: 'Article', footerFormatter: "" },
            { field: 'color', title: 'Color', footerFormatter: "" },
            { field: 'sizeName', title: 'Size', footerFormatter: "" },
            { field: 'sizeDescription', title: 'Keterangan', footerFormatter: "" },
            { field: 'quantity', title: 'Quantity', footerFormatter: "" },
            { field: 'sentDate', title: 'Tgl Shipment', footerFormatter: "" },
            { field: 'receivedDate', title: 'Tgl Terima Surat Sample', footerFormatter: "" },
            { field: 'garmentSectionName', title: 'MD', footerFormatter: "" },
        { field: 'sampleRequestDate', title: 'Tgl Pembuatan Surat Sample', footerFormatter: "" }
          ]
     
             
    
            var bootstrapTableOptions = {
                undefinedText: '',
                columns: columns,
                data: this.data
                
            };
    
            bootstrapTableOptions.height = $(window).height() - $('.navbar').height() - $('.navbar').height() - 25;
            $(this.table).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);
    
            for (const rowIndex in this.data) {
                if(this.data[rowIndex].sampleRequestNo) {
                    var rowSpan=this.data[rowIndex].row_count;
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "sampleRequestNo", rowspan: rowSpan, colspan: 1, rowFormatter:"red" });
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "roNoSample", rowspan: rowSpan, colspan: 1 });
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "sampleCategory", rowspan: rowSpan, colspan: 1 });
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "sampleTo", rowspan: rowSpan, colspan: 1 });
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "sampleType", rowspan: rowSpan, colspan: 1 });
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "buyer", rowspan: rowSpan, colspan: 1 });
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "sentDate", rowspan: rowSpan, colspan: 1 });
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "receivedDate", rowspan: rowSpan, colspan: 1 });
                     $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "garmentSectionName", rowspan: rowSpan, colspan: 1 });
                     $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "sampleRequestDate", rowspan: rowSpan, colspan: 1 });
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
           
            receivedDateFrom : this.receivedDateFrom ? moment(this.receivedDateFrom).format("YYYY-MM-DD") : "",
            receivedDateTo : this.receivedDateTo ? moment(this.receivedDateTo).format("YYYY-MM-DD") : ""
      
        }
        this.service.generateExcel(info);
    }

     
    reset() {
        this.receivedDateFrom = null;
        this.receivedDateTo = null;
         
    }
  
    
}