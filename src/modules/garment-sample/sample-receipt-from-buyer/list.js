import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import { AuthService } from "aurelia-authentication";
import moment from 'moment';

@inject(Router, Service, AuthService)
export class List {
  // data = [];
  // info = { page: 1, keyword: '' };
  context = ["Detail"];
  columns = [
    { field: "SaveAs", title: "Tipe" },
    { field: "ReceiptNo", title: "No. Penerimaan Dari Buyer" },
    {
      field: "ReceiptDate", title: "Tanggal Penerimaan", formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY")
      }
    },
    { field: "TotalQuantity", title: "Quantity" } 
  ]

  filter = {};

  loader = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order,
      filter: JSON.stringify(this.filter)
    }
    const distinct = (value, index, self) => {
      return self.indexOf(value) === index;
    }
    return this.service.search(arg)
      .then(result => {
        var data = {};
        data.total = result.info.total;
        data.data = result.data;
        
        return {
          total: result.info.total,
          data: result.data
        }
      });
  }

  constructor(router, service, authService) {
    this.service = service;
    this.router = router;
    this.authService = authService;
  }

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

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "Detail":
        this.router.navigateToRoute('view', { id: data.Id });
        break;
    }
  }

  view(data) {
    this.router.navigateToRoute('view', { id: data.Id });
  }

  create() {
    this.router.navigateToRoute('create');
  }
}
