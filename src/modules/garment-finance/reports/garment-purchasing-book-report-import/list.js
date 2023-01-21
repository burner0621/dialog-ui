import { inject, bindable } from "aurelia-framework";
import moment from "moment";
import numeral from "numeral";
import XLSX from "xlsx";
import { Service } from "./service";
const SupplierLoader = require("../../../../loader/supplier-loader");
const DivisionLoader = require("../../../../loader/division-loader");

const BillNoLoader = require("../../shared/bill-no-loader");
const PaymentBillLoader = require("../../shared/payment-bill-loader");
const AccountingCategoryLoader = require("../../shared/garment-accounting-category-loader");

@inject(Service)
export class List {
  purchasingCategoryOptions = ["", "Bahan Baku", "Bahan Embalage", "Bahan Pendukung"];
  supplierQuery = { Import: false };
  columns = [
    [
      {
        field: "CustomsArrivalDate",
        title: "Tanggal Bon",
        formatter: function (value, data, index) {
          return value ? moment(value).format("DD MMM YYYY") : "";
        }, rowspan: "2"
      },
      {
        field: "SupplierName", title: "Supplier", rowspan: "2", formatter: function (value, data, index) {
          return value ? data.SupplierCode + " - " + data.SupplierName : "";
        }
      },
      { field: "ProductName", title: "Nama Barang", rowspan: "2" },
      { field: "GarmentDeliveryOrderNo", title: "No Surat Jalan", rowspan: "2" },
      { field: "BillNo", title: "No BP Besar", rowspan: "2" },
      { field: "PaymentBill", title: "No BP Kecil", rowspan: "2" },
      { field: "InvoiceNo", title: "No Invoice", rowspan: "2" },
      { field: "VATNo", title: "No Faktur Pajak", rowspan: "2" },
      { field: "InternalNoteNo", title: "No NI", rowspan: "2" },
      { field: "AccountingCategoryName", title: "Kategori Pembukuan", rowspan: "2" },
      { title: "Bea Cukai", colspan: "4" },
      { title: "Pembelian", colspan: "3" },
      {
        field: "Total", title: "Total(IDR)", rowspan: "2", align: "right", formatter: function (value, data, index) {
          return numeral(value).format("0,000.00");
        }
      }
    ],
    [
      {
        field: "CustomsDate", title: "Tanggal BC",
        formatter: function (value, data, index) {
          return value ? moment(value).format("DD MMM YYYY") : "";
        }
      },
      { field: "CustomsNo", title: "No BC" },
      { field: "CustomsType", title: "Jenis BC" },
      { field: "ImportValueRemark", title: "Ket Nilai Impor" },
      { field: "CurrencyCode", title: "Mata Uang" },
      {
        field: "CurrencyDPPAmount", title: "DPP Valas", align: "right", formatter: function (value, data, index) {
          return numeral(value).format("0,000.00");
        }
      },
      {
        field: "CurrencyRate", title: "Rate", align: "right", formatter: function (value, data, index) {
          return numeral(value).format("0,000.00");
        }
      }
    ]
  ];

  categoryColumns = [
    { field: "CategoryName", title: "Kategori" },
    {
      field: "Amount", title: "Total(IDR)", formatter: function (value, data, index) {
        return numeral(value).format("0,000.00");
      }
    }
  ];

  currencyColumns = [
    { field: "CurrencyCode", title: "Mata Uang" },
    {
      field: "Amount", title: "Total(IDR)", formatter: function (value, data, index) {
        return numeral(value).format("0,000.00");
      }
    }
  ];

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  tableOptions = {
    showColumns: false,
    search: false,
    showToggle: false,
    sortable: false,
    pagination: false,
  };

  constructor(service) {
    this.service = service;
    this.info = {};
    this.error = {};
    this.data = [];
    this.categories = [];
    this.currencies = [];
  }

