import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
var StorageLoader = require('../../../loader/storage-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
  @bindable readOnly = false;
  @bindable data = {};
  @bindable error = {};
  @bindable title;

  controlOptions = {
    label: {
      length: 4
    },
    control: {
      length: 5
    }
  }

  constructor(service, bindingEngine) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    console.log(this.error);
    // if (this.data.storageId) {
    //     this.selectedStorage = await this.service.getStorageById(this.data.storageId, this.storageFields);
    // }
  }

  @computedFrom("data._id")
  get isEdit() {
    return (this.data._id || '').toString() != '';
  }

  types = ["IN", "OUT", "ADJ"];

  itemsColumns = [
    { header: "Barang" },
    { header: "Jumlah" },
    { header: "Satuan" },
    { header: "Keterangan" }
  ]

  // @bindable selectedStorage;
  // selectedStorageChanged(newValue, oldValue) {
  //     if (this.selectedStorage && this.selectedStorage._id) {
  //         this.data.storageId = this.selectedStorage._id;
  //         this.data.storageCode = this.selectedStorage.code;
  //         this.data.storageName = this.selectedStorage.name;
  //     }
  //     else {
  //         this.data.storageId = 0;
  //         this.data.storageCode = "";
  //         this.data.storageName = "";
  //     }

  //     console.log(newValue)
  // }

  // storageView = (storage) => {
  //     return `${storage.unit.name} - ${storage.name}`
  // }

  get storageLoader() {
    return StorageLoader;
  }


  get addItems() {
    return (event) => {
      this.data.Items.push({})
    };
  }
}
