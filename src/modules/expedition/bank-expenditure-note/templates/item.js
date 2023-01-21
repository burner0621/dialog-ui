import {bindable} from 'aurelia-framework'
const UnitPaymentOrderLoader = require('../../../../loader/unit-payment-order-loader');

export class Item {

    constructor() {
        this.queryUPO = { position: 1 };

        this.columns = ['Unit', 'Nama Barang', 'Jumlah', 'Satuan', 'Harga Total'];
    }

    activate(context) {
        this.data = context.data
        this.isShowing = false;
        this.data.TotalPaidIDR = 0;
        console.log("expenditure item", this.data)

        if (this.data.IncomeTaxBy && this.data.IncomeTaxBy.toUpperCase() == "SUPPLIER")
            this.data.TotalPaid = this.data.TotalPaid - this.data.IncomeTax;

        if (context.context.options) {
            this.IDR = context.context.options.IDR;
            this.rate = context.context.options.rate;
            this.sameCurrency = context.context.options.SameCurrency;
            if (this.IDR) {
                this.data.TotalPaidIDR = this.data.TotalPaid * this.rate;
                this.data.CurrencyIDR = "IDR";
            }

            let listURNNo = [];
            for (let item of this.data.Items) {
                if (item.URNNo != null)
                    listURNNo.push(item.URNNo);
            }

            this.listURNNo = listURNNo.length != 0 ? listURNNo.join('\n') : listURNNo;
        }

        if (this.data.PaymentDifference) {
          this.SupplierPayment = this.data.SupplierPayment;
          this.data.AmountPaid = this.data.TotalPaid - (this.data.SupplierPayment + this.data.PaymentDifference);
        }
        else {
          this.SupplierPayment = this.data.TotalPaid - this.data.AmountPaid;
          this.data.SupplierPayment = this.SupplierPayment;
        }
        
        console.log(context);
    }

    // activate(context) {
    //     this.data = context.data
    //     this.isShowing = false;
    //     this.data.TotalPaidIDR = 0;
    //     if (context.context.options) {
    //         this.IDR = context.context.options.IDR;
    //         this.rate = context.context.options.rate;
    //         this.sameCurrency = context.context.options.SameCurrency;
    //         if (this.IDR) {
    //             this.data.TotalPaidIDR = this.data.TotalPaid * this.rate;
    //             this.data.CurrencyIDR = "IDR";
    //         }
    //     }

    //     console.log(context);
    // }

    toggle() {
        this.isShowing = !this.isShowing;
    }

    onRemove() {
        this.bind();
    }

    get unitPaymentOrderLoader() {
        return UnitPaymentOrderLoader;
    }

    @bindable SupplierPayment
    SupplierPaymentChanged(newValue) {
      this.data.SupplierPayment = newValue;
      this.data.PaymentDifference = this.data.TotalPaid - (this.data.AmountPaid + newValue);
    }
}
