import { inject, bindable } from "aurelia-framework";
import { ServiceMemo } from "../service";

@inject(ServiceMemo)
export class SalesReceipt {
  @bindable Nominal;

  constructor(ServiceMemo) {
    this.ServiceMemo = ServiceMemo;
  }

  async bind(context) {
    this.context = context;

    if (this.data.TotalPayment > 0) {

      this.Memo = await this.ServiceMemo.getBySalesInvoice(this.data.SalesInvoice.SalesInvoiceNo);
      var mem = await this.ServiceMemo.getBySalesInvoice(this.data.SalesInvoice.SalesInvoiceNo);

      if (this.Memo) {
        this.data.MemoNo = this.Memo.DocumentNo;

        for (var res of mem.Items) {
          var sum = 0;
          sum = sum + res.PaymentAmount;
          this.data.AmountMemo = sum;
        }

        var NotPaid = this.data.TotalPayment - (this.data.TotalPaid + this.data.AmountMemo);
        if (NotPaid < 0) {
          this.getNotPaid = 0;
        } else {
          this.getNotPaid = NotPaid;
        }

        this.getPaid = this.TotalPaid + this.Nominal + this.data.AmountMemo;
        console.log(this.data.AmountMemo)
        if (this.getPaid >= this.getNotPaid) {
          this.data.IsPaidOff = true;
        } else {
          this.data.IsPaidOff = false;
        }

      } else {

        this.data.MemoNo = null;
        this.data.AmountMemo = 0;
      }

    }
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.option = context.options;
    this.readOnly = context.options.readOnly;
    this.options = context.context.options;
    this.SalesReceiptDate = context.context.options.SalesReceiptDate;

    //Menampilkan auto getUnpaid
    this.Nominal = this.data.Nominal;
    this.TotalPayment = this.data.TotalPayment;
    this.TotalPaid = this.data.TotalPaid;
    this.AmountMemo = this.data.AmountMemo;
    this.getPaid = this.TotalPaid + this.Nominal + this.data.AmountMemo;
    this.getUnpaid = this.TotalPayment - (this.TotalPaid + this.Nominal + this.data.AmountMemo);
    if (this.getUnpaid < 0) {
      this.data.Paid = this.getPaid;
      this.data.Unpaid = 0;
      this.data.OverPaid = Math.abs(this.getUnpaid);
      this.data.IsPaidOff = true;
    } else if (this.getUnpaid == 0) {
      this.data.Paid = this.getPaid;
      this.data.Unpaid = 0;
      this.data.OverPaid = 0;
      this.data.IsPaidOff = true;
    } else {
      this.data.Paid = this.getPaid;
      this.data.Unpaid = Math.abs(this.getUnpaid);
      this.data.OverPaid = 0;
      this.data.IsPaidOff = false;
    }

    var dueTime = new Date(this.data.DueDate).getTime();
    var salesReceiptTime = new Date(
      context.context.options.SalesReceiptDate
    ).getTime();

    if (dueTime && salesReceiptTime) {
      this.getTempo = (dueTime - salesReceiptTime) / (1000 * 60 * 60 * 24);
      this.data.Tempo = this.getTempo;
    }

    if (this.data.SalesInvoice) {
      this.data.Currency = this.data.SalesInvoice.Currency;
    }
  }

  NominalChanged(newValue, oldValue) {
    this.getPaid = this.data.TotalPaid + this.Nominal;
    this.getUnpaid =
      this.data.TotalPayment - (this.data.TotalPaid + this.Nominal);
    if (this.getUnpaid < 0) {
      this.data.Paid = this.getPaid;
      this.data.Unpaid = 0;
      this.data.OverPaid = Math.abs(this.getUnpaid);
      this.data.IsPaidOff = true;
    } else if (this.getUnpaid == 0) {
      this.data.Paid = this.getPaid;
      this.data.Unpaid = 0;
      this.data.OverPaid = 0;
      this.data.IsPaidOff = true;
    } else {
      this.data.Paid = this.getPaid;
      this.data.Unpaid = Math.abs(this.getUnpaid);
      this.data.OverPaid = 0;
      this.data.IsPaidOff = false;
    }
    this.data.Nominal = this.Nominal;
    this.data.PreviousPayment = this.TotalPaid;
  }
}
