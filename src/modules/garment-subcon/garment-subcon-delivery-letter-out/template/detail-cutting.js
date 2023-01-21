import { computedFrom } from "aurelia-framework";

export class Detail {
    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        
        this.itemOptions=context.context.options;
        this.isShowing = true;
    }

    toggle() {
        if (!this.isShowing)
            this.isShowing = true;
        else
            this.isShowing = !this.isShowing;
    }

     itemsColumns= [
        "Ukuran",
        "Jumlah Potong",
        "Satuan Potong",
        "Keterangan"
    ];

    get Quantity(){
        var qty=0;
        if(this.data.Sizes){
            if(this.data.Sizes.length>0){
                for(var a of this.data.Sizes){
                    qty+=a.Quantity;
                }
            }
        }
        this.data.Quantity=qty;
        return qty;
    }
}