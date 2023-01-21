import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service } from "./service";

let WarehouseBonAreaLoader = require("../../../loader/input-warehouses-bon-loader");
let FilterSPPLoader = require("../../../loader/pre-output-warehouse-spp-loader");
let FilterMaterialLoader = require("../../../loader/pre-inventory-weaving-material-loader");
@inject(Service)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;
  @bindable selectedWarehouse;

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
  destinationAreas = ["ADJ MASUK", "ADJ KELUAR"];
  itemColumns = [
    "Construction",
    ""
  ];

 
  detailOptions = {};

  areaMovementTextFormatter = (areaInput) => {
    return `${areaInput.bonNo}`;
  };

  @computedFrom("data.id")
  get isEdit() {
    return (this.data.id || "").toString() != "";
  }

  @computedFrom("data.type")
  get isAdj() {
    return this.data && this.data.type == "ADJ";
  }

  get bonWarehouseLoader() {
    return WarehouseBonAreaLoader;
  }

  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    console.log(this.data);
    //this.data.area = "GUDANG JADI";
    //console.log(this.error);
    this.error = this.context.error;
    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;

    if (this.data.bonType) {
      this.destinationArea = this.data.bonType;
    }

    this.detailOptions = {
      isEdit: this.isEdit,
      readOnly: this.readOnly,
      destinationArea: this.destinationArea
    };

      if (this.data.ListItems) {
        this.data.displayMaterial = this.data.ListItems;
      }
    

    if (this.ItemsCollection) {
      this.ItemsCollection.bind();
    }

  }



  ExportToExcel() {
    this.service.generateExcel(this.data.id);
  }

  get filterSPPLoader() {
    return FilterSPPLoader;
  }


  get filterMaterialLoader(){
    return FilterMaterialLoader;
  }

  materialTextFormatter = (mtr) => {

    console.log(mtr);
    return `${mtr.Construction}`
  }
  


  @bindable selectedFilterMaterial

  async selectedFilterMaterialChanged(n, o) {

      this.data.displayMaterial = await this.service.getMaterialOutput1(this.selectedFilterMaterial.Construction);
  }

  removeItems() {
    this.bind();
  }
  @bindable ItemsCollection;
  @bindable destinationArea;
  destinationAreaChanged(n, o) {
    if (this.destinationArea) {
      this.data.bonType = this.destinationArea;
      this.detailOptions.bonType = this.data.destinationArea;

      if (this.ItemsCollection) {
        this.ItemsCollection.bind();
      }
    }
  }
  
}
