import { bindable, computedFrom } from 'aurelia-framework'
import { Service } from "../service";
export class UnitExpenditureNoteItem {

  async activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = this.context.error;		
    this.options = this.context.options;    
    this.readOnly = this.options.readOnly || this.data.IsDisabled;
    this.isExternal= this.context.context.options.isExternal;
    this.ExpenditureType = this.context.context.options.ExpenditureType;
  }

  itemStatusOptions = ['REJECT', 'NON REJECT'];

  @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

  changeCheckBox() {
    this.context.context.options.checkedAll = this.context.context.items.reduce((acc, curr) => acc && curr.data.IsSave, true);
  }
}