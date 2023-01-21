import { bindable, computedFrom } from "aurelia-framework";
export class ItemHeader {
  activate(context) {
    this.context = context;
    this.data = context.data;
    this.items = context.items;
    this.options = context.options;
    this.isEdit = this.options.isEdit;

    if(this.isEdit){
      this.options.checkedAll = true;
    }
  }

  // changeCheckedAll() {
  //   this.items.forEach((item) => {
  //     item.data.IsSave = this.options.checkedAll === true;
  //   });
  //   this.clickCheckBox();
  // }
}
