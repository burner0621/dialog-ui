import { inject } from "aurelia-framework";
import moment from "moment";
import numeral from "numeral";
import XLSX from "xlsx";
import { Service } from "./service";

const DPPVATExpenditureDocumentLoader = require("../shared/dpp-vat-expenditure-loader");
const InternalNoteLoader = require("../shared/internal-note-loader");
const InvoiceLoader = require("../shared/invoice-loader");
const SupplierLoader = require("../shared/garment-supplier-loader");

@inject(Service)
export class List {
  paymentMethodList = [
    "",
    "KREDIT",
    "DP(DOWN PAYMENT) + BP(BALANCE PAYMENT)",
    "DP(DOWN PAYMENT) + PERMIN 1 + BP(BALANCE PAYMENT)",
    "RETENSI",
  ];
  isPaidFilter = { IsPaid: true };

  columns = [
    { field: "ExpenditureNoteNo", title: "No Bukti Pengeluaran Bank" },
    {
      field: "ExpenditureDate",
      title: "Tanggal Bayar DPP + PPN",
      formatter: function (value, data, index) {
        return value ? moment(value).format("DD MMM YYYY") : "-";
      },
    },
    { field: "CategoryName", title: "Category" },
    { field: "PaymentMethod", title: "Cara Pembayaran" },
    {
      field: "DPP",
      title: "DPP",
      formatter: function (value, data, index) {
        return value ? numeral(value).format("0,000.00") : "-";
      },
      align: "right",
    },
    {
      field: "VAT",
      title: "PPN",
      formatter: function (value, data, index) {
        return value || value == 0 ? numeral(value).format("0,000.00") : "-";
      },
      align: "right",
    },
    {
      field: "InternalNoteAmount",
      title: "Total Bayar Ke Supplier",
      formatter: function (value, data, index) {
        return value ? numeral(value).format("0,000.00") : "-";
      },
      align: "right",
    },
    { field: "CurrencyCode", title: "Mata Uang" },
    { field: "BankName", title: "Bank Bayar PPH" },
    { field: "SupplierName", title: "Supplier" },
    { field: "InternalNoteNo", title: "No. NI" },
    { field: "InvoiceNo", title: "No Invoice" },
    {
      field: "InvoiceAmount",
      title: "Nilai Invoice",
      formatter: function (value, data, index) {
        return value ? numeral(value).format("0,000.00") : numeral(0).format("0,000.00");
      },
      align: "right",
    },
    {
      field: "InvoiceAmount",
      title: "Nilai Dibayar",
      formatter: function (value, data, index) {
        return value ? numeral(value).format("0,000.00") : numeral(0).format("0,000.00");
      },
      align: "right",
    },
    {
      field: "Difference",
      title: "Selisih",
      formatter: function (value, data, index) {
        return value ? numeral(value).format("0,000.00") : numeral(0).format("0,000.00");
      },
      align: "right",
    },
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
  };

  constructor(service) {
    this.service = service;
    this.info = {};
    this.error = {};
  }

  loader = (info) => {
    let order = {};
    if (info.sort) order[info.sort] = info.order;

    let arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      order: order,
      select: [],
    };

    if (this.info.bankExpenditureNote)
      arg.expenditureId = this.info.bankExpenditureNote.Id;
    if (this.info.unitPaymentOrder)
      arg.internalNoteId = this.info.unitPaymentOrder.Id;
    if (this.info.invoice) arg.invoiceId = this.info.invoice.Id;
    if (this.info.supplier) arg.supplierId = this.info.supplier.Id;
    if (
      (this.info.dateFrom && this.info.dateFrom != "Invalid Date") ||
      (this.info.dateTo && this.info.dateTo != "Invalid Date")
    ) {
      arg.startDate =
        this.info.dateFrom && this.info.dateFrom != "Invalid Date"
          ? this.info.dateFrom
          : "";
      arg.endDate =
        this.info.dateTo && this.info.dateTo != "Invalid Date"
          ? this.info.dateTo
          : "";

      if (!arg.dateFrom) {
        arg.startDate = new Date(arg.startDate);
        arg.startDate.setMonth(arg.startDate.getMonth() - 1);
      }

      if (!arg.endDate) {
        arg.endDate = new Date(arg.startDate);
        arg.endDate.setMonth(arg.endDate.getMonth() + 1);
      }

      arg.startDate = moment(arg.startDate).format("MM/DD/YYYY");
      arg.endDate = moment(arg.endDate).format("MM/DD/YYYY");
    } else {
      arg.startDate = new Date();
      arg.startDate.setMonth(arg.startDate.getMonth() - 1);
      arg.endDate = new Date();

      arg.startDate = moment(arg.startDate).format("MM/DD/YYYY");
      arg.endDate = moment(arg.endDate).format("MM/DD/YYYY");
    }

