export class Item {
  constructor() {}

  activate(context) {
    this.data = context.data;
    this.isObject = typeof context.data === "object" ? true : false;
    this.totdiff = context.data.LayoutOrder === 0;

    if (context.context.options) {
      this.readOnly = context.context.options.readOnly;
    }
  }
}
