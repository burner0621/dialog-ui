import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service, PurchasingService } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');
var BuyerLoader = require('../../../loader/garment-buyer-brand-loader');

@inject(Service, PurchasingService)
export class DataForm {
  @bindable readOnly = false;
  @bindable isCreate = false;
  @bindable isEdit = false;
  @bindable isView = false;
  @bindable title;
  @bindable data = {};
  @bindable selectedUnit;
  @bindable itemOptions = {};

  constructor(service, purchasingService) {
    this.service = service;
    this.purchasingService = purchasingService;
  }

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  UomOptions = ['IKAT', 'COLI', 'CARTON', 'ROLL'];
  controlOptions = {
    label: {
      length: 3
    },
    control: {
      length: 5
    }
  };

  itemsInfo = {
    columns: [
      "RO",
      "Article",
      "Area",
      "Buyer",
      "Komoditi",
      ""
    ]
  }

  get buyerLoader() {
    return BuyerLoader;
  }
  buyerView = (buyer) => {
    var buyerName = buyer.Name || buyer.name;
    var buyerCode = buyer.Code || buyer.code;
    return `${buyerCode} - ${buyerName}`
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.itemOptions = {
      isCreate: this.context.isCreate,
      isEdit: this.context.isEdit,
      isView: this.context.isView,
      checkedAll: this.context.isCreate == true ? false : true
    }

    if (this.data && this.data.Items) {
      // this.data.Items.forEach(
      //   item => {
      //       item.Unit = this.data.Unit;
      //   }
      // );
      for (var item of this.data.Items) {
        var details = [];
        for (var d of item.Details) {
          var detail = {};
          if (details.length == 0) {
            detail.Id=d.Id;
            detail.ServiceSubconSewingId = d.ServiceSubconSewingId;
            detail.SewingInId = d.SewingInId;
            detail.Quantity = d.Quantity;
            detail.DesignColor = d.DesignColor;
            detail.Uom = d.Uom;
            detail.Unit = d.Unit;
            detail.Remark = d.Remark;
            detail.Color = d.Color;
            details.push(detail);
          }
          else {
            var exist = details.find(a => a.DesignColor == d.DesignColor && a.Unit.Id == d.Unit.Id && a.Color == d.Color);
            if (!exist) {
              detail.Id=d.Id;
              detail.ServiceSubconSewingId = d.ServiceSubconSewingId;
              detail.SewingInId = d.SewingInId;
              detail.Quantity = d.Quantity;
              detail.DesignColor = d.DesignColor;
              detail.Uom = d.Uom;
              detail.Unit = d.Unit;
              detail.Remark = d.Remark;
              detail.Color = d.Color;
              details.push(detail);
            }
            else {
              var idx = details.indexOf(exist);
              exist.Quantity += d.Quantity;
              details[idx] = exist;
            }
          }
        }
        item.Details = details;
      }
    }
  }

  unitView = (unit) => {
    return `${unit.Code} - ${unit.Name}`;
  }

  get unitLoader() {
    return UnitLoader;
  }

  selectedUnitChanged(newValue) {
    if (newValue) {
      this.data.Unit = newValue;
    }
    else {
      this.data.Items.splice(0);
    }
    this.data.Items.splice(0);
  }

  get addItems() {
    return (event) => {
      this.data.Items.push({
        //  Unit:this.data.Unit
        Buyer: this.data.Buyer
      });
    };
  }

  get removeItems() {
    return (event) => {
      this.error = null;
    };
  }
  // changeChecked() {
  //   if (this.data.Items) {
  //     for (var a of this.data.Items) {
  //       a.Quantity = 0;
  //       a.IsSave = false;
  //     }
  //   }
  // }

  get totalQuantity() {
    var qty = 0;
    if (this.data.Items) {
      for (var item of this.data.Items) {
        if (item.Details) {
          for (var detail of item.Details) {
            qty += detail.Quantity;
          }
        }
      }
    }
    return qty;
  }

  get buyerLoader() {
    return BuyerLoader;
  }
  buyerView = (buyer) => {
    var buyerName = buyer.Name || buyer.name;
    var buyerCode = buyer.Code || buyer.code;
    return `${buyerCode} - ${buyerName}`
  }
}
