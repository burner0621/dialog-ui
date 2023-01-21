import { inject, bindable, computedFrom,BindingEngine } from 'aurelia-framework';
const CategoryLoader = require('../../../../loader/machine-category-loader');
const MachineLoader = require('../../../../loader/machine-custom-loader');
const MachineTypeLoader = require('../../../../loader/machine-custom-type-loader');
const BrandLoader = require('../../../../loader/machine-brand-loader');

@inject(BindingEngine)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable category;
  @bindable brand;
  // @bindable tipe;
  // @bindable serial;
  @bindable Supp;
  @bindable Klass;

  SupItems= ['','LOKAL','IMPORT']
  KlasItems= ['','Machine','Tools']

    

  constructor(service,bindingEngine) {
    this.bindingEngine = bindingEngine;
    this.service = service;

    this.formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
    };

    
  }

  KlassChanged(newvalue)
  {
    if(newvalue)
    {
      if (newvalue === "Machine") {
        this.data.Classification = "Machine";
      }
      else if(newvalue === "Tools")
      {
        this.data.Classification = "Tools";
      }
      else
      {
        this.data.Classification = "-";
      }
    }else{
      this.data.Classification = "-";
    }
  } 

  SuppChanged(newvalue)
  {
    console.log(newvalue);
    if(newvalue)
    {
      if (newvalue === "LOKAL") {
        this.data.SupplierType = "LOKAL";
      }
      else if(newvalue === "IMPORT")
      {
        this.data.SupplierType = "IMPORT";
      }
      else
      {
        this.data.SupplierType = "-";
      }
    }else{
      this.data.SupplierType = "-";
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

  get categoryLoader() {
    return CategoryLoader;
}


get brandLoader() {
  return BrandLoader;
}

categoryView = (cat) => {
  return `${cat.CategoryName}`;
}

brandView=(brand) => {
  return `${brand.BrandName}`;
}

categoryChanged(newValue, oldValue)
{
  console.log(newValue);
  if(newValue)
  {
    this.data.MachineCategory = newValue.CategoryName;
  }
}

brandChanged(newValue, oldValue)
{
  console.log(newValue);
  if(newValue)
  {
    this.data.MachineBrand = newValue.BrandName;
  }
}

// categoryChanged(e) {
//   if (newValue)
//       this.data.MachineCategory = newValue.CategoryName;
// }

// brandChanged(e) {
//   if (this.data.MachineBrand)
//       this.data.MachineBrand = this.data.MachineBrand.BrandName;
// }

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
