import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
export class List {
  dataToBePosted = [];
  context = ["Rincian", "Cetak PDF"]
  options = {};
  columns = [
    {
      field: "isPosting", title: "Post", checkbox: true, sortable: false,
      formatter: function (value, data, index) {
        this.checkboxEnabled = !data.IsPosted;
        return ""
      }
    },
    { field: "SCNo", title: "No Sales Contract" },
    { field: "PRNo", title: "No PR" },
    { field: "PRType", title: "Jenis PR" },
    { field: "RONo", title: "No RO" },
    {
      field: "Date", title: "Tanggal PR", formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      }
    },
    { field: "BuyerCode", title: "Kode Buyer" },
    { field: "BuyerName", title: "Nama Buyer" },
    { field: "Article", title: "Artikel" },
    {
      field: "ShipmentDate", title: "Tanggal Shipment", formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      }
    },
    { field: "IsValidatedMD1", title: "Approval Kabag", formatter: (value) => value ? "SUDAH" : "BELUM" },
    { field: "IsValidatedPurchasing", title: "Approval Purchasing", formatter: (value) => value ? "SUDAH" : "BELUM" },
    { field: "IsValidatedMD2", title: "Approval Kadiv", formatter: (value) => value ? "SUDAH" : "BELUM" },
  ];

  rowFormatter(data, index) {
    if (data.IsValidatedMD1 && data.IsValidatedMD2 && data.IsValidated)
      return { classes: "success" }
    else
      return { classes: "danger" }
  }

  loader = (info) => {
    let order = {};
    if (info.sort) {
      order[info.sort] = info.order;
    }
    let filter = {};
    filter["PRType == \"MASTER\" || PRType == \"SAMPLE\""] = true;
    let arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      // select: ["PRNo", "RONo", "ShipmentDate", "Buyer.Name", "Unit.Name", "IsPosted"],
      order: order,
      filter: JSON.stringify(filter)
    }

    return this.service.search(arg, this.byUser)
      .then(result => {
        result.data.forEach(data => {
          data.isPosting = data.IsPosted;
          data.BuyerCode = data.Buyer.Code;
          data.BuyerName = data.Buyer.Name;
        });
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

  determineActivationStrategy() {
    return activationStrategy.replace; //replace the viewmodel with a new instance
    // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
    // or activationStrategy.noChange to explicitly use the default behavior
  }

  activate(params, routeConfig, navigationInstruction) {
    const instruction = navigationInstruction.getAllInstructions()[0];
    const parentInstruction = instruction.parentInstruction;
    this.byUser = parentInstruction.config.settings.byUser;
  }

  get postButtonDisabled() {
      return this.dataToBePosted.filter(d => d.IsPosted === false).length < 1;
  }

  contextClickCallback(event) {
    let arg = event.detail;
    let data = arg.data;
    switch (arg.name) {
      case "Rincian":
        this.router.navigateToRoute('view', { id: data.Id });
        break;
      case "Cetak PDF":
        this.service.getPdf(data.Id);
        break;
    }
  }

  contextShowCallback(index, name, data) {
    switch (name) {
      case "Cetak PDF":
        return data.IsPosted;
      default:
        return true;
    }
  }

  posting() {
    const unpostedDataToBePosted = this.dataToBePosted.filter(d => d.IsPosted === false);
    if (unpostedDataToBePosted.length > 0) {
      if (confirm(`Post ${unpostedDataToBePosted.length} data?`)) 
      {
        this.service.post(unpostedDataToBePosted.map(d => d.Id))
          .then(result => {
            this.table.refresh();
            this.dataToBePosted = [];
          }).catch(e => {
            this.error = e;
          })
      }
    }
  }

  attached() {
        this.options.height = $(window).height() - $('nav.navbar').height() - $('h1.page-header').height();
  }

  create() {
    this.router.navigateToRoute('create');
  }
}
