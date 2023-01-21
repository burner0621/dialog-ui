import { inject, bindable } from "aurelia-framework";
import moment from "moment";
import numeral from "numeral";
import { Service, AzureService } from "./service";

const GarmentNotaInternLoader = require("../../../loader/garment-intern-note-loader");
const GarmentSupplierLoader = require("../../../loader/garment-supplier-loader");

@inject(Service, AzureService)
export class List {
  columns = [
    [
      { field: "InternalNoteNo", title: "No. NI", rowspan: 2, sortable: true },
      {
        field: "InternalNoteDate",
        title: "Tgl NI",
        formatter: function (value, data, index) {
          return moment(value).format("DD MMM YYYY");
        },
        rowspan: 2,
        sortable: true,
      },
      {
        field: "SupplierName",
        title: "Supplier",
        rowspan: 2,
        sortable: true,
      },
      {
        field: "InternalNoteDueDate",
        title: "Tgl Jatuh Tempo",
        formatter: function (value, data, index) {
          return moment(value).format("DD MMM YYYY");
        },
        rowspan: 2,
        sortable: true,
      },
      { title: "Jumlah", colspan: 4 },
      {
        field: "PaymentType",
        title: "Tipe Bayar",
        rowspan: 2,
        sortable: true,
      },
      {
        field: "PaymentMethod",
        title: "Term Pembayaran",
        rowspan: 2,
        sortable: true,
      },
      {
        // field: 'totalDays', title: 'Tempo', rowspan: 2, sortable: true, formatter: function (value, data, index) {
        //     return moment(data.DueDate).diff(moment(data.Date), 'days', false);
        // }
        field: "PaymentDueDays",
        title: "Tempo",
        rowspan: 2,
        sortable: true,
        // formatter: function (value, data, index) {
        //   return Math.abs(
        //     Math.ceil(
        //       (moment(data.DueDate) - moment(data.Date)) / (1000 * 60 * 60 * 24)
        //     )
        //   );
        // },
      },
      {
        field: "Position",
        title: "Posisi",
        formatter: (value, data, index) => {
          let status = this.itemsStatus.find((p) => p.value === value);
          return status != undefined ? status.text : "-";
        },
        rowspan: 2,
        sortable: true,
      },
      // {
      //   field: "SendToVerificationDate",
      //   title: "Tgl Pembelian Kirim",
      //   formatter: function (value, data, index) {
      //     return value ? moment(value).format("DD MMM YYYY") : "-";
      //   },
      //   rowspan: 2,
      //   sortable: true,
      // },
      {
        title: "Tgl Pembelian Kirim", colspan: 2 

      },
      { field: "Remark", title: "Keterangan", rowspan: 2, sortable: true },
      { field: "SendToVerificationBy", title: "Admin", rowspan: 2, sortable: true },
      { title: "Verifikasi", colspan: 2 },
      {
        field: "VerificationAcceptedBy",
        title: "Verifikator",
        sortable: true,
        rowspan: 2,
      },
      { title: "Kasir", colspan: 3 },
      { title: "Pembelian", colspan: 3 },
      { title: "Accounting", colspan: 2 },
    ],
    [
      {
        field: "DPP",
        title: "DPP",
        formatter: function (value, data, index) {
          return value ? numeral(value).format("0,000.00") : "-";
        },
        sortable: true,
        align: "right",
      },

      {
        field: "VAT",
        title: "PPN",
        formatter: function (value, data, index) {
          return value ? numeral(value).format("0,000.00") : "-";
        },
        sortable: true,
        align: "right",
      },
      {
        field: "IncomeTax",
        title: "PPh",
        formatter: function (value, data, index) {
          return value ? numeral(value).format("0,000.00") : "-";
        },
        sortable: true,
        align: "right",
      },
      {
        field: "TotalPaid",
        title: "Total",
        formatter: function (value, data, index) {
          return value ? numeral(value).format("0,000.00") : "-";
        },
        sortable: true,
        align: "right",
      },
      {
        field: "SendToVerificationDate",
        title: "Verifikasi",
        formatter: function (value, data, index) {
          return value ? moment(value).format("DD MMM YYYY") : "-";
        },
        sortable: true,
      },
      {
        field: "SendToAccountingDate",
        title: "Accounting",
        formatter: function (value, data, index) {
          return value ? moment(value).format("DD MMM YYYY") : "-";
        },
        sortable: true,
      },
      {
        field: "VerificationAcceptedDate",
        title: "Tgl Terima",
        formatter: function (value, data, index) {
          return value ? moment(value).format("DD MMM YYYY") : "-";
        },
        sortable: true,
      },
      {
        field: "VerificationSendDate",
        title: "Tgl Kirim",
        formatter: function (value, data, index) {
          return value ? moment(value).format("DD MMM YYYY") : "-";
        },
        sortable: true,
      },
      {
        field: "CashierAcceptedDate",
        title: "Tgl Terima",
        formatter: function (value, data, index) {
          return value ? moment(value).format("DD MMM YYYY") : "-";
        },
        sortable: true,
      },
      {
        field: "BankExpenditureNoteNo",
        title: "No Bukti Pengeluaran Bank",
        sortable: true,
      },
      {
        field: "BankExpenditureNoteDate",
        title: "Tgl Bukti Pengeluaran",
        formatter: function (value, data, index) {
          return value ? moment(value).format("DD MMM YYYY") : "-";
        },
        sortable: true,
      },
      {
        field: "SendToPurchasingDate",
        title: "Tgl Terima",
        formatter: function (value, data, index) {
          return value ? moment(value).format("DD MMM YYYY") : "-";
        },
        sortable: true,
      },
      {
        field: "SendToPurchasingBy",
        title: "Staff",
        sortable: true,
      },
      {
        field: "SendToPurchasingRemark",
        title: "Alasan",
        sortable: true,
      },
      {
        field: "AccountingAcceptedDate",
        title: "Tgl Terima",
        formatter: function (value, data, index) {
          return value ? moment(value).format("DD MMM YYYY") : "-";
        },
        sortable: true,
      },
      {
        field: "AccountingAcceptedBy",
        title: "Staff",
        sortable: true,
      }
    ],
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
    sortable: false
  };

