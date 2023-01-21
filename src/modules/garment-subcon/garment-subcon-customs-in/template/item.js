import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service, PurchasingService } from "../service";

const SupplierLoader = require("../../../../loader/garment-supplier-loader");
const DoLoader = require("../../../../loader/garment-delivery-order-loader");

@inject(Service, PurchasingService)
export class Item {
  @bindable selectedSupplier;
  @bindable selectedDo;

  constructor(service, purchasingService) {
    this.service = service;
    this.purchasingService = purchasingService;
  }

  @computedFrom("data.Supplier")
  get filterDo() {
    if (this.data.Supplier) {
      return { SupplierId: this.data.Supplier.Id };
    }
  }

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;

    this.isCreate = context.context.options.isCreate;
    this.isEdit = context.context.options.isEdit;
    this.itemOptions = context.context.options;
    console.log(this.data);
    if (this.data && this.data.DoId) {
      /*this.selectedSupplier = {
        Id: this.data.Supplier && this.data.Supplier.Id,
        Code: this.data.Supplier && this.data.Supplier.Code,
        Name: this.data.Supplier && this.data.Supplier.Name,
      };*/
      this.selectedDo = {
        Id: this.data.DoId,
        DoNo: this.data.DoNo,
        Quantity: this.data.Quantity,
      };
    }
    this.isShowing = true;
  }
  itemsColumnsCreate = ["Keterangan", "Jumlah", "Jumlah Keluar", ""];

  itemsColumns = ["Keterangan", "Jumlah Keluar", ""];

  toggle() {
    if (!this.isShowing) this.isShowing = true;
    else this.isShowing = !this.isShowing;
  }

  supplierView = (supplier) => {
    return `${supplier.code || supplier.Code} - ${supplier.name || supplier.Name}`;
  };

  get supplierLoader() {
    return SupplierLoader;
  }

  selectedSupplierChanged(newValue, oldValue) {
    if (newValue != this.data.Supplier) {
      this.data.Supplier = {
        Id: newValue.id || newValue.Id,
        Code: newValue.code || newValue.Code,
        Name: newValue.name || newValue.Name,
      };
    } else {
      this.data.Supplier = null;
    }
  }

  get doLoader() {
    /*return (keyword) => {
      var info = {
        keyword: keyword,
        filter: JSON.stringify({ supplierId: this.data.Supplier.Id })
      };

      this.purchasingService.getGarmentDo(info).then(result => {
        return result.data
      })
    }*/
    return DoLoader;
  }

  doView = (deliveryOrder) => {
    return `${deliveryOrder.doNo || deliveryOrder.DoNo} `;
  };

  selectedDoChanged(newValue, oldValue) {
    if (newValue.Id != this.data.DoId) {
      this.data.DoId = newValue.Id || newValue.id;
      this.data.DoNo = newValue.doNo || newValue.DoNo;
      if (newValue.items) {
        var qty = newValue.items.map((x) => {
          var totalQty = x.details.reduce(
            (acc, cur) => (acc += cur.doQuantity),
            0
          );
          return totalQty;
        });

        this.data.Quantity = parseFloat(qty) || 0;
      } else {
        this.data.Quantity = newValue.Quantity;
      }
    } else {
      this.data.DoId = 0;
      this.data.DoNo = null;
      this.data.Quantity = 0;
    }
  }
  get addDetails() {
    return (event) => {
        this.data.Details.push({ });
    };
  }

  get removeDetails() {
    return (event) => {
      this.error = null;
    };
  }

  detailColumns=["No BC Keluar", ""]
}
