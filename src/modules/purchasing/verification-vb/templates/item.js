import { bindable, computedFrom } from 'aurelia-framework';

export class Item {
    constructor() {
    }

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;

        // console.log(this.data)
    }

    @computedFrom("data.isGetPPn || data.Amount")
    get Total(){
        if(this.data.isGetPPn == true){
            var temp = this.data.Amount * 0.1;
            return this.data.Amount + temp;
        }
        else{
            return this.data.Amount;
        }
        // return this.data.Amount;
    }

    // get Remark(){
    //     return $`data.NoSPB (data.SupplierName)`;
    // }
}