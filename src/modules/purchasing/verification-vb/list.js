import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, Service)
export class List {
  dataToBePosted = [];

  rowFormatter(data, index) {
    if (data.isPosted)
      return { classes: "success" }
    else
      return {}
  }

  context = ["Rincian"]

  columns = [
    {
      field: "DateVerified", title: "Tanggal Masuk Verifikasi", formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      }
    },
    { field: "RealizeNo", title: "No Realisasi VB" },
    {
      field: "DateRealize", title: "Tanggal Realisasi VB", formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      }
    },
    { field: "VBCategory", title: "Tipe VB" },
    { field: "RequestName", title: "Pemohon VB" },
    { field: "UnitRequest", title: "Bagian/Unit" },
    {
      field: "Amount", title: "Nominal", formatter: function (value, data, index) {
        return numeral(value).format('0,0.000');
      },
    },
    {
      field: "IsVerified", title: "Status",
      formatter: function (value, row, index) {
        return value ? "Kasir" : "Retur";
      }
    },
    { field: "Reason_NotVerified", title: "Alasan" },
  ];

  async activate(params) {
    this.ressearch = params.search;
  }

  loader = (info) => {
    let order = {};

    if (info.sort)
      order[info.sort] = info.order;
    else
      order["VerifiedDate"] = "desc";

    let arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order
    };

    return this.service.search(arg)
      .then(result => {
        return {
          total: result.info.total,
          data: result.data
        }
      });
  }

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "Rincian":
        this.router.navigateToRoute('view', { id: data.Id, search: this.ressearch });
        break;
    }
  }

  contextShowCallback(index, name, data) {
    switch (name) {
      default:
        return true;
    }
  }

  posting() {
    if (this.dataToBePosted.length > 0) {
      // console.log(this.dataToBePosted);
      this.service.post(this.dataToBePosted).then(result => {
        this.table.refresh();
      }).catch(e => {
        this.error = e;
      })
    }
  }

  create() {
    this.router.navigateToRoute('create');
  }
}
