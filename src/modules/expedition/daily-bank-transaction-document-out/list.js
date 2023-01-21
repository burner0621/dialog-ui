import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
  dataToBePosted = [];

  rowFormatter(data, index) {
    if (data.IsPosted)
      return { classes: "success" }
    else
      return {}
  }

  context = ["detail"]

  columns = [{
    field: "IsPosted",
    title: "IsPosted Checkbox",
    checkbox: true,
    sortable: false,
    formatter: function (value, data, index) {
      this.checkboxEnabled = !data.IsPosted;
      return ""
    }
  },
  { field: "Code", title: "No. Transaksi" },
  {
    field: "Date", title: "Tanggal", formatter: function (value, data, index) {
      return moment(value).format("DD MMM YYYY");
    }
  },
  { field: "ReferenceNo", title: "No. Referensi" },
  { field: "bankView", title: "Bank" },
  { field: "Status", title: "Status" },
  { field: "SourceType", title: "Jenis" }
  ];

  loader = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;
    // console.log(info)
    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      filter: JSON.stringify({
        Status: "OUT"
      }),
      // select: ["date", "code", "referenceNo", "referenceType", "type", "storageName"],
      order: order
    }

    return this.service.search(arg)
      .then(result => {

        if (result.data && result.data.length > 0) {
          for (let datum of result.data) {
            datum.bankView = `${datum.Bank.AccountName} - ${datum.Bank.BankName} - ${datum.Bank.AccountNumber} - ${datum.Bank.Currency.Code}`;
          }
        }
        return {
          total: result.info.total,
          data: result.data
        }
      });
  }

  constructor(router, service) {
    this.service = service;
    this.router = router;
    this.selectedItems = [];
  }

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute('view', { id: data.Id });
        break;
    }
  }

  contextShowCallback(index, name, data) {
    switch (name) {
      case "view":
        return true;
      default:
        return true;
    }
  }

  create() {
    this.router.navigateToRoute('create');
  }

  posting() {
    var items = this.selectedItems.map(s => s.Id);
    this.service.posting(items)
      .then(result => {
        alert("Data berhasil disimpan");
        this.error = {};
        this.table.refresh();
        this.selectedItems = [];
      })
      .catch(e => {
        if (e.message) {
          alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
        }
        this.error = e;
      });
  }
}
