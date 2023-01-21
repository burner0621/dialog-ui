import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
  // data = [];
  // info = { page: 1, keyword: '' };
  context = ["detail"];
  columns = [
    {
      field: "date", title: "Tanggal", formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY")
      }
    },
    { field: "code", title: "Mata Uang" },
    { field: "rate", title: "Kurs" },
    
  ]

  loader = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order
    }

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
    // this.uomId = "";
    // this.uoms = [];
  }

  contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute('view', { id: data.Id });
        break;
    }
  }

  view(data) {
    this.router.navigateToRoute('view', { id: data.Id });
  }

  upload() {
    this.router.navigateToRoute('upload');
  }
}
