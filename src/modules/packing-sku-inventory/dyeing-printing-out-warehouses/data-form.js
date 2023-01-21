import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service } from "./service";

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
    "No. DO",
    "No. SPP",
    "Qty Order",
    "Material",
    "Unit",
    "Buyer",
    "Warna",
    "Motif",
    "Qty Packaging",
    "Packaging",
    "Jenis",
    "Grade",
    "Satuan",
    "Saldo",
    "Qty Keluar",
  ];

  shifts = ["PAGI", "SIANG"];
  groups = ["A", "B"];
  destinationAreas = ["INSPECTION MATERIAL", "SHIPPING"];

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

    this.data.area = "GUDANG JADI";

    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;

    if (this.data.destinationArea) {
      this.destinationArea = this.data.destinationArea;
      this.detailOptions.destinationArea = this.data.destinationArea;
      if (this.readOnly) {
        this.itemColumns = [
          "No. DO",
          "No. SPP",
          "Qty Order",
          "Material",
          "Unit",
          "Buyer",
          "Warna",
          "Motif",
          "Qty Packaging",
          "Packaging",
          "Jenis",
          "Grade",
          "Satuan",
          "Qty Keluar",
        ];
      } else {
        itemColumns = [
          "No. DO",
          "No. SPP",
          "Qty Order",
          "Material",
          "Unit",
          "Buyer",
          "Warna",
          "Motif",
          "Qty Packaging",
          "Packaging",
          "Jenis",
          "Grade",
          "Satuan",
          "Saldo",
          "Qty Keluar",
        ];
      }
    }
  }

  addItemCallback = (e) => {
    this.data.warehousesProductionOrders =
      this.data.warehousesProductionOrders || [];
    this.data.warehousesProductionOrders.push({});
  };

  ExportToExcel() {
    this.service.generateExcel(this.data.id);
  }
}