    return this.flag
      ? this.service.search(arg).then((result) => {
        let before = {};

        for (let i in result.data) {
          if (result.data[i].ExpenditureNoteNo != before.ExpenditureNoteNo) {
            before = result.data[i];
            before._ExpenditureNoteNo_rowspan = 1;
            before._ExpenditureDate_rowspan = 1;
            before._CategoryName_rowspan = 1;
            before._PaymentMethod_rowspan = 1;
            before._DPP_rowspan = 1;
            before._VAT_rowspan = 1;
            before._InternalNoteAmount_rowspan = 1;
            before._CurrencyCode_rowspan = 1;
            before._BankName_rowspan = 1;
          } else {
            before._ExpenditureNoteNo_rowspan++;
            before._ExpenditureDate_rowspan++;
            before._CategoryName_rowspan++;
            before._PaymentMethod_rowspan++;
            before._DPP_rowspan++;
            before._VAT_rowspan++;
            before._InternalNoteAmount_rowspan++;
            before._CurrencyCode_rowspan++;
            before._BankName_rowspan++;

            // before.DPP += result.data[i].DPP;
            // before.IncomeTax += result.data[i].IncomeTax;

            result.data[i].ExpenditureNoteNo = undefined;
            result.data[i].ExpenditureDate = undefined;
            result.data[i].CategoryName = undefined;
            result.data[i].PaymentMethod = undefined;
            result.data[i].DPP = undefined;
            result.data[i].VAT = undefined;
            result.data[i].InternalNoteAmount = undefined;
            result.data[i].CurrencyCode = undefined;
            result.data[i].BankName = undefined;
          }
        }

        setTimeout(() => {
          $('#dpp-ppn-bank-table td').each(function () {
            if ($(this).html() === '-')
              $(this).hide();
          })
        }, 10);

        return {
          total: result.data.length,
          data: result.data,
        };
      })
      : { total: 0, data: [] };
  };

  search() {
    if (this.info.dateFrom == "Invalid Date") this.info.dateFrom = undefined;
    if (this.info.dateTo == "Invalid Date") this.info.dateTo = undefined;

    if (
      (this.info.dateFrom && this.info.dateTo) ||
      (!this.info.dateFrom && !this.info.dateTo)
    ) {
      this.error = {};
      this.flag = true;
      this.tableList.refresh();
    } else {
      // console.log(this.info.dateFrom);
      // console.log(this.info.dateTo);
      if (!this.info.dateFrom) this.error.dateFrom = "Tanggal Awal harus diisi";
      if (!this.info.dateTo) this.error.dateTo = "Tanggal Akhir harus diisi";
    }
  }

  excel() {
    // this.flag = true;

    this.page = 0;
    this.excelData = [];

    if (this.info.dateFrom == "Invalid Date") this.info.dateFrom = undefined;
    if (this.info.dateTo == "Invalid Date") this.info.dateTo = undefined;

    if (
      (this.info.dateFrom && this.info.dateTo) ||
      (!this.info.dateFrom && !this.info.dateTo)
    ) {
      this.error = {};

      let arg = {
        page: 1,
        size: Number.MAX_SAFE_INTEGER,
      };

      if (this.info.bankExpenditureNote)
        arg.expenditureId = this.info.bankExpenditureNote.Id;
      if (this.info.unitPaymentOrder)
        arg.internalNoteId = this.info.unitPaymentOrder.Id;
      if (this.info.invoice) arg.invoiceId = this.info.invoice.Id;
      if (this.info.supplier) arg.supplierId = this.info.supplier.Id;
      if (
        (this.info.dateFrom && this.info.dateFrom != "Invalid Date") ||
        (this.info.dateTo && this.info.dateTo != "Invalid Date")
      ) {
        arg.startDate =
          this.info.dateFrom && this.info.dateFrom != "Invalid Date"
            ? this.info.dateFrom
            : "";
        arg.endDate =
          this.info.dateTo && this.info.dateTo != "Invalid Date"
            ? this.info.dateTo
            : "";

        if (!arg.startDate) {
          arg.startDate = new Date(arg.startDate);
          arg.startDate.setMonth(arg.startDate.getMonth() - 1);
        }

        if (!arg.endDate) {
          arg.endDate = new Date(arg.startDate);
          arg.endDate.setMonth(arg.endDate.getMonth() + 1);
        }

        arg.startDate = moment(arg.startDate).format("MM/DD/YYYY");
        arg.endDate = moment(arg.endDate).format("MM/DD/YYYY");
      } else {
        arg.startDate = new Date();
        arg.startDate.setMonth(arg.startDate.getMonth() - 1);
        arg.endDate = new Date();

        arg.startDate = moment(arg.startDate).format("MM/DD/YYYY");
        arg.endDate = moment(arg.endDate).format("MM/DD/YYYY");
      }

      return this.service.generateXls(arg);
    } else {
      // console.log(this.info.dateFrom);
      // console.log(this.info.dateTo);
      if (!this.info.dateFrom) this.error.dateFrom = "Tanggal Awal harus diisi";
      if (!this.info.dateTo) this.error.dateTo = "Tanggal Akhir harus diisi";
    }
  }

  reset() {
    this.flag = false;
    this.info.bankExpenditureNote = undefined;
    this.info.unitPaymentOrder = undefined;
    this.info.invoice = undefined;
    this.info.supplier = undefined;
    this.info.division = undefined;
    this.info.dateFrom = undefined;
    this.info.dateTo = undefined;
    this.info.paymentMethod = "";
    this.error.dateFrom = undefined;
    this.error.dateTo = undefined;
    this.tableList.refresh();
  }

  get supplierLoader() {
    return SupplierLoader;
  }

  get dppVATExpenditureDocumentLoader() {
    return DPPVATExpenditureDocumentLoader;
  }

  get internalNoteLoader() {
    return InternalNoteLoader;
  }

  get invoiceLoader() {
    return InvoiceLoader;
  }
}
