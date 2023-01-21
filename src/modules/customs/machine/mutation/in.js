import {
  inject,
  bindable,
  computedFrom
} from 'aurelia-framework';
import {
  Router
} from 'aurelia-router';
import {
  Service
} from './service';
const BrandLoader = require('../../../../loader/machine-brand-loader');
const CategoryLoader = require('../../../../loader/machine-category-loader');

@inject(Router, Service)
export class In {
  hasCancel = true;
  hasSave = true;
  hasView = false;
  hasCreate = true;
  hasEdit = false;

  @bindable title;
  @bindable readOnly;
  @bindable SupItem;
  @bindable KlasItem;
  @bindable category;
  @bindable brand;

  SupItems = ['', 'LOKAL', 'IMPORT']
  KlasItems = ['', 'Machine', 'Tools']

  constructor(router, service) {
    this.service = service;
    this.router = router;

    this.formOptions = {
      cancelText: "Kembali",
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

  brandView = (brand) => {
    return `${brand.BrandName}`;
  }

  SupItemChanged(newvalue) {
    if (newvalue) {
      if (newvalue === "LOKAL") {
        this.data.SupplierType = "LOKAL";
      } else if (newvalue === "IMPORT") {
        this.data.SupplierType = "IMPORT";
      } else {
        this.data.SupplierType = "-";
      }
    } else {
      this.data.SupplierType = "-";
    }
  }

  KlasItemChanged(newvalue) {
    if (newvalue) {
      if (newvalue === "Machine") {
        this.data.Classification = "Machine";
      } else if (newvalue === "Tools") {
        this.data.Classification = "Tools";
      } else {
        this.data.Classification = "-";
      }
    } else {
      this.data.Classification = "-";
    }
  }

  categoryChanged(newValue) {
    if (newValue) {
      this.data.MachineCategory = newValue.CategoryName;
    }
  }

  brandChanged(newValue) {
    if (newValue) {
      this.data.MachineBrand = newValue.BrandName;
    }
  }

  save(event) {
    this.data.TransactionType = "IN";
    this.service.createIN(this.data)
      .then(result => {
        alert("Data berhasil dibuat");
        this.router.navigateToRoute('in', {}, {
          replace: true,
          trigger: true
        });
      })
      .catch(e => {
        this.error = e;
      })
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
