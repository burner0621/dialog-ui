import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require('moment');
var UnitLoader = require('../../../loader/unit-loader');
var BudgetLoader = require('../../../loader/budget-loader');
var CategoryLoader = require('../../../loader/category-loader');
var SupplierLoader = require('../../../loader/supplier-loader');
var AccountLoader = require('../../../loader/account-loader');
var PurchaseOrderLoader = require('../../../loader/purchase-request-all-loader');
var EPOLoader = require('../../../loader/purchase-order-external-loader');
var DivisionLoader = require('../../../loader/division-loader');


@inject(Router, Service)
export class List {

    poStates = ["", "Dibatalkan", "PO Internal belum diorder", "Sudah dibuat PO Eksternal", "Sudah diorder ke Supplier", "Barang sudah datang parsial", "Barang sudah datang semua", "Barang sudah diterima Unit parsial", "Barang sudah diterima Unit semua", "Sudah dibuat SPB sebagian", "Sudah dibuat SPB semua"];
    info = { page: 1, size: 25 };

    constructor(router, service) {
        this.service = service;
        this.router = router;
        // this.today = new Date();
        // // this.poStates = this.poStates.map(poState => {
        // //     poState.toString = function () {
        // //         return this.name;
        // //     }
        // //     return poState;
        // // })
        // this.data = [];
    }
    attached() {
    }

    activate() {
    }

    search() {
        //  this.error = {};

        // if (Object.getOwnPropertyNames(this.error).length === 0) {
        //this.flag = true;
        this.info.page = 1;
        this.info.total = 0;
        // if (validate)
        // this.validate();

        // if (!this.error.dateDiff && !this.error.date)
        this.searching();

    }

    validate() {
        let dayDiff = moment(this.endDate).diff(moment(this.startDate), "days");
        let dayDiffPO = moment(this.endDatePO).diff(moment(this.startDatePO), "days");
        console.log(dayDiff);

        this.error = {};
        if (!this.startDate || !this.endDate) {
            this.error.date = "Tanggal awal dan tanggal akhir harus diisi"
        } else if (dayDiff > 30) {
            this.error.dateDiff = "Selisih tanggal tidak boleh lebih dari 30 hari";
        }
        if (!this.startDatePO || !this.endDatePO) {
          this.error.datePO = "Tanggal awal dan tanggal akhir harus diisi"
        } else if (dayDiffPO > 30) {
          this.error.dateDiffPO = "Selisih tanggal tidak boleh lebih dari 30 hari";
        }
    }
    //  string supplierId, long prId = 0, long poExtId = 0, [FromQuery] int page = 1, [FromQuery] int size = 25

