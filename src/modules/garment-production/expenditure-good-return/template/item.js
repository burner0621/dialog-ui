import { bindable, computedFrom } from 'aurelia-framework';

const serviceUriFinOut = 'finishing-outs';
export class Item {

  async activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = this.context.error;		
    this.options = this.context.context.options; 
  }

  @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    changeCheckBox() {
      this.context.context.options.checkedAll = this.context.context.items.reduce((acc, curr) => acc && curr.data.IsSave, true);
    }
}