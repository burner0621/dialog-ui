import { bindable, computedFrom } from 'aurelia-framework'
import { Service } from "../service";
export class Item {

  async activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = this.context.error;		
    this.options = this.context.options;    
  }

  @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

}