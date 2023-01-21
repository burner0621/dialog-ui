import { inject, bindable, computedFrom } from 'aurelia-framework'
export class CartItem {
    @bindable product;
    isAval = false;
    remarks = [];
    avalItems = [];
    activate(context) {

        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        this.data.grade = "Aval 2"

    }
    avalTypes = ["Aval Printex", "Aval Batik Motif Kecil", "Aval Batik Motif Besar", "Aval Printing (10-49 cm)",
        "Aval Kain Kotor", "Aval Tali Kotor", "Aval Sambungan", "Aval Kain Head Cut", "Aval Solid",
        "Aval A (Lap Besar)", "Aval B (Lap Kecil)", "Aval Solid TR", "Aval Batik TW (karantina)"];

    controlOptions = {
        control: {
            length: 12
        }
    };


}