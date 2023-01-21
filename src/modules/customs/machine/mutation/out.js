import { inject, bindable, computedFrom } from 'aurelia-framework';
import {
    Router
  } from 'aurelia-router';
  import {
    Service
  } from './service';
const CategoryLoader = require('../../../../loader/machine-category-loader');
const MachineLoader = require('../../../../loader/machine-custom-loader');
const MachineTypeLoader = require('../../../../loader/machine-custom-type-loader');
const BrandLoader = require('../../../../loader/machine-brand-loader');

@inject(Router, Service)
export class Out {
    hasCancel = true;
  hasSave = true;
  hasView = false;
  hasCreate = true;
  hasEdit = false;

  @bindable title;
  @bindable readOnly;
  @bindable category;
  @bindable brand;
  @bindable tipe;
  @bindable serial; 

  constructor(router,service) {
    this.service = service;
    this.router = router;

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

save(event) {
    if(this.data.TransactionAmount > this.data.MachineQuantity)
    {
        alert("Jumlah Barang Keluar tidak Boleh melebihi stock");
    }else
    {
    this.data.TransactionType = "OUT";
    this.service.createOut(this.data)
      .then(result => {
        alert("Data berhasil dibuat");
        this.router.navigateToRoute('out', {}, {
          replace: true,
          trigger: true
        });
      })
      .catch(e => {
        this.error = e;
      })
    }
  }

  cancel(event) {
    this.router.navigateToRoute('list');
  }


  bind(context) {
    this.context = context;
    this.data = {
        items: []
      };
      this.error = {};

    this.cancelCallback = this.context.cancelCallback;
    // this.deleteCallback = this.context.deleteCallback;
    // this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

} 
