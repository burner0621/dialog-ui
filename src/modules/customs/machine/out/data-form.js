import { inject, bindable, computedFrom } from 'aurelia-framework';
const CategoryLoader = require('../../../../loader/machine-category-loader');
const MachineLoader = require('../../../../loader/machine-custom-loader');
const MachineTypeLoader = require('../../../../loader/machine-custom-type-loader');
const BrandLoader = require('../../../../loader/machine-brand-loader');

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable category;
  @bindable brand;
  @bindable tipe;
  @bindable serial;

    

  constructor(service) {
    this.service = service;

    this.formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
    };

    
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

get tipeLoader() {
  return MachineTypeLoader;
}


get serialLoader() {
  return MachineLoader;
}

categoryView = (cat) => {
  return `${cat.CategoryName}`;
}

brandView=(brand) => {
  return `${brand.BrandName}`;
}

tipeView=(tipe) => {
  return `${tipe.MachineType}`;
}

serialView=(ser) => {
  return `${ser.IDNumber}`;
}



categoryChanged(newValue)
{
  if(newValue)
  {
    this.data.Category = newValue.CategoryName;
  }
}

brandChanged(newValue)
{
  if(newValue)
  {
    this.data.Brand = newValue.BrandName;
  }
}

tipeChanged(newValue)
{
  if(newValue)
  {
    this.data.Tipe = newValue.MachineType;
  }
}

serialChanged(newValue)
{
  if(newValue)
  {
    this.data.Serial = newValue.IDNumber;
    this.data.MachineQuantity = newValue.MachineQuantity;
    this.data.UnitQuantity = newValue.UnitQuantity;
    this.data.MachineID = newValue.MachineID;
  }
}

get Filter()
{
  if (this.data.Category && this.data.Brand) {
    return{
      MachineCategory:this.data.Category,
      MachineBrand:this.data.Brand,
  }
  }
};

get FilterSerial()
{
  if (this.data.Category && this.data.Brand) {
    return{
      MachineCategory:this.data.Category,
      MachineBrand:this.data.Brand,
      MachineType: this.data.Tipe
  }
  }
};


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
