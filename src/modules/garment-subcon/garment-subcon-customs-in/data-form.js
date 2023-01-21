import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service } from "./service";

var moment = require("moment");
const SubconContractLoader = require("../../../loader/garment-subcon-contract-loader");

@inject(Service)
export class DataForm {
  @bindable readOnly = false;
  @bindable isCreate = false;
  @bindable isView = false;
  @bindable isEdit = false;
  @bindable title;
  @bindable data = {};
  @bindable itemOptions = {};
  @bindable selectedSubconType;
  @bindable selectedSubconContract;
  @bindable selectedSupplier;
  @bindable selectedSubconCategory;
  @bindable dataSC = {};

  constructor(service) {
    this.service = service;
  }

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  };
  bcTypes = ["2.6.2", "2.7 - In"];
  subconTypes = ["SUBCON GARMENT", "SUBCON BAHAN BAKU", "SUBCON JASA"];
  subconCategoryGarment = ["SUBCON CUTTING SEWING", "SEWING"];
  subconCategoryBB = ["SUBCON BB SHRINKAGE/PANEL", "SUBCON BB FABRIC WASH/PRINT"];
  subconCategoryService = ["SUBCON JASA GARMENT WASH", "SUBCON JASA KOMPONEN"];

  controlOptions = {
    label: {
      length: 2,
    },
    control: {
      length: 5,
    },
  };

  itemsInfo = {
    columns: ["No SJ Masuk", "Jumlah", ""],
  };

  @computedFrom("data.SubconCategory")
  get contractFilter() {
    var current = new Date();
    var expired = moment(current).format("YYYY-MM-DD");
    var filter = {
      SubconCategory: this.data.SubconCategory,
    };
    filter[`DueDate >= ${JSON.stringify(expired)} `] = true;
    return filter;
  }

  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.itemOptions = {
      isCreate: this.context.isCreate,
      isView: this.context.isView,
      checkedAll: this.context.isCreate == true ? false : true,
      isEdit: this.isEdit,
      SCId: this.data.SubconContractId
    };

    if (this.data && this.data.Id) {
      this.selectedSubconType = this.data.SubconType;
      var dataSubconContract = await this.service.getSubconContractByID(this.data.SubconContractId);
      this.selectedSubconContract = dataSubconContract;
      this.selectedSubconCategory = this.data.SubconCategory;
    }
    // this.data.BuyerStaff = this.data.BuyerStaff;
  }

  get subconContractLoader() {
    return SubconContractLoader;
  }

  selectedSubconTypeChanged(newValue, oldValue) {
    if (newValue != this.data.SubconType) {
      this.data.SubconType = newValue;
      //this.selectedSubconContract = null;
      this.selectedSupplier = null;
      this.dataSC = null;
      //this.data.SubconContractNo = null;
    }
  }

  async selectedSubconContractChanged(newValue) {
    if(this.data.Items && !this.data.Id){
      this.data.Items.splice(0);
    }
    if (newValue) {
      this.data.Supplier = newValue.Supplier;
      this.data.SubconContractId = newValue.Id;
      this.data.SubconContractNo = newValue.ContractNo;
      this.selectedSubconCategory = newValue.SubconCategory;
      this.selectedSubconType = newValue.ContractType;
      this.itemOptions.SCId=this.data.SubconContractId;
      this.selectedSupplier =
        newValue.Supplier.Code + " - " + newValue.Supplier.Name;
      //newValue.Quantity = newValue.Quantity;
      const dataCustomsIn = await this.service.searchComplete({ filter: JSON.stringify({ SubconContractId: newValue.Id }) });
      const dataJumlahCustomsIn = dataCustomsIn.data.map(x => {
        return x.Items.reduce((acc, cur) => acc += cur.Quantity, 0);
      });
      const dataJumlah = dataJumlahCustomsIn.reduce((acc, cur) => acc += cur, 0);
      newValue.Quantity -= dataJumlah;
      this.data.RemainingQuantity = newValue.Quantity;
      this.dataSC = newValue;
      if (newValue.Id != this.data.SubconContractId) {
        this.data.Items.splice(0);
      }
      this.data.BuyerStaff = newValue.CreatedBy;
      console.log(this.data.BuyerStaff);
      console.log(newValue);
    }
  }

  get addItems() {
    return (event) => {
      if (this.data.Supplier != null) {
        this.data.Items.push({
          Supplier: this.data.Supplier,
          SCId:this.data.SubconContractId
        });
      } else {
        alert("Supplier harus di isi");
      }
    };
  }

  get removeItems() {
    return (event) => {
      this.error = null;
    };
  }

  get totalQuantity() {
    this.data.TotalQty = this.data.Items.reduce((acc, cur) => (acc += cur.Quantity), 0);
    return this.data.TotalQty;
  }

  selectedSubconCategoryChanged(newValue) {
    if (newValue != this.data.SubconCategory) {
      this.data.SubconCategory = newValue;
      //this.selectedSubconContract = null;
      this.selectedSupplier = null;
      this.dataSC = null;
      //this.data.SubconContractNo = null;
    } else {
      this.data.SubconCategory = null;
    }
  }
}
