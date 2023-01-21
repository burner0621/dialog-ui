import { inject, bindable, computedFrom } from 'aurelia-framework';
const BrandLoader = require('../../../../loader/machine-brand-loader');
const CategoryLoader = require('../../../../loader/machine-category-loader');

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable SupItem;
  @bindable KlasItem;
  @bindable category;
  @bindable brand;
    
  SupItems= ['','LOKAL','IMPORT']
  KlasItems= ['','Machine','Tools']

  constructor(service) {
    this.service = service;

    this.formOptions = {
        // cancelText: "Kembali",
        saveText: "Simpan",
    };

    
  }

  controlOptions = {
    label: {
        align: "left",
        length: 4
    },
    control: {
        length: 5,
        align: "right"
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

  SupItemChanged(newvalue)
  {
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

  KlasItemChanged(newvalue)
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
    }else
    {
    this.data.Classification = "-";
    }
  } 

  categoryChanged(newValue)
{
  if(newValue)
  {
    this.data.MachineCategory = newValue.CategoryName;
  }
}

brandChanged(newValue)
{
  if(newValue)
  {
    this.data.MachineBrand = newValue.BrandName;
  }
}

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    // this.cancelCallback = this.context.cancelCallback;
    // this.deleteCallback = this.context.deleteCallback;
    // this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

} 
