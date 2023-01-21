import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service } from "./service";



@inject(Service)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;
 // @bindable selectedWarehouse;

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
  //destinationAreas = ["INSPECTION MATERIAL", "SHIPPING", "PACKING", "TRANSIT"];
  adjItemColumns = ["No. SPP", "Qty Order", "Jenis Order", "Material", "Unit", "Buyer", "Warna", "Motif", "Grade", "QTY Pack", "Satuan Pack", "Satuan", "QTY Satuan", "QTY Total", "No Dokumen"];
  itemColumns = [
    "No. SPP",
    "Qty Order",
    "Jenis Order",
    ""
  ];

  types = [ "STOCK OPNAME"];
  detailOptions = {};

  

  @computedFrom("data.id")
  get isEdit() {
    console.log("IsEdit ",this.data.id)
    return (this.data.id || "").toString() != "";
  }

  @computedFrom("data.type")
  get isStockOpname() {
    return this.data && this.data.type == "STOCK OPNAME";
  }

  

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.data.area = "GUDANG JADI";
    this.data.type = "STOCK OPNAME";
    this.data.destinationArea = "GUDANG JADI";
    this.error = this.context.error;
    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;

   
    this.detailOptions = {
      isEdit: this.isEdit,
      readOnly: this.readOnly,
    
    };

    if (this.readOnly) {
      this.adjItemColumns = ["No. SPP", "Qty Order", "Jenis Order", "Material", "Unit", "Buyer", "Warna", "Motif", "Grade", "QTY Pack", "Satuan Pack", "Satuan", "QTY Satuan", "QTY Total", "No Dokumen"];
    } else {
      this.adjItemColumns = ["No. SPP", "Qty Order", "Jenis Order", "Material", "Unit", "Buyer", "Warna", "Motif", "Grade", "QTY Pack", "Satuan Pack", "Satuan", "QTY Satuan", "Saldo", "QTY Total", "No Dokumen"];
    }

    if (this.data.type == "STOCK OPNAME") {
      if (this.data.warehousesProductionOrders) {
      
       this.data.warehousesProductionOrders = this.data.warehousesProductionOrders;
      }
    } 
    

    if (this.ItemsCollection) {
      this.ItemsCollection.bind();
    }

  }

  addItemCallback = (e) => {
    this.data.warehousesProductionOrders =
      this.data.warehousesProductionOrders || [];
    this.data.warehousesProductionOrders.push({});
  };
  
  sppTextFormatter = (spp) => {
    return `${spp.productionOrder.no}`
  }

  
  removeItems() {
    // this.itemOptions.PackagingList = this.data.PackagingList;
    this.bind();
  }
  @bindable ItemsCollection;
  @bindable destinationArea;
  destinationAreaChanged(n, o) {
    if (this.destinationArea) {
      this.data.destinationArea = this.destinationArea;
      this.detailOptions.destinationArea = this.data.destinationArea;

      if (this.ItemsCollection) {
        this.ItemsCollection.bind();
      }
    }
  }
  ExportToExcel() {
    this.service.generateExcel(this.data.id);
  }
}
