import {bindable} from 'aurelia-framework'
export class Item {

    constructor() {
        
        this.columns = ['Unit', 'Nama Barang', 'Jumlah', 'Satuan', 'Harga Total'];
    }

    activate(context) {
        this.data = context.data
        this.isShowing = false;
        this.data.Details= this.data.items;
        console.log(context.context.options)
        if(context.context.options){
            this.IDR= context.context.options.IDR;
            this.rate= context.context.options.rate;
            this.sameCurrency= context.context.options.SameCurrency;
            if(this.IDR){
                this.data.payToSupplierIDR=this.data.payToSupplier * this.rate;
                this.data.currencyIDR="IDR";
            }
        }

        this.SupplierPayment = this.data.payToSupplier - this.data.AmountPaid;
        this.data.SupplierPayment = this.SupplierPayment;
        
    }

    toggle() {
        this.isShowing = !this.isShowing;
    }

    onRemove() {
        this.bind();
    }

    @bindable SupplierPayment
    SupplierPaymentChanged(newValue) {
      this.data.SupplierPayment = newValue;
      this.data.PaymentDifference = this.data.payToSupplier - (this.data.AmountPaid + newValue);
    }

}
