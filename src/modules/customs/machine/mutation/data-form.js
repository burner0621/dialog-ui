import { inject, bindable, computedFrom,BindingEngine } from 'aurelia-framework';
const CategoryLoader = require('../../../../loader/machine-category-loader');
const MachineLoader = require('../../../../loader/machine-custom-loader');
const MachineTypeLoader = require('../../../../loader/machine-custom-type-loader');
const BrandLoader = require('../../../../loader/machine-brand-loader');

@inject(BindingEngine)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable tipe;

  tipeitems= ['','IN','OUT'] 

  constructor(service,bindingEngine) {
    this.bindingEngine = bindingEngine;
    this.service = service;

    this.formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
    };
  }

  tipeChanged(newvalue)
  {
    if(newvalue)
    {
      if (newvalue === "IN") {
        this.data.TransactionType = "IN";
      }
      else if(newvalue === "OUT")
      {
        this.data.TransactionType = "OUT";
      }
      else
      {
        this.data.TransactionType = "";
      }
    }
    else{
    this.data.TransactionType = "";
    }
  } 

  controlOptions = {
    label: {
        align: "right",
        length: 4
    },
    control: {
        length: 5,

    }
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    // this.deleteCallback = this.context.deleteCallback;
    // this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

} 