  startDateLabel = "Tgl Pembelian Kirim Verifikasi Awal";
  endDateLabel = "Tgl Pembelian Kirim Verifikasi Akhir";

  startDateAccountingLabel  = "Tgl Kirim ke Accounting Awal";
  endDateAccountingLabel = "Tgl Kirim ke Accounting Awal";

  constructor(service, azureService) {
    this.service = service;
    this.azureService = azureService;

    this.flag = false;
    this.selectNI = ["inNo"];
    this.selectSupplier = ["code", "name"];
    this.itemsStatus = [
      { text: "", value: 0 },
      { text: "Pembelian", value: 1 },
      { text: "Kirim ke Verifikasi", value: 2 },
      { text: "Verifikasi (Diterima)", value: 3 },
      { text: "Kirim ke Kasir", value: 4 },
      { text: "Kasir (Diterima)", value: 5 },
      { text: "Kirim ke Pembelian (Not Verified)", value: 6 },
      { text: "Kirim ke Accounting", value: 7 },
      { text: "Accounting (Diterima)", value: 8 },
    ];
  }

  @bindable status;
  statusChanged(newVal, oldVal) {
    console.log(newVal);

    if (newVal) {
      switch (newVal.value) {
        case 1:
          this.startDateLabel = "Tgl Pembelian Terima Awal";
          this.endDateLabel = "Tgl Pembelian Terima Akhir";
          break;
        case 2:
          this.startDateLabel = "Tgl Pembelian Kirim Verifikasi Awal";
          this.endDateLabel = "Tgl Pembelian Kirim Verifikasi Akhir";
          break;
        case 3:
          this.startDateLabel = "Tgl Verifikasi Terima Awal";
          this.endDateLabel = "Tgl Verifikasi Terima Akhir";
          break;
        case 4:
          this.startDateLabel = "Tgl Verifikasi Kirim Awal";
          this.endDateLabel = "Tgl Verifikasi Kirim Akhir";
          break;
        case 5:
          this.startDateLabel = "Tgl Kasir Terima Awal";
          this.endDateLabel = "Tgl Kasir Terima Akhir";
          break;
        case 8:
          this.startDateLabel = "Tgl Accounting Diterima Awal";
          this.endDateLabel = "Tgl Accounting Diterima Akhir";
          break;
        default:
          this.startDateLabel = "Tgl Pembelian Kirim Verifikasi Awal";
          this.endDateLabel = "Tgl Pembelian Kirim Verifikasi Akhir";
          break;
      }
    } else {
      this.startDateLabel = "Tgl Pembelian Kirim Verifikasi Awal";
      this.endDateLabel = "Tgl Pembelian Kirim Verifikasi Akhir";
    }
  }

