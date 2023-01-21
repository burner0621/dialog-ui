import { inject, bindable } from "aurelia-framework";
import { Service } from "./service";
import moment from "moment";
var UomLoader = require("../../../loader/uom-loader");

@inject(Service)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;
  // @bindable DyeingPrintingItems;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    // deleteText: "Hapus",
    // editText: "Ubah"
  };

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  itemOptions = {};

  constructor(service) {
    this.service = service;
  }

  bind(context) {
    this.context = context;
    this.service = this.context.service;
    this.data = this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;

    this.isHasData = false;

    this.data.Area = "GUDANG AVAL";
    if (this.data.id) {
      this.data.Date = this.data.date;
      this.data.Shift = this.data.shift;
      this.data.Group = this.data.group;
      if (this.data.avalItems.length > 0) {
        this.data.DyeingPrintingItems = this.data.avalItems;
        this.isHasData = true;
      }
    }
  }

  get uoms() {
    return UomLoader;
  }

  shifts = ["PAGI", "SIANG"];
  
  groups = ["A", "B"];

  Date = null;
  Shift = null;
  Group = null;

  searching() {
    var errorIndex = 0;

    this.data.AvalJointValue = 0;
    this.data.AvalAValue = 0;
    this.data.AvalBValue = 0;
    this.data.AvalInducementValue = 0;
    this.data.AvalDirtyRopeValue = 0;
    this.data.AvalDirtyClothValue = 0;

    if (
      this.data.Date == undefined ||
      this.data.Date == null ||
      this.data.Date == "" ||
      isNaN(this.data.Date)
    ) {
      this.error.Date = "Tanggal Harus Diisi";
      errorIndex++;
    } else {
      this.Date = this.data.Date
        ? moment(this.data.Date).format("DD MMM YYYY HH:mm")
        : null;
      this.error.Date = "";
    }

    if (
      this.data.Shift == undefined ||
      this.data.Shift == null ||
      this.data.Shift == ""
    ) {
      this.error.Shift = "Shift Harus Diisi";
      errorIndex++;
    } else {
      this.Shift = this.data.Shift;
      this.error.Shift = "";
    }

    if (
      this.data.Group == undefined ||
      this.data.Group == null ||
      this.data.Group == ""
    ) {
      this.error.Group = "Group Harus Diisi";
      errorIndex++;
    } else {
      this.Group = this.data.Group;
      this.error.Group = "";
    }

    if (errorIndex == 0) {
      this.data.DyeingPrintingMovementIds = [];

      this.service.getPreAval(this.Date, this.Shift, this.Group).then((result) => {
        if (result.length > 0) {
          result.forEach((dyeingPrintingArea) => {
            var DyeingPrintingMovementIds = {};
            DyeingPrintingMovementIds.DyeingPrintingAreaMovementId =
              dyeingPrintingArea.id;
            DyeingPrintingMovementIds.ProductionOrderIds = [];

            dyeingPrintingArea.preAvalProductionOrders.forEach(
              (productionOrder) => {
                DyeingPrintingMovementIds.ProductionOrderIds.push(
                  productionOrder.productionOrder.id
                );

                this.data.AvalJointValue +=
                  productionOrder.avalConnectionLength;
                if (this.data.AvalJointValue > 0) {
                  this.isAvalJointEditable = false;
                }

                this.data.AvalAValue += productionOrder.avalALength;
                if (this.data.AvalAValue > 0) {
                  this.isAvalAEditable = false;
                }

                // this.data.AvalInducementValue += productionOrder.avalInducementLength;
                // if(this.data.AvalInducementValue > 0){
                //   this.isAvalInducementEditable = false;
                // }

                this.data.AvalBValue += productionOrder.avalBLength;
                if (this.data.AvalBValue > 0) {
                  this.isAvalBEditable = false;
                }

                // this.data.AvalDirtyRopeValue += productionOrder.avalDirtyRopeLength;
                // if(this.data.AvalDirtyRopeValue > 0){
                //   this.isAvalDirtyRopeEditable = false;
                // }

                // this.data.AvalDirtyClothValue += productionOrder.avalDirtyClothLength;
                // if(this.data.AvalDirtyClothValue > 0){
                //   this.isAvalDirtyClothEditable = false;
                // }

                this.isHasData = true;
              }
            );

            this.data.DyeingPrintingMovementIds.push(DyeingPrintingMovementIds);
          });
        } else {
          this.isHasData = false;
        }
      });
    } else {
      this.error.Date;
      this.error.Shift;
    }
  }

  reset() {
    this.data.Date = undefined;

    this.Date = null;
    this.Shift = null;

    this.data.AvalJointValue = 0;
    this.data.AvalAValue = 0;
    this.data.AvalBValue = 0;
    this.data.AvalInducementValue = 0;
    this.data.AvalDirtyRopeValue = 0;
    this.data.AvalDirtyClothValue = 0;

    this.isHasData = false;

    this.error.Date = "";
    this.error.Shift = "";
  }

  dyeingPrintingItemsColumns = [
    {
      value: "avalType",
      header: "Jenis",
    },
    {
      value: "avalCartNo",
      header: "No. Kereta",
    },
    {
      value: "avalUomUnit",
      header: "Satuan",
    },
    {
      value: "avalQuantity",
      header: "Qty Satuan",
    },
    {
      value: "avalQuantityKg",
      header: "Qty KG",
    },
  ];

  addItems = (e) => {
    this.data.DyeingPrintingItems = this.data.DyeingPrintingItems || [];
    this.data.DyeingPrintingItems.push({});
  };
}
