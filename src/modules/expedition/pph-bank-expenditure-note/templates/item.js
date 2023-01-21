import { inject, BindingEngine } from 'aurelia-framework';

@inject(BindingEngine)
export class Item {
    constructor(bindingEngine) {
        this.bindingEngine = bindingEngine;
        this.columns = ['Unit', 'Nama Barang', 'Jumlah', 'Satuan', 'Harga'];
    }

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;
        this.isShowing = false;

        this.bindingEngine
            .propertyObserver(this.data, "Check")
            .subscribe(() => { this.checkChanged() });
    }

    checkChanged() {
        this.options.calculateTotalPPHCallback();
    }

    toggle() {
        this.isShowing = !this.isShowing;
    }

    onRemove() {
        this.bind();
    }
}
