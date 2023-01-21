import {
  inject
} from 'aurelia-framework';
import {
  Service
} from "./service";
import {
  Router
} from 'aurelia-router';
import {
  AuthService
} from "aurelia-authentication";
var moment = require("moment");

@inject(Router, Service, AuthService)
export class List {
  constructor(router, service, authService) {
    this.service = service;
    this.router = router;
    this.authService = authService;
  }

  filter = {};

  activate(params) {
    let username = null;
    if (this.authService.authenticated) {
      const me = this.authService.getTokenPayload();
      username = me.username;
    }

  }

  context = ["Rincian"];

  tableOptions = {
    showColumns: false,
    search: true,
    showToggle: false,
    sortable: false,
  };

  columns = [{
      field: "AvalComponentNo",
      title: "No Bon Aval"
    },
    {
      field: "UnitName",
      title: "Unit Bon Aval"
    },
    {
      field: "AvalComponentType",
      title: "Asal Barang"
    },
    {
      field: "RONo",
      title: "RO"
    },
    {
      field: "Article",
      title: "Article"
    },
    {
      field: "Quantities",
      title: "Jumlah",
      sortable: false
    },
    {
      field: "Date",
      title: "Tanggal Aval Komponen",
      formatter: value => moment(value).format("DD MMM YYYY")
    },
    {
      field: "CreatedBy",
      title: "Staff"
    }
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
      filter: JSON.stringify(this.filter),
      dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
      dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
    }

    return this.flag ?
      this.service.search(arg)
      .then(result => {
        result.data.forEach(d => {
          d.UnitName = d.Unit.Name
        });
        return {
          total: result.info.total,
          data: result.data
        }
      }) : {
        data: []
      };
  }


  search() {
    this.error = {};
    if (!this.dateTo || this.dateTo == "Invalid Date")
      this.error.dateTo = "Tanggal Akhir harus diisi";

    if (!this.dateFrom || this.dateFrom == "Invalid Date")
      this.error.dateFrom = "Tanggal Awal harus diisi";

    if (Object.getOwnPropertyNames(this.error).length === 0) {
      this.flag = true;
    }
    this.tableList.refresh();
  }

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "Rincian":
        this.router.navigateToRoute('view', {
          id: data.Id
        });
        break;
    }
  }

  create() {
    this.router.navigateToRoute('create');
  }

  reset() {

    this.data = [];
    this.flag = false;
    this.tableList.refresh();
    // this.newData = [];
  }


}
