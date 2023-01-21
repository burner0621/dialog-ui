export class Item {
  activate(context) {
    this.item = context.data;
    this.error = context.error;
    this.options = context.options;
  }
  statusOptions = ["OK", "Not OK"];

  controlOptions = {
    control: {
      length: 12
    }
  };
}