import {
  inject
} from 'aurelia-framework';
import {
  Service
} from "./service";
import {
  Router
} from 'aurelia-router';
import moment from 'moment';
const CategoryLoader = require('../../../../loader/machine-category-loader');
const MachineLoader = require('../../../../loader/machine-custom-loader');
const MachineTypeLoader = require('../../../../loader/machine-custom-type-loader');
const BrandLoader = require('../../../../loader/machine-brand-loader');

@inject(Router, Service)
export class List {
  context = ["Ubah Data"];
  columns = [
    { field: "Classification", title: "KLASIFIKASI" },
    { field: "MachineBrand", title: "BRAND" },
    { field: "MachineCategory", title: "KATEGORY" },
    { field: "MachineType", title: "TIPE" },
    { field: "IDNumber", title: "SERIAL" },
    { field: "MachineQuantity", title: "JUMLAH" ,align: "right"},
    { field: "UnitQuantity", title: "SATUAN" },
    { field: "PurchaseYear", title: "TAHUN BELI" },
    { field: "SupplierType", title: "SUPPLIER" },
  ];

  //   columns = [
  //     { field: "Classification", title: "Classification" },
  //     { field: "MachineBrand", title: "MachineBrand" },
  //     // {
  //     //     field: "CreatedDate", title: "Tanggal Buat", formatter: function (value, data, index) {
  //     //         return moment(value).format("DD MMM YYYY");
  //     //     }
  //     // },
  //     // { field: "CreatedBy", title: "Dibuat Oleh" },
  // ];

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  
  tableOptions = {
    showColumns: false,
    search: false,
    showToggle: false,
    sortable: false,
  };

  // search() {
  //   var args = {
  //     ctg: this.category ? this.category.CategoryName : "",
  //     tipe: this.tipe ? this.tipe.MachineType : "",
  //     serial: this.serial ? this.serial.IDNumber : ""
  //   }
  //   this.service.search(args)

  //     .then(result => {
  //       var index = 1;
  //       this.data = result.data;

  //     });

  // }

  loader = (info) => {
    let params = {
      ctg: this.category ? this.category.CategoryName : "",
      tipe: this.tipe ? this.tipe.MachineType : "",
      serial: this.serial ? this.serial.IDNumber : ""
    };

    return this.flag ?
      this.service.search(params).then((result) => {

        return {
          // total: 0,
          data: result.data
        };
      }) :
      {
        data: []
      };
  }

  search() {
    this.error = {};
    this.flag = true;
    this.tableList.refresh();
  }

  get categoryLoader() {
    return CategoryLoader;
  }


  get brandLoader() {
    return BrandLoader;
  }

  get tipeLoader() {
    return MachineTypeLoader;
  }

  get serialLoader() {
    return MachineLoader;
  }

  categoryView = (cat) => {
    return `${cat.CategoryName}`;
  }

  brandView = (brand) => {
    return `${brand.BrandName}`;
  }

  tipeView = (tipe) => {
    return `${tipe.MachineType}`;
  }

  serialView = (ser) => {
    return `${ser.IDNumber}`;
  }

  // ClickCallback(event) {

  //   var data = event;
  //   this.router.navigateToRoute('edit', {
  //     id: data.MachineID
  //   });
  // }

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "Ubah Data":
        this.router.navigateToRoute('edit', {
          id: data.MachineID
        });
        break;
    }
  }

  reset() {
    this.category = null;
    this.tipe = null;
    this.serial = null;
    this.data = [];
    this.flag = false;
    this.tableList.refresh();
    // this.newData = [];
  }

}
