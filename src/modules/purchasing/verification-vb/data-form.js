import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
import moment from 'moment';

const VbLoader = require('../../../loader/vb-realization-to-verified-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable numberVB;


    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    numericOptions = {
        label: {
            length: 4
        },
        control: {
            length: 2
        }
    }

    detailOptions = {};

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (this.data.numberVB && this.data.numberVB.VBNo) {
            this.numberVB = this.data.numberVB;
            this.DetailItems = this.data.numberVB.DetailItems;
            this.data.items = this.data.numberVB.DetailItems;

            this.detailOptions.Status_ReqReal = this.data.numberVB.Status_ReqReal;
            this.detailOptions.Amount_Request = this.data.numberVB.Amount_Request;
            this.detailOptions.Amount_Vat = this.data.numberVB.Amount_Vat;
            this.detailOptions.AmountIncludeTax = this.data.numberVB.Amount_Realization;
            this.detailOptions.Difference = this.data.numberVB.Diff;
            
        } else {
            this.numberVB = null;
            this.DetailItems = null;
        }

    }

    async numberVBChanged(newValue) {
        if (newValue) {
            this.data.numberVB = newValue;
            var dataItems = [];

            if (this.data.numberVB) {
                this.detailOptions.Status_ReqReal = this.data.numberVB.Status_ReqReal;
                this.detailOptions.Amount_Request = this.data.numberVB.Amount_Request;
                this.detailOptions.Amount_Vat = this.data.numberVB.Amount_Vat;
                this.detailOptions.AmountIncludeTax = this.data.numberVB.Amount_Realization;
                this.detailOptions.Difference = this.data.numberVB.Diff;

                for (var dataItem of this.data.numberVB.DetailItems) {
                    var item = {};
                    item.DateSPB = dataItem.DateSPB;
                    item.NoSPB = dataItem.NoSPB;
                    item.SupplierName = dataItem.SupplierName;
                    item.PriceTotalSPB = dataItem.PriceTotalSPB;

                    item.Date = dataItem.Date;
                    item.Remark = dataItem.Remark;
                    item.Amount = dataItem.Amount;
                    item.isGetPPn = dataItem.isGetPPn;
                    if (dataItem.isGetPPn == true) {
                        var cnt = dataItem.Amount * 0.1;
                        item.Total = dataItem.Amount + cnt;
                    }
                    else {

                        item.Total = dataItem.Amount;
                    }

                    dataItems.push(item);
                }

                this.data.items = dataItems;
            }
            else {
                this.data.numberVB = [];
                this.items = null;
                this.dataItems = [];
                this.dataItem = {};
                this.item = {};
            }
        }
    }

    context = ["Rincian Purchase Request"];

    columns = [
        { value: "Date", header: "Tanggal" },
        { value: "Remark", header: "Keterangan" },
        { value: "Amount", header: "Harga" },
        { value: "isGetPPn", header: "Kena Ppn" },
        { value: "Total", header: "Total" }
    ]

    get vbLoader() {

        return VbLoader;
    }

}
