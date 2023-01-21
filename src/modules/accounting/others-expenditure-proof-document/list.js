import { inject } from "aurelia-framework";
import { Service } from "./service";
import { ServiceCore } from "./service-core";
import { Router } from "aurelia-router";
import moment from "moment";
import numeral from "numeral";

@inject(Router, Service, ServiceCore)
export class List {
  context = ["Rincian", "Cetak Bukti Pengeluaran"];

  rowFormatter(data, index) {
    if (data.IsPosted) return { classes: "success" };
    else return {};
  }

  columns = [
    {
      field: "IsPosted",
      title: "IsPosted Checkbox",
      checkbox: true,
      sortable: false,
      formatter: function (value, data, index) {
        this.checkboxEnabled = !data.IsPosted;
        return "";
      },
    },
    { field: "DocumentNo", title: "No. Bukti Pengeluaran" },
    {
      field: "Date",
      title: "Tanggal",
      formatter: function (value, data, index) {
        return moment.utc(value).local().format("DD MMM YYYY");
      },
    },
    {
      field: "AccountBank",
      title: "Nama Bank",
      formatter: function (value, data, index) {
        return `${value.AccountName} - ${value.AccountNumber}`;
      },
    },
    {
      field: "Total",
      title: "Total",
      formatter: function (value, data, index) {
        return numeral(value).format("0,000.00");
      },
      align: "right",
    },
    {
      field: "AccountBank",
      title: "Mata Uang",
      formatter: function (value, data, index) {
        return `${value.Currency.Code}`;
      },
    },
    { field: "Type", title: "Jenis Transaksi" },
  ];

 // tableOptions = {
    // showColumns: true,
  //  search: true,
   //  showToggle: true,
   //  sortable: true,
   // pagination: true,
 // };

  loader = (info) => {
    // if (info.sort)
    //     order[info.sort] = info.order;
    // else
    //     order["Date"] = "desc";

    let arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
    };

    return this.service.search(arg).then((result) => {
      let itemPromises = result.data.map((datum) => {
        return this.serviceCore
          .getBankById(datum.AccountBankId)
          .then((accountBank) => {
            datum.AccountBank = accountBank;
            return Promise.resolve(datum);
          });
      });

      return Promise.all(itemPromises).then((items) => {
        return {
          total: result.info.total,
          data: items,
        };
      });
    });
  };

  constructor(router, service, serviceCore) {
    this.service = service;
    this.serviceCore = serviceCore;
    this.router = router;
  }

  contextClickCallback(event) {
    let arg = event.detail;
    let data = arg.data;
    switch (arg.name) {
      case "Rincian":
        this.router.navigateToRoute("view", { id: data.Id });
        break;
      case "Cetak Bukti Pengeluaran":
        // console.log(data.Id);
        this.service.getPDFById(data.Id);
        break;
    }
  }

  contextShowCallback(index, name, data) {
    switch (name) {
      case "Cetak Bukti Pengeluaran":
        return data;
      default:
        return true;
    }
  }

  create() {
    this.router.navigateToRoute("create");
  }

  posting() {
    var items = this.selectedItems.map((s) => s.Id);
    this.service
      .posting(items)
      .then((result) => {
        if (result != "") {
          alert("Data berhasil disimpan\n" + result + "telah di posting sebelumnya")
        }
        else {
          alert("Data berhasil disimpan");
        }
        this.error = {};
        this.table.refresh();
        this.selectedItems = [];
      })
      .catch((e) => {
        if (e.message) {
          alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
        }
        this.error = e;
      });
  }
}
