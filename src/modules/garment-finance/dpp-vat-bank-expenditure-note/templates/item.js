export class Item {

    activate(context) {
        this.data = context.data;
        this.readOnly = context.options.readOnly;
        this.isShowing = false;

        if (!this.readOnly) {
            this.collection = {
                columns: ['', 'No. Invoice', 'Tanggal Invoice', 'Nama Barang', 'Kategori', 'Total']
            };
        } else {
            this.collection = {
                columns: ['No. Invoice', 'Tanggal Invoice', 'Nama Barang', 'Kategori', 'Total']
            };
        }
    }

    onCheckInternalNotes(e) {
        for (var item of this.data.InternalNote.Items) {
            item.SelectInvoice = e.target.checked;
        }
    }

    get checkedInvoices() {
        if (this.data.InternalNote.Items) {
            for (var item of this.data.InternalNote.Items) {
                if (item.SelectInvoice)
                    this.data.Select = item.SelectInvoice
            }
        }

        return 0;
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

    get outstanding() {
        var result = 0;

        if (this.data.InternalNote.Items && this.data.InternalNote.Items.length > 0) {
            for (let item of this.data.InternalNote.Items) {
                if (item.SelectInvoice)
                    result += item.Invoice.Amount;
            }
        }

        this.data.OutstandingAmount = this.data.InternalNote.TotalAmount - result;

        return result;
    }

    toggle() {
        this.isShowing = !this.isShowing;
    }
}