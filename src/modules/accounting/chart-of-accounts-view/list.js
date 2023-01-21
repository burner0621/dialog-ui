import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class List {
  // context = ["detail"];
  columns = [
    { field: "Code", title: "Kode" },
    { field: "Name", title: "Nama" },
    { field: "Nature", title: "Nature" },
    { field: "ReportType", title: "Report Type" }
  ];

  headerData;
  data = [];
  items = [];
  async bind() {

    var keyword = "";
    if (this.keyword) {
      keyword = this.keyword;
    }

    var arg = {
      size: Number.MAX_SAFE_INTEGER,
      keyword: keyword
    }
    let headerDataPromise = this.service.searchHeader(arg)
      .then(result => {
        return result;
      });

    var ledgerArg = {
      size: Number.MAX_SAFE_INTEGER,
      order: {
        Code: "asc"
      },
      keyword: keyword
    }
    let ledgerDataPromise = this.service.searchAll(ledgerArg)
      .then(result => {
        return result.data;
      });

    let searchResult = await Promise.all([headerDataPromise, ledgerDataPromise]);

    // console.log(searchResult);

    let headerData = searchResult[0];
    let ledgerData = searchResult[1];

    let items = [];
    for (let header of headerData) {
      let splittedHeaderCodes = header.Code.split("");

      if (splittedHeaderCodes.length > 1) {
        let itemIndex = items.findIndex((item) => item.code == splittedHeaderCodes[0]);
        let subHeader = {
          name: header.Name,
          code: header.Code,
          ledgers: ledgerData.filter((ledger) => {
            let splittedLedgerCode = ledger.Code.split(".");
            let subHeaderCode = splittedLedgerCode[0].slice(0, 2);

            return header.Code == subHeaderCode;
          })
        }
        subHeader.balance = subHeader.ledgers.reduce((sum, current) => sum + current.Balance, 0);
        subHeader.balanceString = subHeader.balance.toFixed(2);
        items[itemIndex].subHeaders.push(subHeader);
        items[itemIndex].balance = items[itemIndex].balance + subHeader.balance;
        items[itemIndex].balanceString = items[itemIndex].balance.toFixed(2);
      } else {
        let item = {
          name: header.Name,
          code: header.Code,
          balance: 0,
          balanceString: 0,
          subHeaders: []
        }
        items.push(item);
      }
    }

    this.items = items;
  }

  // loader = (info) => {
  //   var order = {};
  //   if (info.sort)
  //     order[info.sort] = info.order;

  //   var arg = {
  //     page: parseInt(info.offset / info.limit, 10) + 1,
  //     size: info.limit,
  //     keyword: info.search,
  //     order: order
  //   }

  //   return this.service.searchAll(arg)
  //     .then(result => {
  //       return {
  //         total: result.info.total,
  //         data: result.data
  //       }
  //     });
  // }

  search() {
    this.bind()
  }

  constructor(router, service) {
    this.service = service;
    this.router = router;
    this.buyerId = "";
    this.buyers = [];
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
    // this.router.navigateToRoute('create');
  }

  upload() {
    this.router.navigateToRoute('upload');
  }

  download() {
    var endpoint = 'master/chart-of-accounts/download';
    var request = {
      method: 'GET'
    };

    var getRequest = this.service.endpoint.client.fetch(endpoint, request);
    this.service._downloadFile(getRequest);
    this.service.publish(getRequest);
  }

  // closeOthers = true;

  deleteItem() {
    alert('Deleting item');
  }

  delete(id) {
    console.log(id);
  }

}
