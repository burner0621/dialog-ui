import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class List {
  context = ["detail"];
  columns = [
    { field: "type", title: "Grade" },
    { field: "code", title: "Kode" }
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
          total: result.total,
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
        this.view(data);
        break;
    }
  }

  view(data) {
    this.router.navigateToRoute('view', { id: data.id });
  }

  upload() {
    this.router.navigateToRoute('upload');
  }

  create() {
    this.router.navigateToRoute('create');
  }

  download() {
    var endpoint = 'master/grade/template/download';
    var request = {
      method: 'GET'
    };

    var getRequest = this.service.endpoint.client.fetch(endpoint, request);
    this.service._downloadFile(getRequest);
    this.service.publish(getRequest);
  }
}