    searching() {
        let args = {
            unitId: this.unit ? this.unit.Id.toString().toString() : "",
            categoryId: this.category ? this.category._id.toString() : "",
            divisionId: this.division ? this.division.Id.toString() : "",
            budgetId: this.budget ? this.budget._id.toString() : "",
            createdBy: this.staffName ? this.staffName.username : "",
            status: this.poState ? this.poState : "",
            startDate: this.startDate ? moment(this.startDate).format("MM/DD/YYYY") : "",
            endDate: this.endDate ? moment(this.endDate).format("MM/DD/YYYY") : "",
            startDatePO: this.startDatePO ? moment(this.startDatePO).format("MM/DD/YYYY") : "",
            endDatePO: this.endDatePO ? moment(this.endDatePO).format("MM/DD/YYYY") : "",
            supplierId: this.supplier ? this.supplier._id.toString() : "",
            prId: this.pr ? this.pr._id : 0,
            poExtId: this.epo ? this.epo._id : 0,
            page: this.info.page,
            size: this.info.size
        };



        // var dateFormat = "DD MMM YYYY";
        // var locale = 'id-ID';
        // var moment = require('moment');
        // moment.locale(locale);
        // if (!this.poState)
        //     this.poState = this.poStates[0];
        this.service.search(args)
            .then(result => {
                this.info.total = result.info.total;
                this.data = result.data;
                for (var item of this.data) {
                    //     item.prDate = moment(item.prDate).format("DD MMM YYYY") == "01 Jan 1970" ? "-" : moment(item.prDate).format("DD MMM YYYY");
                    //     item.createdDatePR = moment(item.createdDatePR).format("DD MMM YYYY") == "01 Jan 1970" ? "-" : moment(item.createdDatePR).format("DD MMM YYYY");
                    //     item.receivedDatePO = moment(item.receivedDatePO).format("DD MMM YYYY") == "01 Jan 1970" ? "-" : moment(item.receivedDatePO).format("DD MMM YYYY");
                    //     item.epoDate = moment(item.epoDate).format("DD MMM YYYY") == "01 Jan 1970" ? "-" : moment(item.epoDate).format("DD MMM YYYY");
                    //     item.epoCreatedDate = moment(item.epoCreatedDate).format("DD MMM YYYY") == "01 Jan 1970" ? "-" : moment(item.epoCreatedDate).format("DD MMM YYYY");
                    //     item.epoExpectedDeliveryDate = moment(item.epoExpectedDeliveryDate).format("DD MMM YYYY") == "01 Jan 1970" ? "-" : moment(item.epoExpectedDeliveryDate).format("DD MMM YYYY");
                    //     item.epoDeliveryDate = moment(item.epoDeliveryDate).format("DD MMM YYYY") == "01 Jan 1970" ? "-" : moment(item.epoDeliveryDate).format("DD MMM YYYY");
                    //     item.doDate = moment(item.doDate).format("DD MMM YYYY") == "01 Jan 1970" ? "-" : moment(item.doDate).format("DD MMM YYYY");
                    //     item.doDeliveryDate = moment(item.doDeliveryDate).format("DD MMM YYYY") == "01 Jan 1970" ? "-" : moment(item.doDeliveryDate).format("DD MMM YYYY");
                    //     item.urnDate = moment(item.urnDate).format("DD MMM YYYY") == "01 Jan 1970" ? "-" : moment(item.urnDate).format("DD MMM YYYY");
                    //     item.invoiceDate = moment(item.invoiceDate).format("DD MMM YYYY") == "01 Jan 1970" ? "-" : moment(item.invoiceDate).format("DD MMM YYYY");
                    //     item.upoDate = moment(item.upoDate).format("DD MMM YYYY") == "01 Jan 1970" ? "-" : moment(item.upoDate).format("DD MMM YYYY");
                    //     item.dueDate = moment(item.dueDate).format("DD MMM YYYY") == "01 Jan 1970" ? "-" : moment(item.dueDate).format("DD MMM YYYY");
                    //     item.vatDate = moment(item.vatDate).format("DD MMM YYYY") == "01 Jan 1970" ? "-" : moment(item.vatDate).format("DD MMM YYYY");
                    //     item.incomeTaxDate = item.incomeTaxDate == null ? "-" : moment(item.incomeTaxDate).format("DD MMM YYYY");
                    //     item.correctionDate = moment(item.correctionDate).format("DD MMM YYYY") == "01 Jan 1970" ? "-" : moment(item.correctionDate).format("DD MMM YYYY");

                    //     item.quantity = item.quantity.toLocaleString('en-EN', { minimumFractionDigits: 2 });
                    //     // this.quantity=this.quantity.toLocaleString('en-EN', { minimumFractionDigits: 2 });
                    //     item.pricePerDealUnit = item.pricePerDealUnit.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    //     item.priceTotal = item.priceTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    //     item.urnQuantity = item.urnQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2 });
                    //     // this.urnQuantity=this.urnQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2 });
                    //     item.upoPriceTotal = item.upoPriceTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    //     item.vatValue = item.vatValue.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    //     item.incomeTaxValue = item.incomeTaxValue.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    //     item.valueCorrection = item.valueCorrection.toLocaleString();

                    item.PurchaseRequestDate = item.PurchaseRequestDate ? moment(item.PurchaseRequestDate).format("DD MMM YYYY") : "";
                    item.PurchaseRequestCreatedDate = item.PurchaseRequestCreatedDate ? moment(item.PurchaseRequestCreatedDate).format("DD MMM YYYY") : "";
                    item.InternalPurchaseOrderCreatedDate = item.InternalPurchaseOrderCreatedDate ? moment(item.InternalPurchaseOrderCreatedDate).format("DD MMM YYYY") : "";
                    item.ExternalPurchaseOrderDate = item.ExternalPurchaseOrderDate ? moment(item.ExternalPurchaseOrderDate).format("DD MMM YYYY") : "";
                    item.ExternalPurchaseOrderCreatedDate = item.ExternalPurchaseOrderCreatedDate ? moment(item.ExternalPurchaseOrderCreatedDate).format("DD MMM YYYY") : "";
                    item.ExternalPurchaseOrderExpectedDeliveryDate = item.ExternalPurchaseOrderExpectedDeliveryDate ? moment(item.ExternalPurchaseOrderExpectedDeliveryDate).format("DD MMM YYYY") : "";
                    item.ExternalPurchaseOrderDeliveryDate = item.ExternalPurchaseOrderDeliveryDate ? moment(item.ExternalPurchaseOrderDeliveryDate).format("DD MMM YYYY") : "";
                    item.DeliveryOrderDate = item.DeliveryOrderDate ? moment(item.DeliveryOrderDate).format("DD MMM YYYY") : "";
                    item.DeliveryOrderArrivalDate = item.DeliveryOrderArrivalDate ? moment(item.DeliveryOrderArrivalDate).format("DD MMM YYYY") : "";
                    item.UnitReceiptNoteDate = item.UnitReceiptNoteDate ? moment(item.UnitReceiptNoteDate).format("DD MMM YYYY") : "";
                    item.UnitPaymentOrderInvoiceDate = item.UnitPaymentOrderInvoiceDate ? moment(item.UnitPaymentOrderInvoiceDate).format("DD MMM YYYY") : "";
                    item.UnitPaymentOrderDate = item.UnitPaymentOrderDate ? moment(item.UnitPaymentOrderDate).format("DD MMM YYYY") : "";
                    item.UnitPaymentOrderDueDate = item.UnitPaymentOrderDueDate ? moment(item.UnitPaymentOrderDueDate).format("DD MMM YYYY") : "";
                    item.UnitPaymentOrderVATDate = item.UnitPaymentOrderVATDate ? moment(item.UnitPaymentOrderVATDate).format("DD MMM YYYY") : "";
                    item.UnitPaymentOrderIncomeTaxDate = item.UnitPaymentOrderIncomeTaxDate ? moment(item.UnitPaymentOrderIncomeTaxDate).format("DD MMM YYYY") : "";
                }
                console.log(result);
            })
    }

