import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service,CoreService } from "./service";

var EMKLLoader= require('../../../loader/garment-emkl-loader');
var InvoiceLoader= require('../../../loader/garment-shipping-invoice-loader');
var ForwarderLoader = require('../../../loader/garment-forwarders-loader');

@inject(Service,CoreService)
export class DataForm {

    constructor(service,coreService) {
        this.service = service;
        this.coreService=coreService;
    }
    @bindable readOnly = false;
    @bindable title;
    @bindable selectedForwarder;
    @bindable selectedInvoice;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };
  
    filter= {
        IsUsed:false
    }
    
    get forwarderLoader() {
        return ForwarderLoader;
    }

    forwarderView = (data) => {
        return `${data.Code || data.code} - ${data.Name || data.name}`
    }
    get invoiceLoader(){
        return InvoiceLoader;
    }

    invoiceView = (data) => {
        return `${data.invoiceNo}`;
    }
    
    
    ShipOptions=["BY SEA", "BY AIR", "BY SEA - AIR"];
    bind(context) {
        this.context = context;
        console.log(context.data);
        this.data = context.data;
        this.error = context.error;

        if(this.data.id){
            if(this.data.forwarder){
                this.data.forwarder.attn=this.data.attn;
            }
            this.selectedForwarder=this.data.forwarder;
            this.selectedInvoice={
                invoiceNo: this.data.invoiceNo
            }
        }
        
    }

    selectedForwarderChanged(newValue){
        this.data.forwarder=null;    
        var _attnName = "";
        //console.log(newValue);
        if(newValue){            
            this.data.forwarder={
                id: newValue.Id || newValue.id,
                code:newValue.Code || newValue.code,
                name:newValue.Name || newValue.name,
                //attn: newValue.Attention || newValue.attn,
                address: newValue.Address || newValue.address,
                phone: newValue.PhoneNumber ||newValue.phone,
                fax: newValue.FaxNumber || newValue.fax,   
            };                           
            this.data.fax=newValue.FaxNumber;
            this.data.attn=newValue.Attention || newValue.attn;
        }  
        // _attnName = newValue.attn;   
        // this.data.attn = _attnName;
    }

    selectedInvoiceChanged(newValue){
        if(this.data.id) return;
        if(newValue){
            this.data.invoiceNo=newValue.invoiceNo;
            this.data.invoiceId=newValue.id;
            this.data.bankAccountId= newValue.bankAccountId;
            this.data.bankAccountName=newValue.bankAccount;
            this.data.buyerAgent=newValue.buyerAgent;
            this.data.shippingStaffName=newValue.shippingStaff;
            this.data.shippingStaffId=newValue.shippingStaffId;
            this.data.buyerAgentAddress=newValue.consigneeAddress;
            
            this.service.searchPackingList({filter : JSON.stringify({ InvoiceNo: this.data.invoiceNo })})
            .then(result=>{
                var pl= result.data[0];
                this.data.truckingDate=pl.truckingDate;
                this.data.marks=pl.shippingMark;
                // this.coreService.getBuyerById(this.data.buyerAgent.id)
                // .then(buyer=>{
                //     var city= buyer.City==null ? "": "\n" + buyer.City ;
                //     var country=buyer.Country==null? "" : "\n" + buyer.Country;
                //     this.data.buyerAgentAddress= buyer.Address + city + country;
                
                // });
            });
        }
    }
}
