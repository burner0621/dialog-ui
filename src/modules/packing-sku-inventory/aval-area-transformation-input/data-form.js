import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service } from "./service";

@inject(Service)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;
  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  };
  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  avalTypes = ["", "Aval Printex", "Aval Batik Motif Kecil", "Aval Batik Motif Besar", "Aval Printing (10-49 cm)",
    "Aval Kain Kotor", "Aval Tali Kotor", "Aval Sambungan", "Aval Kain Head Cut", "Aval Solid",
    "Aval A (Lap Besar)", "Aval B (Lap Kecil)", "Aval Solid TR", "Aval Batik TW (karantina)"];

  itemColumns = ["No. Bon", "No. SPP", "Qty Order", "No. Kereta", "Material", "Nama Barang", "Unit", "Buyer",
    "Warna", "Motif", "Macam Barang", "Mesin", "Satuan", "Qty IN"];
  shifts = ["PAGI", "SIANG"];
  detailOptions = {};
  areas = [
    "INSPECTION MATERIAL",
    "PROD",
    "TRANSIT",
    "PACK",
    "GUDANG JADI",
    "SHIPPING",
    "GUDANG AVAL",
    "LAB",
  ];
  constructor(service) {
    this.service = service;
  }

  groups = ["A", "B"];

  areaMovementTextFormatter = (areaInput) => {
    return `${areaInput.bonNo}`;
  };

  doTextFormatter = (deliveryOrder) => {
    return `${deliveryOrder.DOSalesNo}`;
  };

  @computedFrom("data.id")
  get isEdit() {
    return (this.data.id || "").toString() != "";
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;

    this.data.area = "GUDANG AVAL";

    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;

    if (this.readOnly) {
      this.itemColumns = ["No. Bon", "No. SPP", "Qty Order", "No. Kereta", "Material", "Nama Barang", "Unit", "Buyer",
        "Warna", "Motif", "Macam Barang", "Mesin", "Satuan", "Qty IN"];
    } else {
      if (this.isEdit) {
        this.itemColumns = ["No. Bon", "No. SPP", "Qty Order", "No. Kereta", "Material", "Nama Barang", "Unit", "Buyer",
          "Warna", "Motif", "Macam Barang", "Mesin", "Satuan", "Qty IN", ""];
      } else {
        this.itemColumns = ["No. Bon", "No. SPP", "Qty Order", "No. Kereta", "Material", "Nama Barang", "Unit", "Buyer",
          "Warna", "Motif", "Macam Barang", "Mesin", "Satuan", "Qty IN"];
      }
    }

    if (this.data.avalType) {
      this.avalType = this.data.avalType;
    }

    this.detailOptions = {
      isEdit: this.isEdit
    };

    if (this.data.avalTransformationProductionOrders) {
      this.data.displayAvalTransformationProductionOrders = this.data.avalTransformationProductionOrders;
    }

  }

  @bindable avalType;
  async avalTypeChanged(n, o) {
    if (this.avalType) {
      this.data.avalType = this.avalType;
      if (!this.data.id) {
        if (this.avalType == "") {
          this.data.displayAvalTransformationProductionOrders = [];
        } else {
          this.data.displayAvalTransformationProductionOrders = await this.service.getProductionOrderFromInput(this.avalType);
        }
      }
    } else {
      this.data.displayAvalTransformationProductionOrders = [];
      this.data.avalType = null;
    }
  }

}
