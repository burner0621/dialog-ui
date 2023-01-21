import {bindable} from 'aurelia-framework';
import { Config } from "aurelia-api";
import { Container } from 'aurelia-dependency-injection';

export class FPReturToQCDetail {
  @bindable selectedDealUom
  async activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    if(this.data){
      if(this.data.DesignCode && this.data.DesignNumber)
        this.data.DesignName=this.data.DesignCode + ' - '+ this.data.DesignNumber;
      else
        this.data.DesignName = '-';
    }
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}