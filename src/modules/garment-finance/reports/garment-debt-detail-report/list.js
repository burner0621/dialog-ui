import { inject } from "aurelia-framework";
import moment from "moment";
import numeral from "numeral";
import XLSX from "xlsx";
import { Service } from "./service";
const SupplierLoader = require("../../../../loader/garment-supplier-loader");
const GarmentCurrencyLoader = require("../../../../loader/garment-currency-loader");

@inject(Service)
export class List {
  columns = [
    { field: "SupplierName", title: "Supplier" },
    { field: "BillNo", title: "No BP Besar" },
    { field: "PaymentBill", title: "No BP Kecil" },
    { field: "DeliveryOrderNo", title: "No Surat Jalan" },
    { field: "PaymentType", title: "Tipe Bayar" },
    {
      field: "ArrivalDate", title: "Tanggal Nota", formatter: (value, data, index) => {
        return value ? moment(value).format("YYYY-MM-DD") : "";
      }
    },
    {
      field: "DebtAging", title: "Umur Hutang", formatter: (value, data, index) => {
        return data.SupplierName  ? value : "";
      }
    },
    { field: "InternalNoteNo", title: "No Nota Intern" },
    { field: "InvoiceNo", title: "Nomor Invoice" },
    { field: "VATNo", title: "Nomor Faktur" },
    {
      field: "DPPAmount", title: "DPP", align: "right", formatter: function (value, data, index) {
        return numeral(data.DPPAmount).format("0,000.00");
      }
    },
    {
      field: "CurrencyDPPAmount", title: "DPP Valas", align: "right", formatter: function (value, data, index) {
        return numeral(data.CurrencyDPPAmount).format("0,000.00");
      }
    },
    {
      field: "VATAmount", title: "PPN", align: "right", formatter: function (value, data, index) {
        return data.CurrencyVATAmount == 0 ? numeral(value).format("0,000.00") : numeral(data.CurrencyVATAmount).format("0,000.00");
      }
    },
    {
      field: "IncomeTaxAmount", title: "PPh", align: "right", formatter: function (value, data, index) {
        return data.CurrencyIncomeTaxAmount == 0 ? numeral(value).format("0,000.00") : numeral(data.CurrencyIncomeTaxAmount).format("0,000.00");
      }
    },
    {
      field: "Total", title: "Total (DPP + PPN - PPh)", align: "right", formatter: function (value, data, index) {
        return data.CurrencyTotal == 0 ? numeral(value).format("0,000.00") : numeral(data.CurrencyTotal).format("0,000.00");
      }
    },
    { field: "CurrencyCode", title: "Mata Uang" },
    {
      field: "CurrencyRate", title: "Kurs", align: "right", formatter: function (value, data, index) {
        return numeral(value).format("0,000.00");
      }
    },
    {
      field: "CurrencyTotal", title: "Total Valas", align: "right", formatter: function (value, data, index) {
        return numeral(value).format("0,000.00");
      }
    },
    {
      field: "Total", title: "Total (IDR)", align: "right", formatter: function (value, data, index) {
        return numeral(value).format("0,000.00");
      }
    }
  ];

  itemYears = [];
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
  };

  constructor(service) {
    this.service = service;
    this.info = {};
    this.error = {};
    this.data = [];
    this.isEmpty = true;
    this.currency = "";
    this.purchase = 0;
    this.payment = 0;
    this.closingBalance = 0;
    this.itemSupplierTypes = [
      { text: "", value: 0 },
      { text: "Lokal", value: 1 },
      { text: "Impor", value: 2 }
    ];

    this.info.supplierTypeFilter = { text: "", value: 0 };

    this.itemPaymentTypes = ["", "T/T AFTER", "FREE", "CASH", "T/T BEFORE"];
  }

  get supplierLoader() {
    return SupplierLoader;
  }

  get currencyLoader() {
    return GarmentCurrencyLoader;
  }

  supplierView = (supplier) => {
    return supplier.code + " - " + supplier.name;
  };

  loader = (info) => {

    let supplierId = this.info && this.info.supplier ? this.info.supplier.Id : 0;
    let currencyId = this.info && this.info.currency ? this.info.currency.Id : 0;
    let arrivalDate = this.info && this.info.arrivalDate && this.info.arrivalDate != "Invalid Date" ? moment(this.info.arrivalDate).format('YYYY-MM-DD') : moment().format("YYYY-MM-DD")

    let params = {
      supplierId: supplierId,
      supplierTypeFilter: this.info.supplierTypeFilter.value,
      paymentType: this.info.paymentType,
      arrivalDate: arrivalDate,
      currencyId: currencyId
    };


    return this.flag
      ? this.service.search(params).then((result) => {

        return {
          total: 0,
          data: result.data
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
    let supplierId = this.info && this.info.supplier ? this.info.supplier.Id : 0;
    let currencyId = this.info && this.info.currency ? this.info.currency.Id : 0;
    let arrivalDate = this.info && this.info.arrivalDate && this.info.arrivalDate != "Invalid Date" ? moment(this.info.arrivalDate).format('YYYY-MM-DD') : moment().format("YYYY-MM-DD")

    let params = {
      supplierId: supplierId,
      supplierTypeFilter: this.info.supplierTypeFilter.value,
      paymentType: this.info.paymentType,
      arrivalDate: arrivalDate,
      currencyId: currencyId
    };

    this.service.getXls(params);

    // this.getExcelData();
  }

  pdf() {
    let supplierId = this.info && this.info.supplier ? this.info.supplier.Id : 0;
    let currencyId = this.info && this.info.currency ? this.info.currency.Id : 0;
    let arrivalDate = this.info && this.info.arrivalDate && this.info.arrivalDate != "Invalid Date" ? moment(this.info.arrivalDate).format('YYYY-MM-DD') : moment().format("YYYY-MM-DD")

    let params = {
      supplierId: supplierId,
      supplierTypeFilter: this.info.supplierTypeFilter.value,
      paymentType: this.info.paymentType,
      arrivalDate: arrivalDate,
      currencyId: currencyId
    };

    this.service.getPdf(params);

    // this.getExcelData();
  }

  reset() {
    this.flag = false;
    this.info.supplier = undefined;
    this.info.currency = undefined;
    this.info.supplierTypeFilter = 0;
    this.info.arrivalDate = null;
    this.info.paymentType = "";


    this.supplierTypeFilter = { text: "", value: 0 };
    this.data = [];
    this.tableList.refresh();
  }
}
