export class ItemView {

    constructor() {
        this.columns = ['Unit', 'Nama Barang', 'Jumlah', 'Satuan', 'Harga Total'];
    }

    activate(context) {
        this.data = context.data
        this.isShowing = false;
        // if(context.context.options){
        //     this.IDR= context.context.options.IDR;
        //     this.rate= context.context.options.rate;
        //     this.sameCurrency= context.context.options.SameCurrency;
        //     if(this.IDR){
        //         this.data.payToSupplierIDR=this.data.payToSupplier * this.rate;
        //         this.data.currencyIDR="IDR";
        //     }
        // }
        // this.data.DiffTotalPaidPayment = this.data.TotalPaid-(this.data.TotalPaidPayment+this.data.TotalPaidPaymentBefore)
        // this.data.DiffTotalPaidPayment = parseInt(this.data.TotalPaid,10) - (parseInt(this.data.TotalPaidPayment,10)+parseInt(this.data.TotalPaidPaymentBefore,10));
    }

    toggle() {
        this.isShowing = !this.isShowing;
    }

    onRemove() {
      this.bind();
    }

    TotalPaidPaymentChanged(e){
      this.data.DiffTotalPaidPayment = parseFloat(this.data.TotalPaid.toFixed(4))-(parseFloat(e.srcElement.value)+parseFloat(this.data.TotalPaidPaymentBefore.toFixed(4)))
    }
}
