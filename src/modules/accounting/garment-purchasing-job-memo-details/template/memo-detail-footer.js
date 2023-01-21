export class ItemFooter {
  activate(context) {
    this.context = context;
  }

  get getTotal() {
    var total = 0
    if (this.context.items) {
      this.context.items.map(item => {
        total = (item.data.MemoAmount || 0 * item.data.PurchasingRate || 0) + total;
      });
    }
    return total;
  }
}
  