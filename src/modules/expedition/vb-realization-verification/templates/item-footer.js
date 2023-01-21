export class ItemFooter {
  activate(context) {
    this.context = context;
    this.data = this.context.data;

    var diff = this.getValueReqReal;

    this.status = diff < 0 ? "Kurang" : diff > 0 ? "Sisa" : "Sesuai";
  }

  get getStatusReqReal() {
    var res = 0;

    return res;
  }

  get getValueReqReal() {
    var res = 0;

    var qty = this.context.items.map((item) => {
      let incomeTax = 0;
      let vat = 0;
      var amount = item.data.Amount;

      if (item.data.UseIncomeTax && item.data.IncomeTaxBy == "Supplier")
        if (item.data.BLAWBNumber !== null) {
          incomeTax = item.data.PPhAmount;
        } else {
          incomeTax = amount * (item.data.IncomeTaxRate / 100);
        }

      if (item.data.UseVat) {
        if (item.data.BLAWBNumber !== null) {
          vat = item.data.PPnAmount;
        } else {
          vat = amount * (item.data.VatRate/100);
        }
      }



      return amount - incomeTax + vat;
    });
    var sum = qty.reduce((prev, curr, index) => {
      return prev + curr;
    }, 0);

    return parseFloat(this.context.options.vbRequestDocumentAmount.toFixed(2)) - parseFloat(sum.toFixed(2));
  }

  get getIncomeTax() {
    var qty = this.context.items.map((item) => {
      var amount = 0;

      if (item.data.UseIncomeTax && item.data.IncomeTaxBy == "Supplier") {
        if (item.data.BLAWBNumber !== null) {
          amount += item.data.PPhAmount;
        } else {
          amount += item.data.Amount * (item.data.IncomeTaxRate / 100);
        }
      }

      return amount;
    });
    return qty.reduce((prev, curr, index) => {
      return prev + curr;
    }, 0);
  }

  get getAmountVB() {
    // var item = this.context.
    return this.context.options.vbRequestDocumentAmount;
  }

  get getAmountAll() {
    var qty = this.context.items.map((item) => {
      let incomeTax = 0;
      let vat = 0;
      var amount = item.data.Amount;

      if (item.data.UseIncomeTax && item.data.IncomeTaxBy == "Supplier")
        if (item.data.BLAWBNumber !== null) {
          incomeTax = item.data.PPhAmount;
        } else {
          incomeTax = amount * (item.data.IncomeTaxRate / 100);
        }

      if (item.data.UseVat) {
        if (item.data.BLAWBNumber !== null) {
          vat = item.data.PPnAmount;
        } else {
          vat = amount * (item.data.VatRate/100);
        }
      }

      return amount - incomeTax + vat;
    });
    return qty.reduce((prev, curr, index) => {
      return prev + curr;
    }, 0);
  }

  get getAmountVAT() {
    var qty = this.context.items.map((item) => {
      var amount = 0;
      if (item.data.UseVat && item.data.BLAWBNumber !== null) {
        amount += item.data.PPnAmount;
      } else if (item.data.UseVat && item.data.BLAWBNumber == null) {
        amount += item.data.Amount * (item.data.VatRate/100);
      }
      return amount;
    });
    return qty.reduce((prev, curr, index) => {
      return prev + curr;
    }, 0);
  }

  get getAmountTotal() {
    var qty = this.context.items.map((item) => item.data.Amount);
    return qty.reduce((prev, curr, index) => {
      return prev + curr;
    }, 0);
  }
}
