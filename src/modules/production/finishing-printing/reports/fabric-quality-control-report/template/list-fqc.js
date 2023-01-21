import {bindable} from 'aurelia-framework'

export class listFQC {
    detailFQCColumns = ["No", "Nomor PCS", "Panjang PCS (meter)", "Lebar PCS (meter)", "Nilai", "Grade", "Aval (meter)", "Sampel (meter)"];

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.isShowing = false;
    }

    toggle() {
        if (!this.isShowing)
            this.isShowing = true;
        else
            this.isShowing = !this.isShowing;
    }
}