  get dispositionLoader() {
    return DispositionLoader;
  }
  loader = (info) => {
    let startDate = this.info.startDate && this.info.startDate != "Invalid Date" ? moment(this.info.startDate).format("YYYY-MM-DD") : null;
    let endDate = this.info.endDate && this.info.endDate != "Invalid Date" ? moment(this.info.endDate).format("YYYY-MM-DD") : null;

    let params = {
      billNo: this.info.billNo,
      paymentBill: this.info.paymentBill,
      category: this.info.purchasingCategory,
      startDate: startDate,
      endDate: endDate
    };


    return this.flag
      ? this.service.search(params).then((result) => {
        // let before = {};

        // if (result.data.length != 0) {
        //     for (let i in result.data) {
        //         if (result.data[i].Currency != before.Currency) {
        //             before = result.data[i];
        //             before._Currency_rowspan = 1;
        //         } else {
        //             before._Currency_rowspan++;

        //             result.data[i].Currency = undefined;
        //         }
        //         result.data[i].Products = result.data[i].Products || "";
        //     }
        // }
        // setTimeout(() => {
        //     $('#credit-balance-table td').each(function () {
        //         if ($(this).html() === '-')
        //             $(this).hide();
        //     })
        // }, 10);

        this.currencies = result.data.Currencies;
        this.categories = result.data.Categories;

        return {
          total: 0,
          data: result.data.Data,
        };
      })
      : { total: 0, data: [] };
  };

  search() {
    this.error = {};
    this.flag = true;
    this.tableList.refresh();
  }

  excel() {
    let startDate = this.info.startDate && this.info.startDate != "Invalid Date" ? moment(this.info.startDate).format("YYYY-MM-DD") : null;
    let endDate = this.info.endDate && this.info.endDate != "Invalid Date" ? moment(this.info.endDate).format("YYYY-MM-DD") : null;

    let params = {
      billNo: this.info.billNo ? this.info.billNo : "",
      paymentBill: this.info.paymentBill ? this.info.paymentBill : "",
      category: this.info.purchasingCategory ? this.info.purchasingCategory : "",
      startDate: startDate,
      endDate: endDate
    };

    this.service.getXls(params);

    // this.getExcelData();
  }

  pdf() {
    let startDate = this.info.startDate && this.info.startDate != "Invalid Date" ? moment(this.info.startDate).format("YYYY-MM-DD") : null;
    let endDate = this.info.endDate && this.info.endDate != "Invalid Date" ? moment(this.info.endDate).format("YYYY-MM-DD") : null;

    let params = {
      billNo: this.info.billNo ? this.info.billNo : "",
      paymentBill: this.info.paymentBill ? this.info.paymentBill : "",
      category: this.info.purchasingCategory ? this.info.purchasingCategory : "",
      startDate: startDate,
      endDate: endDate
    };

    this.service.getPdf(params);

    // this.getExcelData();
  }

  reset() {
    this.flag = false;
    this.info.purchasingCategory = null;
    this.info.startDate = null;
    this.info.endDate = null;
    this.error = {};
    this.tableList.refresh();
    this.selectedBillNo = null;
    this.selectedPaymentBill = null;
    this.currencies = [];
    this.categories = [];
  }

  get billNoLoader() {
    return BillNoLoader;
  }

  @bindable selectedBillNo;
  selectedBillNoChanged(newValue, oldValue) {
    if (newValue)
      this.info.billNo = newValue.Value;
    else
      this.info.billNo = null;
    console.log(newValue);
  }

  get paymentBillLoader() {
    return PaymentBillLoader;
  }

  @bindable selectedPaymentBill;
  selectedPaymentBillChanged(newValue, oldValue) {
    if (newValue)
      this.info.paymentBill = newValue.Value;
    else
      this.info.paymentBill = null;
    console.log(newValue);
  }

  get accountingCategoryLoader() {
    return AccountingCategoryLoader;
  }

  @bindable selectedAccountingCategory;
  selectedAccountingCategoryChanged(newValue, oldValue) {
    if (newValue)
      this.info.purchasingCategory = newValue.Value;
    else
      this.info.purchasingCategory = null;
  }
}
