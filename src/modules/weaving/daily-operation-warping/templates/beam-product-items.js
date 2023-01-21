import {
  inject,
  bindable,
  BindingEngine
} from "aurelia-framework";
import {
  Dialog
} from '../../../../components/dialog/dialog';
import {
  Service
} from "../service";
import {
  BrokenCausesForm
} from '../dialogs/broken-causes-form';
import moment from 'moment';

@inject(Dialog, BindingEngine, Service)
export class BeamProductItems {

  constructor(dialog, bindingEngine, service) {
    this.dialog = dialog;
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  brokenThreadsOptions = {
    value: {
      length: 1
    }
  };

  async activate(context) {
    this.data = context.data;
    this.error = context.error;
    if (this.data.Id) {
      if (this.data.LatestDateTimeBeamProduct) {
        var DateBeamProduct = moment(this.data.LatestDateTimeBeamProduct).format('DD/MM/YYYY');
        var TimeBeamProduct = moment(this.data.LatestDateTimeBeamProduct).format('LT');

        this.data.LatestDateBeamProduct = DateBeamProduct;
        this.data.LatestTimeBeamProduct = TimeBeamProduct;
      }

      if (this.data.BrokenCauses) {
        this.BrokenCauses = this.data.BrokenCauses;
      }
    }

    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
  }

  brokenCausesToggle() {
    this.dialog.show(BrokenCausesForm, this.BrokenCauses)
      .then(response => {
        return response;
      });
  }
}
