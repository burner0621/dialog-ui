import { bindable, computedFrom } from 'aurelia-framework'
const GarmentColorLoader = require('../../../../loader/finishing-out-item-color-loader');
export class Item {
  @bindable selectedColor;
  async activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = this.context.error;		
    this.options = this.context.options;    
    this.readOnly = this.options.readOnly || this.data.IsDisabled;
    this.data.Price=(this.data.BasicPrice + (this.data.ComodityPrice * 100/100)) * this.data.Quantity;
    this.filter={ "RONo": this.data.RONo };
    // if(this.data.Id)
    // {
    this.selectedColor= this.data.Color;  
    // }
  }

  @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

  changeCheckBox() {
    this.context.context.options.checkedAll = this.context.context.items.reduce((acc, curr) => acc && curr.data.IsSave, true);
  }

  qtyChanged(e) {
    this.data.Quantity=e.srcElement.value;
    this.data.Price=(this.data.BasicPrice + (this.data.ComodityPrice * 100/100)) * this.data.Quantity;
  }
  get garmentColorLoader() {
    
    return GarmentColorLoader;
  }
  colorView = (color) => {
    return `${color.Color}`;
  }

  async selectedColorChanged(newValue){
    console.log(newValue);
        if(newValue) {
          this.data.Color= newValue.Color;
        }
      }
}