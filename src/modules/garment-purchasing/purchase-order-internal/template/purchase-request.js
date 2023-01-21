export class PurchaseOrderItem {
  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
  }
  get unit() {
    return `${this.data.division} - ${this.data.unit}`;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}