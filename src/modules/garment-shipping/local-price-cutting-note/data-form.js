import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

const BuyerLoader = require('../../../loader/garment-leftover-warehouse-buyer-loader');

@inject(Service)
export class DataForm {

    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable title;
    @bindable selectedBuyer;
    @bindable useVat;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    columnsUseVat=[
        "No Nota Penjualan",
        "Amount",
        "Potongan",
        "Include PPN"
    ];

    items = {
        columns: [
            "No Nota Penjualan",
            "Amount",
            "Potongan"
        ],
        onAdd: function () {
            this.data.items.push({});
        }.bind(this),
        options: {
            buyerId: 0,
            useVat : false
        }
    };

    get buyerLoader() {
        return BuyerLoader;
    }

    buyerView = (data) => {
        return `${data.Code || data.code} - ${data.Name || data.name}`;
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;    }

    selectedBuyerChanged(newValue, oldValue) {
        if (newValue) {
            this.data.buyer = newValue;
            this.items.options.buyerId = newValue.Id;

            if (oldValue && newValue.Id != oldValue.Id) {
                this.data.items.splice(0);
            }
        } else {
            this.data.buyer = null;
            this.data.items.splice(0);
        }
    }

    useVatChanged(newValue){
        if(!this.data.id){
            this.data.items.splice(0);
        }
        console.log(newValue)
        this.data.useVat = newValue;
        this.items.options.useVat = newValue;
    }
}
