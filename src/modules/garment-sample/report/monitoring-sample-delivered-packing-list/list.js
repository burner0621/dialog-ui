import { inject, bindable } from 'aurelia-framework';
import {Service} from "./service";
import moment from 'moment';
import "bootstrap-table";
import "bootstrap-table/dist/bootstrap-table.css";
import "bootstrap-table/dist/locale/bootstrap-table-id-ID.js";

import "../../../../components/bootstrap-table-fixed-columns/bootstrap-table-fixed-columns";
import "../../../../components/bootstrap-table-fixed-columns/bootstrap-table-fixed-columns.css";

var InvLoader = require('../../../../loader/garment-packing-list-delivered-sample-loader');

@inject(Service)
export class List {
    

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

   
    @bindable PaymentItem;
    PaymentTermOptions = ['','TT/OA', 'NON COMMERCIAL'];

    PaymentItemChanged(newvalue){
        if (newvalue) {
            if (newvalue === "TT/OA") {
                this.paymentTerm = "TT/OA";
             
            }
            else if (newvalue === "NON COMMERCIAL") { 
                this.paymentTerm = "NON COMMERCIAL"; 

            }else{
                this.paymentTerm = "";
            }
        }

    }
 
    @bindable selectedInv;
    get invLoader(){
        return InvLoader;
    }

    invView = (inv) => {
        return `${inv.invoiceNo}`;

    }

    selectedInvChanged(newValue) {
        if (newValue) {
            this.InvoiceNo = newValue;
        } else {
            this.InvoiceNo = null;
        }
    }

    searching() {
        var locale = 'id-ID';
        
        var info = {
            invoiceNo : this.selectedInv ? this.selectedInv.invoiceNo : "" ,
            paymentTerm : this.paymentTerm ? this.paymentTerm : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        
        this.service.search(info)
            .then(result => {
                this.data = result;
                
                var temp = [];
                // this.args.total = result.length;
                var count = 0;
                
                for (var item of this.data.data) {
                    
                    if (!temp[item.invoiceNo] ) {
                        count = 1;
                        temp[item.invoiceNo] = count;
                    }
                    else {
                        count++;
                        temp[item.invoiceNo] = count;
                        item.invoiceNo = null;
                        
                    }
                }

                for (var item of this.data.data) {
                    if (item.invoiceNo != null) {
                        item.row_count = temp[item.invoiceNo];
                        
                    }
                    
                    item.date = moment(item.date).locale(locale).format("DD MMMM YYYY");
                    item.truckingDate =moment(item.truckingDate).locale(locale).format("DD MMMM YYYY");
                    
                }
               
                this.fillTable();
            });
        }
    fillTable() {
        let columns = [
            { field: 'invoiceNo', title: 'No Invoice', footerFormatter: "" },
            { field: 'packingListType', title: 'Jenis Packing List', footerFormatter: "" },
            { field: 'invoiceType', title: 'Jenis Invoice', footerFormatter: "" },
            { field: 'section', title: 'Seksi', footerFormatter: "" },
            { field: 'date', title: 'Tanggal Invoice', footerFormatter: "" },
            { field: 'paymentTerm', title: 'Payment Term', footerFormatter: "" },
            { field: 'buyerAgent', title: 'Buyer Agent', footerFormatter: "" },
            { field: 'truckingDate', title: 'Tanggal Truncking', footerFormatter: "" },
            { field: 'destination', title: 'Destinasi', footerFormatter: "" },
            { field: 'roNo', title: 'No RO', footerFormatter: "" },
            { field: 'article', title: 'Article', footerFormatter: "" },
            { field: 'comodity', title: 'Komoditi', footerFormatter: "" },
            { field: 'quantity', title: 'Quantity', footerFormatter: "" },
            { field: 'index', title: 'Index', footerFormatter: "" },
            { field: 'carton1', title: 'Carton 1', footerFormatter: "" },
            { field: 'carton2', title: 'Carton 2', footerFormatter: "" },
            { field: 'style', title: 'Style', footerFormatter: "" },
            { field: 'colour', title: 'Colour', footerFormatter: "" },
            { field: 'cartonQuantity', title: 'Qty Per Carton', footerFormatter: "" },
            { field: 'quantityPCS', title: 'Jumlah Carton', footerFormatter: "" },
            { field: 'size', title: 'Size', footerFormatter: "" },
            { field: 'sizeQuantity', title: 'Qty Per Size', footerFormatter: "" },
            { field: 'createdBy', title: 'Yang Membuat', footerFormatter: "" }
          ]
     
             
    
            var bootstrapTableOptions = {
                undefinedText: '',
                columns: columns,
                data: this.data.data
                
            };
        
    
            bootstrapTableOptions.height = $(window).height() - $('.navbar').height() - $('.navbar').height() - 25;
            $(this.table).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);
    
            for (const rowIndex in this.data.data) {
                if(this.data.data[rowIndex].invoiceNo) {
                    var rowSpan=this.data.data[rowIndex].row_count;
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "invoiceNo", rowspan: rowSpan, colspan: 1, rowFormatter:"red" });
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "packingListType", rowspan: rowSpan, colspan: 1 });
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "invoiceType", rowspan: rowSpan, colspan: 1 });
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "section", rowspan: rowSpan, colspan: 1 });
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "date", rowspan: rowSpan, colspan: 1 });
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "paymentTerm", rowspan: rowSpan, colspan: 1 });
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "buyerAgent", rowspan: rowSpan, colspan: 1 });
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "truckingDate", rowspan: rowSpan, colspan: 1 });
                    $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "destination", rowspan: rowSpan, colspan: 1 });
                    // $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "roNo", rowspan: rowSpan, colspan: 1 });
                    // $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "article", rowspan: rowSpan, colspan: 1 });
                    // $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "comodity", rowspan: rowSpan, colspan: 1 });
                    // $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "quantity", rowspan: rowSpan, colspan: 1 });
                    // $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "index", rowspan: rowSpan, colspan: 1 });
                    // $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "carton1", rowspan: rowSpan, colspan: 1 });
                    // $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "carton2", rowspan: rowSpan, colspan: 1 });
                    // $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "style", rowspan: rowSpan, colspan: 1 });
                    // $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "colour", rowspan: rowSpan, colspan: 1 });
                    // $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "cartonQuantity", rowspan: rowSpan, colspan: 1 });
                    // $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "quantityPCS", rowspan: rowSpan, colspan: 1 });
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
            invoiceNo : this.selectedInv ? this.selectedInv.invoiceNo : "" ,
            paymentTerm : this.paymentTerm ? this.paymentTerm : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.generateExcel(info);
    }

     
    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.selectedInv = "";
        this.PaymentItem = "";
         
    }
  
    
}