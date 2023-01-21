import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";
import numeral from "numeral";
import UnitAutoSuggest from "../../../components/customs/auto-suggests/unit-auto-suggest";

import { Dialog } from "../../../au-components/dialog/dialog";
import { CreateView } from "./custom-dialog-view/create-view";

@inject(Router, Service, Dialog)
export class List {
  dataToBePosted = [];
  columns = [
    //     {
    //     field: "isPosting",
    //     title: "Post",
    //     checkbox: true,
    //     sortable: false,
    //     formatter: function (value, data, index) {
    //         this.checkboxEnabled = !data.IsPosted;
    //         // console.log(data)
    //         return ""
    //     }
    // },
    { field: "RqstNo", title: "No VB" },
    {
      field: "VBCategory",
      title: "Tipe VB",
      formatter: function (value, data, index) {
        return value == 1 ? "Dengan PO" : "Non PO";
      },
    },
    {
      field: "RqstDate",
      title: "Tgl. VB",
      formatter: function (value, data, index) {
        return value ? moment(value).format("DD MMM YYYY") : "-";
      },
    },
    { field: "Unit.Name", title: "Unit" },
    { field: "Appliciant", title: "Pemohon" },
    { field: "RealNo", title: "No Realisasi" },
    {
      field: "RealDate",
      title: "Tgl. Realisasi",
      formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      },
    },
    {
      field: "VerDate",
      title: "Tgl. Verifikasi",
      formatter: function (value, data, index) {
        return value ? moment(value).format("DD MMM YYYY") : "-";
      },
    },
    {
      field: "DiffStatus",
      title: "Sisa/Kurang/Sesuai",
    },
    { field: "CurrencyCode", title: "Mata Uang" },
    {
      field: "DiffAmount",
      title: "Jumlah",
      formatter: function (value, data, index) {
        return numeral(value).format("0,000.00");
      },
      align: "right",
    },
    {
      field: "ClearanceDate",
      title: "Tgl. Clearance",
      formatter: function (value, data, index) {
        return value ? moment(value).format("DD MMM YYYY") : "-";
      },
    },
    {
      field: "Status",
      title: "Status Post",
    },
  ];

  rowFormatter(data, index) {
    if (data.IsPosted) return { classes: "success" };
    else return {};
  }

  loader = (info) => {
    let order = {};

    if (info.sort) {
      if (info.sort != "Unit.Name") {
        order[info.sort] = info.order;
      }
    }

    let arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order,
    };

    return this.service.search(arg).then((result) => {
      return {
        total: result.info.total,
        data: result.data,
      };
    });
  };

  constructor(router, service, dialog) {
    this.service = service;
    this.router = router;
    this.dialog = dialog;
  }

  posting() {
    if (this.dataToBePosted.length > 0) {
      this.dialog
        .show(CreateView)
        .then((response) => {
          var data = {
            ListIds: this.dataToBePosted.map((d) => {
              return {
                VBRequestId: d.Id,
                VBRealizationId: d.VBRealizationDocumentId,
              };
            }),
            Bank: response.output.Bank,
          };
          this.service
            .post(data)
            .then((result) => {
              this.table.refresh();
            })
            .catch((e) => {
              this.error = e;
            });
        })
        .catch((e) => {
          this.error = e;
        });
    }
  }

  options = ["Detail"];

  contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    if (data.name != "Total")
      switch (arg.name) {
        case "Detail":
          console.log(arg);
          if (data.VBCategory == 1) {
            window.open(
              `${window.location.origin}/#/clearance-vb/view/${data.VBRealizationDocumentId}`
            );
          } else {
            window.open(
              `${window.location.origin}/#/clearance-vb/view/non-po/${data.VBRealizationDocumentId}`
            );
          }
          break;
      }
  }
}
