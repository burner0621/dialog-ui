import {bindable} from 'aurelia-framework'
export class ItemView {

    constructor() {
        this.columns = ['Unit', 'Nama Barang', 'Jumlah', 'Satuan', 'Harga Total'];
    }

    activate(context) {
        this.data = context.data
        this.isShowing = false;
        if(context.context.options){
            this.IDR= context.context.options.IDR;
            this.rate= context.context.options.rate;
            this.sameCurrency= context.context.options.SameCurrency;
            if(this.IDR){
                this.data.payToSupplierIDR=this.data.payToSupplier * this.rate;
                this.data.currencyIDR="IDR";
            }
        }

        this.SupplierPayment = this.data.SupplierPayment;
        this.data.AmountPaid = this.data.payToSupplier - (this.data.SupplierPayment + this.data.PaymentDifference);
    }

    toggle() {
        this.isShowing = !this.isShowing;
    }

    @bindable SupplierPayment
    SupplierPaymentChanged(newValue) {
      this.data.SupplierPayment = newValue;
      this.data.PaymentDifference = this.data.payToSupplier - (this.data.AmountPaid + newValue);
    }
}
