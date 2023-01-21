export class GarmentReceiptCorrectionItemHeader {

    activate(context) {
      this.context = context;
      this.data = context.data;
      this.items = context.items;
      this.options = context.options;
      this.readOnly = this.options.readOnly;
    }
  
    changeCheckedAll() {
        this.items
            .forEach(item => {
                item.data.IsSave = item.data.isDO ? false : (this.options.checkedAll === true);
            });
    }
  }