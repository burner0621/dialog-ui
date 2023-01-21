import {inject, bindable, computedFrom } from "aurelia-framework";
import {DataForm} from '../data-form';

@inject(DataForm)
export class ItemHeader {
  @bindable readOnly;
  constructor(dataForm){
    this.dataForm = dataForm;
  }
  activate(context) {
    this.context = context;
    this.data = context.data;
    this.items = context.items;
    this.options = context.options;
    this.readOnly = this.dataForm.readOnly;
  }

  changeCheckedAll() {
    this.items.forEach((item) => {
      item.data.IsSave = this.options.checkedAll === true;
    });
 
  }
}
