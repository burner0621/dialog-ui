import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
// var BuyerLoader = require('../../../loader/garment-buyers-loader');
// var SectionLoader = require('../../../loader/garment-sections-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable selectedBuyer;
    @bindable selectedSection;
    @bindable beginingOrderQuantity;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    detailColumns = [{ header: "Komoditi" }, {header: "Jumlah"}, {header: "Tanggal Pengiriman"}, {header: "Tanggal Confirm"}, {header: "Keterangan"}];

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        console.log(this.data);

        if(this.data.CanceledQuantity > 0 || this.data.ExpiredBookingQuantity > 0){
            this.beginingOrderQuantity = this.data.OrderQuantity + this.data.ExpiredBookingQuantity + this.data.CanceledQuantity;
        }

        this.selectedSection = { Code:this.data.SectionCode, Name:this.data.SectionName,};
        this.selectedBuyer = { Code:this.data.BuyerCode, Name:this.data.BuyerName,};

        var arg = {
            page:  1,
            size: 1,
        }

        this.data.maxWH= await this.service.searchWHConfirm(arg)
            .then(result => {
                return result.data[0].UnitMaxValue + result.data[0].SKMaxValue;
                
            });
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    get addItems() {
        return (event) => {
            var newDetail=   {
                BookingOrderNo:this.data.BookingOrderNo,
                Comodity: this.data.ComdodityName,
                ConfirmQuantity: 0,
                IsCanceled: false,
                Remark: ''
            };
            this.data.Items.push(newDetail);
        };
    }

    buyerView = (buyer) => {
        return `${buyer.Code} - ${buyer.Name}`
    }

    sectionView = (section) => {
      return `${section.Code} - ${section.Name}`
    }

} 
