import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var BuyerLoader = require('../../../loader/garment-buyers-loader');
var BookingOrderLoader = require('../../../loader/garment-booking-order-loader');
var ComodityLoader = require('../../../loader/garment-comodities-loader');
var SectionLoader = require('../../../loader/garment-sections-loader');

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;
    }
    get buyerLoader() {
        return BuyerLoader;
    }
    get bookingOrderLoader() {
        return BookingOrderLoader;
    }
    get comodityLoader() {
        return ComodityLoader;
    }
    get sectionLoader() {
        return SectionLoader;
    }


    confirmStateOption = ["", "Belum Dikonfirmasi", "Sudah Dikonfirmasi"];
    bookingOrderStateOption = ["", "Booking", "Confirmed", "Sudah Dibuat Master Plan"];
    args = { page: 1, size: 25 };

    search() {
        this.args.page = 1;
        this.args.total = 0;
        this.searching();
    }

    searching() {
        var locale = 'id-ID';
        var info = {
            page: this.args.page,
            size: this.args.size,
            section: this.section ? this.section.Code : "",
            no: this.BookingOrderNo ? this.BookingOrderNo.BookingOrderNo : "",
            buyerCode: this.buyer ? this.buyer.Code : "",
            comodityCode: this.comodity ? this.comodity.Code : "",
            statusConfirm: this.confirmState ? this.confirmState : "",
            statusBookingOrder: this.bookingOrderState ? this.bookingOrderState : "",
            dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            dateDeliveryFrom: this.dateDeliveryFrom ? moment(this.dateDeliveryFrom).format("YYYY-MM-DD") : "",
            dateDeliveryTo: this.dateDeliveryTo ? moment(this.dateDeliveryTo).format("YYYY-MM-DD") : ""
        }

        this.service.search(info)

            .then(result => {

                this.data = [];
                this.args.total = result.info.total;

                var _temp = {};
                var row_span_count = 1;
                this.temp = [];
                var temps = {};
                var count = 0;

                for (var prs of result.data) {
                    temps.bookingCode = prs.BookingOrderNo;
                    temps.orderQty = prs.OrderQuantity;
                    this.temp.push(temps);
                }

                for (var pr of result.data) {
                    pr.BookingOrderDate = pr.BookingOrderDate ? moment(pr.BookingOrderDate).locale(locale).format("DD MMMM YYYY") : "";;
                    pr.DeliveryDate = pr.DeliveryDate ? moment(pr.DeliveryDate).locale(locale).format("DD MMMM YYYY") : "";
                    pr.ConfirmDate = pr.ConfirmDate ? moment(pr.ConfirmDate).locale(locale).format("DD MMMM YYYY") : "";
                    pr.DeliveryDateItems = pr.DeliveryDateItems ? moment(pr.DeliveryDateItems).locale(locale).format("DD MMMM YYYY") : "";
                    if (_temp.code == pr.BookingOrderNo) {
                        pr.BookingOrderNo = null;
                        pr.BookingOrderDate = null;
                        pr.BuyerName = null;
                        pr.OrderQuantity = null;
                        pr.DeliveryDate = null;
                        pr.StatusConfirm = null;
                        pr.StatusBooking = null;
                        pr.OrderLeft = null;
                        pr.DateDiff = null;
                        row_span_count = row_span_count + 1;
                        pr.row_count = row_span_count;

                    } else if (!_temp.code || _temp.code != pr.BookingOrderNo) {
                        _temp.code = pr.BookingOrderNo;
                        row_span_count = 1;
                        pr.row_count = row_span_count;
                    }

                    this.data.push(pr);

                    if (this.data[count].row_count > 1) {

                        for (var x = pr.row_count; 0 < x; x--) {
                            var z = count - x;

                            this.data[z + 1].row_count = this.data[count].row_count;
                        }
                    }

                    count++;
                }

                this.fillTable();
            });
    }

    fillTable() {
        const columns = [
            { field: 'BookingOrderNo', title: 'Kode<br>Booking' },
            { field: 'BookingOrderDate', title: 'Tanggal<br>Booking' },
            { field: 'BuyerName', title: 'Buyer' },
            { field: 'OrderQuantity', title: 'Jumlah<br>Order' },
            { field: 'DeliveryDate', title: 'Tanggal<br>Pengiriman(booking)' },
            { field: 'ComodityName', title: 'Komoditi' },
            { field: 'ConfirmQuantity', title: 'Jumlah<br>Confirm' },
            { field: 'CCQuantity', title: 'Budget<br>Turun' },
            { field: 'RemainingQuantity', title: 'Remaining<br>Qty Confirm' },            
            { field: 'DeliveryDateItems', title: 'Tanggal<br>Pengiriman(confirm)' },
            { field: 'ConfirmDate', title: 'Tanggal<br>Confirm' },
            { field: 'Remark', title: 'Keterangan' },
            { field: 'StatusConfirm', title: 'Status<br>Confirm' },
            { field: 'StatusBooking', title: 'Status<br>Booking Order' },
            { field: 'OrderLeft', title: 'Sisa Order<br>(Belum Confirm)' },
            // { field: 'DateDiff', title: 'Selisih Hari<br>(dari Tanggal Pengiriman)' },
            { field: 'NotConfirmedQuantity', title: 'Not Confirmed<br>Order (MINUS)' },
            // { field: 'SurplusQuantity', title: 'Over Confirm<br>(SURPLUS)' }
        ];

        var bootstrapTableOptions = {
            undefinedText: '',
            columns: columns,
            data: this.data,
        };

        bootstrapTableOptions.height = $(window).height() - $('.navbar').height() - $('.navbar').height() - 25;
        $(this.table).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);

        for (const rowIndex in this.data) {
            if(this.data[rowIndex].BookingOrderNo) {
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "BookingOrderNo", rowspan: this.data[rowIndex].row_count, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "BookingOrderDate", rowspan: this.data[rowIndex].row_count, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "BuyerName", rowspan: this.data[rowIndex].row_count, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "OrderQuantity", rowspan: this.data[rowIndex].row_count, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "DeliveryDate", rowspan: this.data[rowIndex].row_count, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "StatusConfirm", rowspan: this.data[rowIndex].row_count, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "StatusBooking", rowspan: this.data[rowIndex].row_count, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "OrderLeft", rowspan: this.data[rowIndex].row_count, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "DateDiff", rowspan: this.data[rowIndex].row_count, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "NotConfirmedQuantity", rowspan: this.data[rowIndex].row_count, colspan: 1 });
                $(this.table).bootstrapTable('mergeCells', { index : rowIndex, field: "SurplusQuantity", rowspan: this.data[rowIndex].row_count, colspan: 1 });
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
            section: this.section ? this.section.Code : "",
            no: this.BookingOrderNo ? this.BookingOrderNo.BookingOrderNo : "",
            buyerCode: this.buyer ? this.buyer.Code : "",
            comodityCode: this.comodity ? this.comodity.Code : "",
            statusConfirm: this.confirmState ? this.confirmState : "",
            statusBookingOrder: this.bookingOrderState ? this.bookingOrderState : "",
            dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            dateDeliveryFrom: this.dateDeliveryFrom ? moment(this.dateDeliveryFrom).format("YYYY-MM-DD") : "",
            dateDeliveryTo: this.dateDeliveryTo ? moment(this.dateDeliveryTo).format("YYYY-MM-DD") : ""
        }
        this.service.generateExcel(info);
    }


    reset() {
        this.section = "";
        this.BookingOrderNo = "";
        this.buyer = "";
        this.comodity = "";
        this.confirmState = "";
        this.bookingOrderState = "";
        this.dateFrom = "";
        this.dateTo = "";
        this.dateDeliveryTo = "";
        this.dateDeliveryFrom = "";

    }

    sectionView = (section) => {
        return `${section.Code} - ${section.Name}`
    }

    buyerView = (buyer) => {
        return `${buyer.Code} - ${buyer.Name} `
    }

    bookingOrderView = (bookingOrder) => {
        return `${bookingOrder.BookingOrderNo} `
    }
    comodityView = (comodity) => {
        return `${comodity.Code} - ${comodity.Name} `
    }

    bookingOrderStateChanged(e) {
        var selectedBookingOrder = e.srcElement.value;
        this.bookingOrderState = "";
        if (selectedBookingOrder == "Booking") {
            this.bookingOrderState = "Booking";
        } else if (selectedBookingOrder == "Confirmed") {
            this.bookingOrderState = "Confirmed";
        } else if (selectedBookingOrder == "Sudah Dibuat Master Plan") {
            this.bookingOrderState = "Sudah Dibuat Master Plan";
        }
        else {
            this.bookingOrderState = "";
        }
    }

    confirmStateChanged(e) {
        var selectedConfirm = e.srcElement.value;
        this.confirmState = "";
        if (selectedConfirm = "Belum Dikonfirmasi") {

            this.confirmState = "Belum Dikonfirmasi";
        } else if (selectedConfirm = "Sudah Dikonfirmasi") {
            this.confirmState = "Sudah Dikonfirmasi";
        } else {
            this.confirmState = "";
        }
    }
}