    reset() {
        this.unit = undefined;
        this.category = undefined;
        this.epo = undefined;
        this.pr = undefined;
        this.purchaseOrder = undefined;
        this.supplier = undefined;
        this.division = undefined;
        this.startDate = undefined;
        this.endDate = undefined;
        this.poState = undefined;
        this.budget = undefined;
        this.staffName = undefined;
        this.startDatePO = undefined;
        this.endDatePO = undefined;
        //this.data = [];
    }

    exportToXls() {
        let args = {
            unitId: this.unit ? this.unit.Id.toString().toString() : "",
            categoryId: this.category ? this.category._id.toString() : "",
            divisionId: this.division ? this.division.Id.toString() : "",
            budgetId: this.budget ? this.budget._id.toString() : "",
            createdBy: this.staffName ? this.staffName.username : "",
            status: this.poState ? this.poState : "",
            startDate: this.startDate ? moment(this.startDate).format("MM/DD/YYYY") : "",
            endDate: this.endDate ? moment(this.endDate).format("MM/DD/YYYY") : "",
            startDatePO: this.startDatePO ? moment(this.startDatePO).format("MM/DD/YYYY") : "",
            endDatePO: this.endDatePO ? moment(this.endDatePO).format("MM/DD/YYYY") : "",
            supplierId: this.supplier ? this.supplier._id.toString() : "",
            prId: this.pr ? this.pr._id : 0,
            poExtId: this.epo ? this.epo._id : 0,
            page: this.info.page,
            size: this.info.size
        };

        // this.validate();
        // if (!this.error.dateDiff && !this.error.date)
        this.service.generateExcel(args);
    }

    startDateChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.endDate);
        this.dateMin = moment(_startDate).format("YYYY-MM-DD");

        if (_startDate > _endDate || !this.endDate) {
            this.endDate = e.srcElement.value;
        }
    }

    startDatePOChanged(e) {
      var _startDate = new Date(e.srcElement.value);
      var _endDate = new Date(this.endDatePO);
      this.dateMin = moment(_startDate).format("YYYY-MM-DD");

      if (_startDate > _endDate || !this.endDate) {
        this.endDatePO = e.srcElement.value;
      }
    } 

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }

    get epoLoader() {
        return EPOLoader;
    }
    get unitLoader() {
        return UnitLoader;
    }

    get budgetLoader() {
        return BudgetLoader;
    }

    get categoryLoader() {
        return CategoryLoader;
    }

    get purchaseOrderLoader() {
        return PurchaseOrderLoader;
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    get accountLoader() {
        return AccountLoader;
    }
    accountView = (account) => {
        return `${account.username}`;
    }
    get divisionLoader() {
        return DivisionLoader;
    }
    divisionView = (division) => {
        return `${division.Name}`;
    }
}
