import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class ExternalTransferOrderDetailHeader {
  activate(context) {
    this.context = context;
  }
}
