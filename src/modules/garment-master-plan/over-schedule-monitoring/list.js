import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var BuyerLoader = require('../../../loader/garment-buyers-loader');
var BookingOrderLoader = require('../../../loader/garment-booking-order-by-no-loader');
var SectionLoader = require('../../../loader/garment-sections-loader');
var ComodityLoader = require('../../../loader/garment-comodities-loader');

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;
    }
    get sectionLoader() {
        return SectionLoader;
    }

    get comodityLoader() {
        return ComodityLoader;
    }

    get buyerLoader() {
        return BuyerLoader;
    }
    get bookingOrderLoader() {
        return BookingOrderLoader;
    }

    cancelStateOption = ["", "Cancel Confirm", "Cancel Sisa", "Expired"];
    args = { page: 1, size: 25 };

    search() {
        this.args.page = 1;
        this.args.total = 0;
        this.searching();
    }

    searching() {
        var locale = 'id-ID';
        let info = {
            page: this.args.page,
            size: this.args.size,
        }

        let filter={
            section: this.section ? this.section.Code : "",
            bookingCode: this.no ? this.no.BookingOrderNo : "",
            buyer: this.buyerCode ? this.buyerCode.Code : "",
            comodity: this.comodity ? this.comodity.Code : "",
            dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            dateDeliveryFrom: this.dateDeliveryFrom ? moment(this.dateDeliveryFrom).format("YYYY-MM-DD") : "",
            dateDeliveryTo: this.dateDeliveryTo ? moment(this.dateDeliveryTo).format("YYYY-MM-DD") : ""
        }

        this.args.filter=JSON.stringify(filter);

        this.service.search(this.args)

            .then(result => {
                this.data = result.data;
                this.args.total = result.info.total;
                var temp = [];
                var count = 0;
                for (var item of this.data) {
                    if (!temp[item.bookingCode]) {
                        count = 1;
                        temp[item.bookingCode] = count;
                    }
                    else {
                        count++;
                        temp[item.bookingCode] = count;
                        item.bookingCode = null;
                    }
                }

                for (var item of this.data) {
                    if (item.bookingCode != null) {
                        item.row_count = temp[item.bookingCode];
                    }
                    item.week = "W" + item.weekNum + " " + moment(item.startDate).locale(locale).format("DD MMMM YYYY") + " s/d " + moment(item.endDate).locale(locale).format("DD MMMM YYYY");
                    item.bookingDate = moment(item.bookingDate).locale(locale).format("DD MMMM YYYY");
                    item.deliveryDate = moment(item.deliveryDate).locale(locale).format("DD MMMM YYYY");
                    item.bookingDeliveryDate = moment(item.bookingDeliveryDate).locale(locale).format("DD MMMM YYYY");
                }

                this.fillTable();

            });

    }

    fillTable() {
        let columns = [
            [
                { field:"bookingCode", rowspan:"2", title:"No.<br/>Booking<br/>Order" },
                { field:"bookingDate", rowspan:"2", title:"Tanggal<br/>Booking" },
                { field:"buyer", rowspan:"2", title:"Buyer" },
                { field:"bookingOrderQty", rowspan:"2", title:"Jumlah<br/>Order" },
                { field:"confirmQty", rowspan:"2", title:"Jumlah<br/>Confirm" },
                { field:"bookingDeliveryDate", rowspan:"2", title:"Tanggal<br/>Pengiriman<br/>(booking)" },
                { colspan:"9", title:"Jadwal Pengerjaan" },
            ],
            [
                { field:"comodity", title:"Komoditi" },
                { field:"smv", title:"SMV" },
                { field:"unit", title:"Unit" },
                { field:"year", title:"Tahun" },
                { field:"week", title:"Week" },
                { field:"quantity", title:"Jumlah" },
                { field:"remark", title:"Keterangan" },
                { field:"deliveryDate", title:"Tanggal Pengiriman" },
                { field:"usedEH", title:"Used<br/>EH" },
            ]
        ];

        var bootstrapTableOptions = {
            columns: columns,
            data: this.data,
            undefinedText: '',
        };
        bootstrapTableOptions.height = $(window).height() - $('.navbar').height() - $('.navbar').height() - 25;
        $(this.table).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);

        let mergedRows = [];
        for (const rowIndex in this.data) {
            if (this.data[rowIndex] && this.data[rowIndex].bookingCode) {
                mergedRows.push({
                    rowIndex: rowIndex,
                    rowSpan: 1
                });
            }
            else {
                mergedRows[mergedRows.length - 1].rowSpan += 1;
            }
        }

        for (const mergedRow of mergedRows) {
            $(this.table).bootstrapTable('mergeCells', { index : mergedRow.rowIndex, field: "bookingCode", rowspan: mergedRow.rowSpan, colspan: 1 });
            $(this.table).bootstrapTable('mergeCells', { index : mergedRow.rowIndex, field: "bookingDate", rowspan: mergedRow.rowSpan, colspan: 1 });
            $(this.table).bootstrapTable('mergeCells', { index : mergedRow.rowIndex, field: "buyer", rowspan: mergedRow.rowSpan, colspan: 1 });
            $(this.table).bootstrapTable('mergeCells', { index : mergedRow.rowIndex, field: "bookingOrderQty", rowspan: mergedRow.rowSpan, colspan: 1 });
            $(this.table).bootstrapTable('mergeCells', { index : mergedRow.rowIndex, field: "confirmQty", rowspan: mergedRow.rowSpan, colspan: 1 });
            $(this.table).bootstrapTable('mergeCells', { index : mergedRow.rowIndex, field: "bookingDeliveryDate", rowspan: mergedRow.rowSpan, colspan: 1 });
        }
    }

    changePage(e) {
        var page = e.detail;
        this.args.page = page;
        this.searching();
    }


    ExportToExcel() {
        var info = {
            section: this.section ? this.section.Code : "",
            bookingCode: this.no ? this.no.BookingOrderNo : "",
            buyer: this.buyerCode ? this.buyerCode.Code : "",
            comodity: this.comodity ? this.comodity.Code : "",
            dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            dateDeliveryFrom: this.dateDeliveryFrom ? moment(this.dateDeliveryFrom).format("YYYY-MM-DD") : "",
            dateDeliveryTo: this.dateDeliveryTo ? moment(this.dateDeliveryTo).format("YYYY-MM-DD") : ""
        }
        this.service.generateExcel(JSON.stringify(info));
    }


    reset() {
        this.no = "";
        this.buyerCode = "";
        this.section = "";
        this.comodity = "";
        this.dateFrom = "";
        this.dateTo = "";
        this.dateDeliveryFrom = "";
        this.dateDeliveryTo = "";

    }

    sectionView = (section) => {
        return `${section.Code} - ${section.Name}`
    }

    buyerView = (buyer) => {
        return `${buyer.Code} - ${buyer.Name}`
    }

    bookingOrderView = (bookingOrder) => {
        return `${bookingOrder.BookingOrderNo} `
    }


}