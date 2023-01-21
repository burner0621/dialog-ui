export class ItemFooter {
  activate(context) {
    this.context = context;
    this.data = this.context.data;
  }

  get getValueReqReal() {

    var res = this.context.options.Difference;

    return res;
  }

  get getStatusReqReal() {

    var res = this.context.options.Status_ReqReal;

    return res;
  }

  get getAmountVB() {
    var res = this.context.options.Amount_Request;

    return res;
  }

  get getAmountAll() {
    var res = this.context.options.AmountIncludeTax;

    return res;
  }

  get getAmountVAT() {
    var res = this.context.options.Amount_Vat;

    return res;
  }

  get getAmountTotal() {
    var res = this.context.options.AmountIncludeTax - this.context.options.Amount_Vat;

    return res;
  }
}