  loader = (info) => {
    let order = {};
    if (info.sort) order[info.sort] = info.order;

    let filter = {};

    if (this.garmentNotaIntern) {
      filter.internalNoteId = this.garmentNotaIntern.Id;
    }

    if (this.supplier) {
      filter.supplierId = this.supplier.Id;
    }

    if (this.status && this.status.value && this.status.value != 0) {
      filter.position = this.status.value;
    }

    if (this.dateFrom && this.dateFrom != "Invalid Date") {
      filter.startDate = this.dateFrom;
      filter.endDate = this.dateTo;

      filter.startDate = moment(filter.startDate).format("MM/DD/YYYY");
      filter.endDate = moment(filter.endDate).format("MM/DD/YYYY");
    }

    if (this.dateFromAccounting && this.dateFromAccounting != "Invalid Date") {
      filter.startDateAccounting = this.dateFromAccounting;
      filter.endDateAccounting = this.dateToAccounting;

      filter.startDateAccounting = moment(filter.startDateAccounting).format("MM/DD/YYYY");
      filter.endDateAccounting = moment(filter.endDateAccounting).format("MM/DD/YYYY");
    }


    let arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      // filter: JSON.stringify(filter),
      order: order,
      // select: ['no', 'date', 'dueDate', 'invoceNo', 'supplier.name', 'position'],
    };

    Object.assign(arg, filter);

    return this.flag
      ? this.service.search(arg).then((result) => {
        return {
          data: result.data,
        };
        // });
      })
      : { total: 0, data: [] };
  };

  search() {
    this.flag = true;
    this.tableList.refresh();
  }

  reset() {
    this.flag = false;
    this.garmentNotaIntern = undefined;
    this.supplier = undefined;
    this.status = { value: 0 };
    this.dateFrom = undefined;
    this.dateTo = undefined;
    this.tableList.refresh();
  }

  xls() {
    let filter = {};

    if (this.garmentNotaIntern) {
      filter.internalNoteId = this.garmentNotaIntern.Id;
    }

    if (this.supplier) {
      filter.supplierId = this.supplier.Id;
    }

    if (this.status && this.status.value && this.status.value != 0) {
      filter.position = this.status.value;
    }

    if (this.dateFrom && this.dateFrom != "Invalid Date") {
      filter.startDate = this.dateFrom;
      filter.endDate = this.dateTo;

      filter.startDate = moment(filter.startDate).format("MM/DD/YYYY");
      filter.endDate = moment(filter.endDate).format("MM/DD/YYYY");
    }

    this.service.xls(filter);
  }

  get garmentNotaInternLoader() {
    return GarmentNotaInternLoader;
  }

  get garmentSupplierLoader() {
    return GarmentSupplierLoader;
  }
}
