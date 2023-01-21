import { inject, bindable } from 'aurelia-framework'
import { Service, CoreService } from "./service";

var SalesNoteLoader = require('../../../loader/garment-shipping-local-sales-note-loader');
var ShippingStaffLoader = require('../../../loader/garment-shipping-staff-loader');

@inject(Service, CoreService)
export class DataForm {

    constructor(service, CoreService) {
        this.service = service;
        this.coreService = CoreService;
    }

    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable title;

    @bindable selectedSalesNote;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    filter={
        IsApproveFinance:true
    }

    get salesNoteLoader() {
        return SalesNoteLoader;
    }

    get shippingStaffLoader() {
        return ShippingStaffLoader;
    }

    buyerView = (data) => {
        return `${data.code} - ${data.name}`
    }

    shippingStaffView = (data) => {
        return `${data.Name || data.name}`
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
    }

    selectedSalesNoteChanged(newValue) {
        if (newValue) {
            this.data.localSalesNoteId = newValue.id;
            this.data.noteNo = newValue.noteNo;

            this.data.buyer = newValue.buyer || {};
            if (this.data.buyer.id) {
                this.coreService.getBuyerById(this.data.buyer.id)
                    .then(buyerResult => {
                        this.data.buyer.address = buyerResult.Address;
                    });
            }
        } else {
            this.data.salesNoteId = 0;
            this.data.noteNo = null;
            this.data.buyer = null;
        }
    }

}
