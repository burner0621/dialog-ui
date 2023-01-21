export class PurchaseOrderItemHeader {

  activate(context) {
    this.context = context;
  }

  get totalDelivered() {
    if (this.context.items) {
      if (this.context.items.length > 0) {
        var qty = this.context.items
          .map((item) => parseInt(item.data.dealQuantity));
        return qty
          .reduce((prev, curr, index) => { return prev + curr }, 0);
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}