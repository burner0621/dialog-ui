import { inject, bindable } from 'aurelia-framework'
import { Service } from "./service";

var ShippingInvoiceLoader = require('../../../loader/garment-shipping-invoice-loader');
var ForwarderLoader = require('../../../loader/garment-forwarders-loader');
var EMKLLoader= require('../../../loader/garment-emkl-loader');

@inject(Service)
export class DataForm {

    constructor(service) {
        this.service = service;
    }

    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable title;
    @bindable selectedEMKL;
    @bindable selectedShippingInvoice;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 6
        }
    };

    filter= {      
        "PEBNo!=null":true
    }
    
    freightOptions = [
        "COLLECT",
        "PREPAID"
    ];

    get emklLoader(){
        return EMKLLoader;
    }

    emklView = (data) => {
        return `${data.Name || data.name}`;
    }

    get shippingInvoiceLoader() {
        return ShippingInvoiceLoader;
    }

    get forwarderLoader() {
        return ForwarderLoader;
    }

    orderView = (data) => {
        return `${data.Code || data.code} - ${data.Name || data.name}`
    }

    forwarderView = (data) => {
        return `${data.Code || data.code} - ${data.Name || data.name}`
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        if(this.data.shippingStaff)
            this.selectedShippingInvoice={
                invoiceNo:this.data.invoiceNo,
                shippingStaff: this.data.shippingStaff.name,
                shippingStaffId: this.data.shippingStaff.id
            }
        this.selectedEMKL=this.data.emkl;
    }

    async selectedShippingInvoiceChanged(newValue, oldValue) {
        var forwarderName = "";
        if (newValue) {
            this.data.packingListId = newValue.packingListId;
            this.data.invoiceId = newValue.id;
            this.data.invoiceNo = newValue.invoiceNo;
            this.data.shippingStaff = {
                id: newValue.shippingStaffId,
                name: newValue.shippingStaff
            };

            if (this.data.packingListId) {
                this.service.getPackingListById(this.data.packingListId)
                    .then(packingList => {
                        this.data.order = packingList.buyerAgent;
                        this.data.exportEstimationDate = packingList.exportEstimationDate;
                    });
            }
            if(!this.data.id){
                var si= await this.service.searchShippingInstruction({ filter: JSON.stringify({ InvoiceNo: this.data.invoiceNo})});
                console.log(si)
                if(si.data.length>0){
                    this.data.forwarder= si.data[0].forwarder;
                }
                else{
                    this.data.forwarder=null;
                }
            }
            
        } else {
            this.data.packingListId = 0;
            this.data.invoiceId = 0;
            this.data.invoiceNo = null;
            this.data.shippingStaff = null;
            this.data.order = null;
            this.data.forwarder=null;
            this.data.exportEstimationDate = null;
 
        }
    }

    selectedEMKLChanged(newValue){
        this.data.emkl=null;
        if(newValue){
            this.data.emkl={
                id:newValue.Id || newValue.id,
                name:newValue.Name || newValue.name,
                //address: newValue.Address || newValue.address,
                //attn: newValue.Attention || newValue.attn,
                //phone: newValue.PhoneNumber || newValue.phone,
                code:newValue.Code || newValue.code,
            };
        }
    }

}
