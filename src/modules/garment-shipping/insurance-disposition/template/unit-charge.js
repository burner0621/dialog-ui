export class GarmentShippingInvoiceUnits {

  controlOptions = {
    control: {
      length: 12
    }
  };

  constructor(dialog, service, serviceCore) {
    this.dialog = dialog;
    this.service = service;

  }

  activate(context) {
    this.context = context;
    this.saveAll = false;
    this.data = context.data;
    this.error = context.error;
    this.options = this.context.context.options;
    this.readOnly = this.options.isView;
    this.items = this.context.context.options.itemData;
  }

  get amount() {
    var amount = 0;
    if (this.items) {
      for (var item of this.items) {
        if (this.data.unitCode == "C2A" && item.amount2A > 0) {
          amount += item.amount2A;
        }
        if (this.data.unitCode == "C2B" && item.amount2B > 0) {
          amount += item.amount2B;
        }
        if (this.data.unitCode == "C2C" && item.amount2C > 0) {
          amount += item.amount2C;
        }
        if (this.data.unitCode == "C1A" && item.amount1A > 0) {
          amount += item.amount1A;
        }
        if (this.data.unitCode == "C1B" && item.amount1B > 0) {
          amount += item.amount1B;
        }
      }
    }
    this.data.amount = amount;
    return amount;
  }

}