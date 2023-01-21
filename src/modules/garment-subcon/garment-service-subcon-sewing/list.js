import { inject } from 'aurelia-framework';
import { Service, PurchasingService } from "./service";
import { Router } from 'aurelia-router';
import { AuthService } from "aurelia-authentication";
var moment = require("moment");

@inject(Router, Service, AuthService, PurchasingService)
export class List {
  constructor(router, service, authService, purchasingService) {
    this.service = service;
    this.router = router;
    this.authService = authService;
    this.purchasingService = purchasingService;
  }

  filter = {};

  activate(params) {
    let username = null;
    if (this.authService.authenticated) {
      const me = this.authService.getTokenPayload();
      username = me.username;
    }
    this.filter = {
      CreatedBy: username
    }
  }

  context = ["Rincian", "Cetak PDF"];

  columns = [
    { field: "ServiceSubconSewingNo", title: "No Subcon Jasa Garment Wash" },
    {
      field: "ServiceSubconSewingDate", title: "Tgl Subcon Jasa Garment Wash", formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY")
      },
    },
    { field: "RONo", title :"RO"},
    { field: "Buyer.Name", title: "Buyer" },
    { field: "TotalQty", title: "Total Qty" },
    { field: "Unit", title: "Satuan" }
    // { field: "RONo", title: "RO" },
    // { field: "Article", title: "No Artikel" },
    // { field: "TotalQuantity", title: "Jumlah", sortable: false },
    // { field: "ColorList", title: "Warna", sortable: false },
    // { field: "ProductList", title: "Kode Barang", sortable: false },
  ]

  loader = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order,
      select: ["ServiceSubconSewingNo", "ServiceSubconSewingDate", "RONo", "Buyer.Name", "TotalQty", "Unit"],
    }

    return this.service.searchComplete(arg)
      .then(result => {
        var qty = 0;
        var data = {};
        data.total = result.info.total;
        data.data = result.data;
        result.data.map(s => {
          var arrQty = s.Items.map(d => {
            return d.Details.reduce((acc, cur) => acc += cur.Quantity, 0);
          });
          s.TotalQty = arrQty.reduce((acc, cur) => acc += cur, 0);
          s.Unit = "PCS";
          // s.Items.toString = function () {
          //   var str = "<ul>";
          //   for (var item of s.Items){
          //     str += `<li>${item.RONo}</li>`
          //   }
          //   str += "</ul>";
          //   return str;
          // }
          var getRO = s.Items.map(x => {
            return `<ul><li>${x.RONo}</li></ul>`;
              // var str = "<ul>";
              // for (var item of s.Items){
              //   str += `<li>${item.RONo}</li>`
              // }
              // str += "</ul>";
              // return str;
          })
          s.RONo = getRO;
          qty += s.TotalQty
          // s.UnitCode = s.Unit.Code;
          // s.ColorList = `${s.Colors.map(p => `- ${p}`).join("<br/>")}`;
          // s.ProductList = `${s.Products.map(p => `- ${p}`).join("<br/>")}`;
        });
        
        
        this.totalQuantity = qty;
        return {
          total: result.info.total,
          data: result.data
        }
      });
  }

  async contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;

    switch (arg.name) {
      case "Rincian":
        this.router.navigateToRoute('view', { id: data.Id });
        break;
      case "Cetak PDF":
        this.service.getPdfById(data.Id);
        break;

    }
  }

  create() {
    this.router.navigateToRoute('create');
  }

   excel() {
        this.router.navigateToRoute('excel');     
  }
}
