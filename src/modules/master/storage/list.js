import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    context = ["detail"];
    columns = [
    { field: "code", title: "Kode" },
    { field: "name", title: "Nama" },
    { field: "unit", title: "Unit", formatter: function (value, data, index) {
        return data.unit.division.Name + " - " + data.unit.name;
      } },
    { field: "description", title: "Deskripsi" },
  ];

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
        for(var a of result.data){
          if(!a.unit){
            a.unit={
              name:"",
              division:{
                name:""
              }
            };
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

    }

    contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute('view', { id: data._id });
        break;
    }
  }

    create() {
        this.router.navigateToRoute('create');
    }

}
