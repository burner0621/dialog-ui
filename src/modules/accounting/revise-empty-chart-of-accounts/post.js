import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
import moment from 'moment';
import { Router } from "aurelia-router";
import { activationStrategy } from "aurelia-router";

var COALoader = require('../../../loader/coa-loader');

@inject(Service, Router)
export class Post {
  // @bindable title;
  @bindable readOnly;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  };

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };


  constructor(service, router) {
    this.service = service;
    this.router = router;
  }

  coaColumns = ["No", "Name"];

  async bind(context) {
    this.context = context;
    this.error = this.context.error || {};
    this.data = await this.service.getEmpties();

  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  save(event) {
    // console.log(this.data);
    this.service.reviseEmpties(this.data)
    .then(result => {
      this.router.navigateToRoute('post',{}, { replace: true, trigger: true });
      // this.__goToList();
    })
    .catch(error => {
      this.error = error;
    });
    
  }

}

export class KeysValueConverter {
  toView(obj) {
    return Reflect.ownKeys(obj);
  }
}

