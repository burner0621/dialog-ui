import { inject, TemplatingEngine } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";

@inject(Router, Service)
export class List {
  context = ['Run ETL'];
  tableDataList = [];
  columns = [
    { field: "dataArea", title: "Data Area" },
    { field: "updatedAt", title: "Updated At", formatter: function (value, data, index) {
      return moment.utc(value).local().format('DD-MM-YYYY HH:mm');
    } },
    { field: "updatedBy", title: "Updated By" },
    { field: "status", title: "Status", formatter: function (value, data, index) {
      if (value == 0) {
        return "Failed";
      }
      return "Success";
    }},
    // { field: "status", title: "Action", formatter: function (value, data, index) {
    //   if (value == 1) {
    //     let infoWindowContent = document.createElement('div');
    //     infoWindowContent.id = `td${index}`; 
    //     infoWindowContent.innerHTML = `<button view-model.ref="button" class="btn btn-default" click.delegate="runETL()">Run ETL</button>`;
    //     return infoWindowContent.innerHTML;
    //   }
    // }},
  ];

  loader = (info) => {
    var order = {};
    if (info.sort) order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order,
    };

    return this.service.search(arg).then((result) => {
      var resultPromise = [];
      if (result && result.data && result.data.length > 0) {
        resultPromise = result.data;
      }
      return Promise.all(resultPromise).then((newResult) => {
        this.tableDataList = newResult;
        return {
          total: result.info.total,
          data: newResult,
        };
      });
    });
  };

  rowFormatter(data, index) {
    if (data.status)
        return { classes: "success" }
    else
        return {}
  }

  constructor(router, service) {
    this.service = service;
    this.router = router;
    this.uomId = "";
    this.uoms = [];
  }

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    if (this.tableDataList.length > 0) {
      if (data.status === false && !this.tableDataList[0].status) {
        switch (arg.name) {
          case "Run ETL":
              return this.runETL(data);
              break;
        }
      } else {
        alert('ETL telah sukses!')
      }
    }
  }

  runETL(data) {
    var endpoint = 'manual-etl';
    var request = {
        method: 'POST',
        headers: {
          'Authorization' : JSON.parse(localStorage.getItem('aurelia_authentication')).data,
        },
        body: JSON.stringify(data)
    };

    var promise = this.service.endpoint.client.fetch(endpoint, request);
    this.service.publish(promise);
    return promise.then(response => {
        if (response.status == 200) {
            this.service.publish(promise);
            alert("ETL telah sukses!");
            return this.table.refresh();
        }
        else if (response.status == 400) {
            this.disabled = false;
            alert("ETL gagal. Silahkan coba lagi atau hubungi developer untuk issue ETL");
            this.service.publish(promise);
        }
    })
  }
}
