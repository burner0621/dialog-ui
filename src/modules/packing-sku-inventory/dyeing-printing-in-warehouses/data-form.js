import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service } from "./service";

let FilterSPPLoader = require("../../../loader/pre-input-warehouse-spp-loader");

@inject(Service)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;

  constructor(service) {
    this.service = service;
  }

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    // deleteText: "Hapus",
    // editText: "Ubah",
  };

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  itemColumns = [
    "No. SPP",
    "Qty Order",
    "Jenis Order",
    // "Qty Order",
    // "Material",
    // "Unit",
    // "Buyer",
    // "Warna",
    // "Motif",
    // "Qty Packaging",
    // "Packaging",
    // "Jenis",
    // "Grade",
    // "Satuan",
    // "Qty Masuk",
    // "Zona Asal",
    ""
  ];

  shifts = ["PAGI", "SIANG"];
  groups = ["A", "B"];

  detailOptions = {};

  areaMovementTextFormatter = (areaInput) => {
    return `${areaInput.bonNo}`;
  };

  @computedFrom("data.id")
  get isEdit() {
    return (this.data.id || "").toString() != "";
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.type = this.context.type;
    this.data.area = "GUDANG JADI";

    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;

    this.detailOptions = {
      type : this.type
  };
    if (this.ItemsCollection) {
        this.ItemsCollection.bind();
    }
  }

  addItemCallback = (e) => {
    this.data.warehousesProductionOrders =
      this.data.warehousesProductionOrders || [];
    this.data.warehousesProductionOrders.push({});
  };

  get filterSPPLoader() {
    return FilterSPPLoader;
  }
  sppTextFormatter = (spp) => {
    return `${spp.productionOrder.no}`
  }

  @bindable selectedFilterSPP;
  async selectedFilterSPPChanged(n, o) {
    // if (this.selectedFilterSPP) {

      this.data.warehousesProductionOrders = await this.service.getProductionOrderOutputv2ById(this.selectedFilterSPP.productionOrder.id);

      //this.data.warehousesProductionOrders = await this.service.getProductionOrderOutput();

    // } else {

    //   this.data.displayWarehousesProductionOrders = await this.service.getProductionOrderInputv2();

    // }
  }
  removeItems() {
    // this.itemOptions.PackagingList = this.data.PackagingList;
    this.bind();
  }
}
