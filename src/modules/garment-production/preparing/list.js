import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import { AuthService } from "aurelia-authentication";
import moment from 'moment';

@inject(Router, Service, AuthService)
export class List {
  // data = [];
  // info = { page: 1, keyword: '' };
  context = ["Detail"];
  columns = [
    { field: "Article", title: "No. Artikel" },
    { field: "RONo", title: "RO" },
    { field: "Unit.Name", title: "Unit" },
    { field: "UENNo", title: "No Bukti Pengeluaran" },
    {
        field: "ProcessDate", title: "Tanggal Preparing", formatter: function (value, data, index) {
          return moment(value).format("DD MMM YYYY")
        }
    },
    { field: "Items", title: "Kode Barang", sortable: false },
  ]

  filter={};

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
    const distinct = (value, index, self) => {
      return self.indexOf(value) === index;
    }
    return this.service.search(arg)
      .then(result => {
        var data = {};
        data.total = result.info.total;
        data.data = result.data;
          data.data.forEach(s => {
            if(s.Items){
              s.Items.toString = function () {
                var str = "<ul>";
                var products = [];
                for (var item of s.Items) {
                    products.push(item.Product.Code)
                }
                var Products = products.filter(distinct);
                for(var product of Products){
                  str += `<li>${product}</li>`;
                }
                str += "</ul>";
                return str;
                    }
            }
            else{
              s.Items = "-";
            }
        });
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
  }

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
