import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { ItemTemplate } from '../../../samples/autocomplete/item-template';
import { Service } from "./service";
import { unit } from './template/unit';

const BuyerLoader = require('../../../loader/garment-buyers-loader');
const EMKLLoader = require('../../../loader/garment-emkl-loader');
const ForwarderLoader = require('../../../loader/garment-forwarder-loader');
const IncomeTaxLoader = require('../../../loader/income-tax-loader');
const CourierLoader = require('../../../loader/garment-courier-loader');
const WarehouseLoader = require('../../../loader/garment-ware-house-loader');

@inject(Service)
export class DataForm {

    constructor(service) {
        this.service = service;
    }

    @bindable readOnly = false;
    @bindable title;
    @bindable selectedPaymentType;
    @bindable selectedBuyer;
    @bindable isFreightCharged;
    @bindable invoiceDetails;
    @bindable selectedForwarder;
    @bindable selectedEMKL;    
    @bindable selectedCourier;
    @bindable selectedWarehouse;
    
    paymentTypeOptions=["FORWARDER" ,"EMKL", "COURIER", "PERGUDANGAN"];
    paidAtOptions=["SOC", "JKT"];
    paymentMethodOptions=["CASH BEFORE DELIVERY","CASH AFTER DELIVERY"];
    paymentTermOptions=["CASH","LC","TT"];
    freightByOptions=["AIR","OCEAN"]

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };
    length4 = {
        label: {
            align: "right",
            length: 6
        },
        control: {
            length: 6
        }
    }
    footerOptions = {
        label: {
            length: 3
        },
        control: {
            length: 2
        }
    };

    unitsColumns = [
        { header: "Unit"},
        { header: "Nilai Tagihan" },
    ];
    unitsColumnsForwarder = [
        { header: "Unit"},
        { header: "Persentase (%)"},
        { header: "Nilai Tagihan" },
    ];

    invoicesColumns = [
        { header: "No Invoice"},
        { header: "Quantity"},
        { header: "Amount"},
        { header: "Total Carton"},
        { header: "CBM"},
    ];

    invoicesColumnsFreightCharge = [
        { header: "No Invoice"},
        { header: "Quantity"},
        { header: "Amount"},
        { header: "Volume"},
        { header: "GW"},
        { header: "Chargeable Weight"},
        { header: "Total Carton"},
        { header: "CBM"},
    ];

    billsColumns=[
        { header: "Tagihan"},
        { header: "Nominal"},
    ]

    paymentsColumns=[
        { header: "Tanggal Bayar"},
        { header: "Keterangan"},
        { header: "Nominal"},
    ]

    get buyerLoader() {
        return BuyerLoader;
    }

    get emklLoader(){
        return EMKLLoader;
    }

    get warehouseLoader(){
        return WarehouseLoader;
    }

    get forwarderLoader(){
        return ForwarderLoader;
    }

    get courierLoader() {
        return CourierLoader;
    }

    get incomeTaxLoader(){
        return IncomeTaxLoader;
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.isEdit=this.context.isEdit;
        this.Options = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            isEdit: this.context.isEdit,
            data:this.data
        }
        if(this.data.paymentType){
            this.selectedPaymentType=this.data.paymentType;
        }
        if(this.data.buyerAgent){
            this.selectedBuyer=this.data.buyerAgent;
            for(var i of this.data.invoiceDetails){
                i.buyer=this.selectedBuyer;
            }
        }
        if(this.data.forwarder){
            this.data.forwarderId=this.data.forwarder.id;
            this.selectedForwarder=this.data.forwarder;
            this.selectedForwarder.Address=this.data.address;
            this.selectedForwarder.NPWP=this.data.npwp;
        }
        if(this.data.emkl){
            this.data.emklId=this.data.emkl.id;
            this.selectedEMKL=this.data.emkl;
            this.selectedEMKL.Address=this.data.address;
            this.selectedEMKL.NPWP=this.data.npwp;
        }
        if(this.data.courier){
            this.data.courierId=this.data.courier.id;
            this.selectedCourier=this.data.courier;
            this.selectedCourier.Address=this.data.address;
            this.selectedCourier.NPWP=this.data.npwp;
        }
        if(this.data.warehouse){
            this.data.wareHouseId=this.data.warehouse.id;
            this.selectedWarehouse=this.data.warehouse;
            this.selectedWarehouse.Address=this.data.address;
            this.selectedWarehouse.NPWP=this.data.npwp;
        }
        this.isFreightCharged=this.data.isFreightCharged;
    }

    buyerView = (data) => {
        var code= data.Code || data.code;
        var name= data.Name || data.name;
        return `${code} - ${name}`;
    }

    incomeTaxView = (data) => {
        var name= data.Name || data.name;
        var rate= data.Rate || data.rate;
        return `${name} - ${rate}`;
    }

    emklView= (data) => {
        var name= data.Name || data.name;
        return `${name}`;
    }

    warehouseView= (data) => {
        var name= data.Name || data.name;
        return `${name}`;
    }

    forwarderView= (data) => {
        var name= data.Name || data.name;
        return `${name}`;
    }
    
    courierView= (data) => {
        var name= data.Name || data.name;
        return `${name}`;
    }

    get addbills() {
        return (event) => {
            this.data.billDetails.push({});
        };
    }

    get removebills() {
        return (event) => {
            this.error = null;
        };
    }

    get addpayments() {
        return (event) => {
            this.data.paymentDetails.push({});
        };
    }

    get removepayments() {
        return (event) => {
            this.error = null;
        };
    }

    get addUnits() {
        return (event) => {
            this.data.unitCharges.push({});
        };
    }

    get removeUnits() {
        return (event) => {
            this.error = null;
        };
    }
    get addInvoices() {
        return (event) => {
            this.data.invoiceDetails.push({buyer: this.data.buyerAgent});
        };
    }

    get removeInvoices() {
        return (event) => {
            this.error = null;
            this.data.unitCharges=[];
            console.log(this.data.invoiceDetails);
            if(this.data.invoiceDetails){
                for(var inv of this.data.invoiceDetails){
                    if(inv.items){
                        for(var item of inv.items){
                            var invItem={};
                            if(this.data.unitCharges.length==0){
                                invItem.unit=item.unit;
                                this.data.unitCharges.push(invItem);
                            }
                            else{
                                let dup= this.data.unitCharges.find(a=>a.unit.code==item.unit.code);
                                if(!dup){
                                    invItem.unit=item.unit;
                                    this.data.unitCharges.push(invItem);
                                }
                            }
                        }
                    }
                }
            }
        };
    }

    get billTotal(){
        var bill=0;
        if(this.data.billValue){
            bill= (this.data.billValue + this.data.vatValue)-(this.data.incomeTaxValue);
        }
        this.data.totalBill=bill;
        return bill;
    }

    get billValue(){
        this.data.billValue=0;
        var billValue=0;
        if(this.data.billDetails){
            for(var bill of this.data.billDetails){
                billValue+=bill.amount;
            }
        }
        this.data.billValue=billValue;
        return billValue;
    }

    selectedPaymentTypeChanged(newValue){
        if(this.data.paymentType != newValue){
            this.data.emkl=null;
            this.data.forwarder=null;            
            this.data.courier=null;
            this.data.warehouse=null;            
            this.data.invoiceNumber="";
            this.data.paymentType =newValue;
        }
    }

    selectedBuyerChanged(newValue){
        if(newValue != this.data.buyerAgent){
            this.data.invoiceDetails.splice(0);
            this.data.buyerAgent=newValue;
            if(this.data.unitCharges){
                this.data.unitCharges=[];
            }
        }
    }

    isFreightChargedChanged(newValue){
        if(newValue != this.data.isFreightCharged){
            this.data.invoiceDetails.splice(0);
            this.data.isFreightCharged=newValue;
            this.data.freightNo=null;
            this.data.freightDate=null;
            this.data.flightVessel=null;
            this.data.destination=null;
            this.data.freightBy=null;
            if(this.data.unitCharges){
                this.data.unitCharges=[];
            }
        }
    }


    invoiceChanged(e){
        this.data.unitCharges=[];
        if(this.data.invoiceDetails){
            for(var inv of this.data.invoiceDetails){
                if(inv.items){
                    for(var item of inv.items){
                        var invItem={};
                        if(this.data.unitCharges.length==0){
                            invItem.unit=item.unit;
                            this.data.unitCharges.push(invItem);
                        }
                        else{
                            let dup= this.data.unitCharges.find(a=>a.unit.code==item.unit.code);
                            if(!dup){
                                invItem.unit=item.unit;
                                this.data.unitCharges.push(invItem);
                            }
                        }
                    }
                }
            }
        }
    }

    selectedForwarderChanged(newValue){
        if(newValue && newValue.Id!=this.data.forwarderId){
            this.data.forwarder={
                id:newValue.Id || newValue.id,
                code:newValue.Code || newValue.code,
                name: newValue.Name || newValue.name
            };
            this.data.forwarderId=this.data.forwarder.id;
            this.data.address=newValue.Address;
            this.data.npwp=newValue.NPWP;
            
        }
        else{
            this.data.forwarder=null;
            this.data.forwarderId=0;
            this.data.address="";
            this.data.npwp="";
        }
    }

    selectedEMKLChanged(newValue){
        if(newValue && newValue.Id!=this.data.emklId){
            this.data.emkl={
                id:newValue.Id || newValue.id,
                code:newValue.Code || newValue.code,
                name: newValue.Name || newValue.name
            };
            this.data.emklId=this.data.emkl.Id;
            this.data.address=newValue.Address;
            this.data.npwp=newValue.NPWP;
            
        }
        else{
            this.data.emkl=null;
            this.data.emklId=0;
            this.data.address="";
            this.data.npwp="";
        }
    }

    selectedWarehouseChanged(newValue){
        if(newValue && newValue.Id!=this.data.wareHouseId){
            this.data.warehouse={
                id:newValue.Id || newValue.id,
                code:newValue.Code || newValue.code,
                name: newValue.Name || newValue.name
            };
            this.data.wareHouseId=this.data.warehouse.Id;
            this.data.address=newValue.Address;
            this.data.npwp=newValue.NPWP;            
        }
        else{
            this.data.warehouse=null;
            this.data.warehouselId=0;
            this.data.address="";
            this.data.npwp="";
        }
    }

    selectedCourierChanged(newValue){
        if(newValue && newValue.Id!=this.data.courierId){
            this.data.courier={
                id:newValue.Id || newValue.id,
                code:newValue.Code || newValue.code,
                name: newValue.Name || newValue.name
            };
            this.data.courierId=this.data.courier.id;
            this.data.address=newValue.Address;
            this.data.npwp=newValue.NPWP;
            
        }
        else{
            this.data.courier=null;
            this.data.courierId=0;
            this.data.address="";
            this.data.npwp="";
        }
    }
}