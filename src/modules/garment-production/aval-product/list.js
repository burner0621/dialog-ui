import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import { AuthService } from "aurelia-authentication";
import moment from 'moment';

@inject(Router, Service,AuthService)
export class List {

  filter={};

  activate(params) {
    let username = null;
    if (this.authService.authenticated) {
        const me = this.authService.getTokenPayload();
        username = me.username;
    }
    this.filter={
      CreatedBy: username
    }
  }
  // data = [];
  // info = { page: 1, keyword: '' };
  context = ["Detail"];
  columns = [
    { field: "RONo", title: "RO" },
    { field: "Article", title: "No. Artikel" },
    {
        field: "AvalDate", title: "Tanggal Aval", formatter: function (value, data, index) {
          return moment(value).format("DD MMM YYYY")
        }
    },
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
      filter:JSON.stringify(this.filter)
    }

    return this.service.search(arg)
      .then(result => {
        this.totalQuantity=result.info.totalQty;
        var data = {};
        data.total = result.info.total;
        data.data = result.data;
        //   data.data.forEach(s => {
        //     if(s.Items){
        //       s.Items.toString = function () {
        //         var str = "<ul>";
        //         for (var item of s.Items) {
        //             str += `<li>${item.Product.Code}</li>`;
        //         }
        //         str += "</ul>";
        //         return str;
        //             }
        //     }
        //     else{
        //       s.Items = "-";
        //     }
        // });
        // }
        // return data;
        // for (var _data of result.data) {
        //     _data.DONo = _data.doNo;
        //     _data.DODate = _data.doDate;
        //     _data.SupplierName = _data.supplier.Name;
        // }
        return {
          total: result.info.total,
          data: result.data
        }
      });
  }

  constructor(router, service,authService) {
    this.service = service;
    this.router = router;
    this.authService=authService;
    // this.uomId = "";
    // this.uoms = [];
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
