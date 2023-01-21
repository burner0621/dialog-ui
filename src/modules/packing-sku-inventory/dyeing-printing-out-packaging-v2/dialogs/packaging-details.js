import { inject, bindable, computedFrom } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { Service } from '../service';

@inject(DialogController, Service)
// @useView("modules/packing-sku-inventory/dyeing-printing-out-packaging-v2/dialogs/packing-details.html")
export class PackagingDetailsForm {
    tableOptions = {
        pagination: false,
        search: false,
        showColumns: false,
        showToggle: false
    }

    columns = [
        "Kode",
        "Jenis",
        "Packaging",
        "QTY",
        "Panjang"
    ]
    async activate(context){
        this.context = context;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;

        // this.data.area = "PACKING";

        this.error = this.context.error;
        this.detailShow = true;
        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;


    }

    constructor(dialogController, service) {
        this.dialogController = dialogController;
        this.service = service;
    }

    addItemCallbackPackaging(){
            this.data.packagingProductionOrdersDetails = this.data.packagingProductionOrdersDetails || [];
            this.data.packagingProductionOrdersDetails.push(
            {
                // packagingCode:"",
                // packagingType:"",
                // packagingQTY:0,
                // packagingUnit:""
            }
        );
        
        
    }
}