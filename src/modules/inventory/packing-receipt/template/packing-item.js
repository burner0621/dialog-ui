import { bindable } from 'aurelia-framework';

export class PackingItem {

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    if (!this.data.Weight) {
      this.data.Weight = 0;
    }
    if (!this.data.Quantity) {
      this.data.Quantity = 0;
    }
    if (!this.data.Length) {
      this.data.Length = 0;
    }
  }

  controlOptions = {
    control: {
      length: 12
    }
  }

  quantityControlOptions = {
    control: {
      length: 1
    }
  }

  quantityChanged(e) {
    console.log(this.data);
    // this.data.quantity = this.data.quantity ? this.data.quantity : 0;
  }

  notesChanged(e) {
    console.log(this.data);
  }

  get weightTotal() {
    return this.data.WeightTotalAmount ? this.data.WeightTotalAmount.toFixed(2) : (this.data.Weight * this.data.Quantity).toFixed(2);
  }

  get lengthTotal() {
    return this.data.LengthTotalAmount ? this.data.LengthTotalAmount.toFixed(2) : (this.data.Length * this.data.Quantity).toFixed(2);
  }

}