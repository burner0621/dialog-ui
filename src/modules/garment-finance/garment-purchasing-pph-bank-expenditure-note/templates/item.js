import { inject, BindingEngine } from 'aurelia-framework';
import { _ } from 'underscore';

@inject(BindingEngine)
export class Item {
    constructor(bindingEngine) {
        this.bindingEngine = bindingEngine;
        this.columns = ['No. Invoice', 'Tanggal Invoice', 'Nama Barang', 'Kategory', 'Total'];
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

        var groupInvoiceByProductId = this.data.Items.map(item => {return _.groupBy(item.Details, 'ProductId')});
        console.log(groupInvoiceByProductId);
        var dataView = [];
        
        Object.keys(groupInvoiceByProductId).forEach((key)=>{
            Object.keys(groupInvoiceByProductId[key]).forEach((item)=>{
                // var invoice = groupInvoiceByProductId[key][item];
                // invoice.InvoiceNo = groupInvoiceByProductId[key].InvoiceNo
                dataView = dataView.concat( groupInvoiceByProductId[key][item]);
            })
        });
        this.data.dataView = dataView;
        var TotalIncomeTaxNI = 0;
        this.data.Items.forEach((items) =>{
            TotalIncomeTaxNI += items.TotalIncomeTax;
        });
        this.data.TotalIncomeTaxNI = TotalIncomeTaxNI;
        // this.data.TotalIncomeTaxNI = _.sum
        console.log("dataView",this.data.dataView);
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
