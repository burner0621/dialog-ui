import { bindable, inject, containerless, computedFrom, BindingEngine } from "aurelia-framework";
import { BindingSignaler } from 'aurelia-templating-resources';
import { Service } from "./service";
import moment from 'moment';
var SupplierLoader = require('../../../loader/garment-supplier-loader');
var CurrencyLoader = require('../../../loader/garment-currencies-by-date-loader');
var CustomsLoader = require('../../../loader/garment-customs-by-no-loader');

@containerless()
@inject(Service, BindingSignaler, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable readOnlyBCDL = true;
    @bindable readOnlyNoBCDL=false;
    @bindable options = { readOnly: false };
    @bindable hasView = false;
    @bindable data = {};
    @bindable title;
    @bindable amount;
    @bindable item;
    @bindable beacukai;
    @bindable selectedCustomType;
    typeCustoms = ["","BC 262", "BC 23","BC 40", "BC 27"]
    importValueBC23=[
        "EXW",
        "FCA",
        "FAS",
        "FOB",
        "CFR",
        "CIF",
        "CPT",
        "CIP",
        "DPU",
        "DAP",
        "DDP"
    ]

    constructor(service, bindingSignaler, bindingEngine) {
        this.service = service;
        this.signaler = bindingSignaler;
        this.bindingEngine = bindingEngine;
    }
    @computedFrom("data.Id")
    get isEdit() {
        return false;
    }
    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    get dataAmount(){
        this.amount = this.amount || 0;
        return this.amount;
    }
    async beacukaiChanged(newValue, oldValue) {
        var selectedBeacukai = newValue;
       
        if (selectedBeacukai) {
            if (selectedBeacukai.BCId) {
                this.data.beacukaiNo = selectedBeacukai.BCNo;
                this.data.beacukaiDate = selectedBeacukai.TglBCNo;
                this.data.customType = selectedBeacukai.JenisBC;
                this.selectedCustomType = selectedBeacukai.JenisBC;
                this.data.billNo=selectedBeacukai.BCId;
                this.data.arrivalDate = selectedBeacukai.Hari;
                this.data.netto = selectedBeacukai.Netto;
                this.data.bruto = selectedBeacukai.Bruto;
                this.context.beacukaiAU.editorValue="";
            }else {
                this.data.beacukaiDate = null;
                this.data.beacukaiNo = null;
                this.data.customType=null;
                this.selectedCustomType = null;
                this.data.billNo="";
                this.data.arrivalDate = null;
                this.data.netto = 0;
                this.data.bruto = 0;
            }
        //     if (oldValue) {
        //         this.data.beacukaiDate = null;
        //         this.data.beacukaiNo = null;
        //         this.data.customType=null;
        //         this.data.billNo="";
        //     }
        // } else {
        //     this.data.beacukaiDate = null;
        //     this.data.beacukaiNo = null;
        //     this.data.customType=null;
        //     this.data.billNo="";
        }
    }
    isBCDLChanged(e) {
        var selectedisBCDL = e.srcElement.checked || false;
      
       if(selectedisBCDL == true)
       {
         
            this.beacukai={};
            this.readOnlyBCDL=false;
            this.readOnlyNoBCDL=true;
            this.data.beacukaiDate = undefined;
            this.data.beacukaiNo = undefined;
            this.data.customType=undefined;
            this.selectedCustomType = undefined;
            this.data.arrivalDate =undefined;
       }else
       {
            this.beacukai={};
            this.readOnlyBCDL=true;
            this.readOnlyNoBCDL=false;
            this.data.beacukaiDate = undefined;
            this.data.beacukaiNo = undefined;
            this.data.customType=undefined;
            this.selectedCustomType = undefined;
            this.data.arrivalDate =undefined;
       }
    }
    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.selectedCustomType = this.context.data.customType;
        this.error = this.context.error;
        this.hasView = this.context.hasView ? this.context.hasView : false;
        this.deliveryOrderColumns = this.hasView ? [
            
            { header: "No Surat Jalan", value: "no" },
            { header: "Tanggal Surat Jalan", value: "supplierDate" },
            { header: "Tanggal Datang Barang", value: "date" },
            { header: "Total Jumlah", value: "quantity" },
            { header: "Total Harga", value: "price" }
        ] : [
            { header: "", value: "selected" },
            { header: "No Surat Jalan", value: "no" },
            { header: "Tanggal Surat Jalan", value: "supplierDate" },
            { header: "Tanggal Datang Barang", value: "date" },
            { header: "Total Jumlah", value: "quantity" },
            { header: "Total Harga", value: "price" }
        ]
      
        if(this.data.Id)
        {
           
            var a;
            for(var i of this.data.deliveryOrders)
            {
                a=i.isView;break;
            }
           
            if(a===true)
            {
                this.options.hasView=true;
            }else
            {

                this.options.hasView=false;
            }
            if(this.data.billNo.includes("BP"))
            { this.data.isBCDL=false;
                this.readOnlyBCDL=true;
                
            }
            else
            {
                this.showCustoms=false;
                this.readOnlyBCDL=false;
                this.data.isBCDL=true; 
            }
        }else
        {
            this.options.hasView=true;
            this.showCustoms=true;
        }
    }
    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }
    deliveryOrderColumns = [] 

    get supplierLoader(){
        return SupplierLoader;
    }

    get currencyLoader(){
        return CurrencyLoader;
    }
    get customsLoader(){
        return CustomsLoader;
    }


    get isSupplier(){
        return this.data && this.data.supplierId && this.data.supplierId !== '';
    }

    valueChange(e){
    }
    customsView = (customs) => {
       if(customs.BCNo)
    //    return `${customs.BCNo} - ${customs.JenisBC}- ${customs.TglBCNo.toString()}`;
       return `${customs.BCNo} - ${customs.JenisBC}- ${moment(customs.TglBCNo).format("YYYY-MM-DD")}`;
    }
    currencyView = (currency) => {
        if(this.data.Id)
        {
            return currency.Code
        }else
        {
            return currency.code
        }
    }
    supplierView = (supplier) => {
        if(this.data.Id)
        {
            return `${supplier.Code} - ${supplier.Name}`
        }else
        {
            return `${supplier.code} - ${supplier.name}`
        }
    }

    supplierChange(e) {
        if (this.data.supplier && this.data.supplier._id){
            this.data.supplierId = this.data.supplier._id;
        }
        else{
            delete this.data.supplierId;
        }
        this.data.deliveryOrders = [];
        delete this.data.currencyId;
        this.data.currency = {};
    }

    async currencyChange(e){
        this.data.deliveryOrders = [];
      
        if (this.data.currency && this.data.currency.Id){
            this.data.currencyId = this.data.currency.Id;
            if(!this.hasView){
                var result = await this.service.searchDeliveryOrder({ "supplier" : `${this.data.supplier.Id}`, "currency" : `${this.data.currency.code}`, "billNo" : this.data.billNo });
                var dataDelivery = [];
              
                for(var a of result.data){
                    var data = a;
                    data["selected"] = false;
                    data["doNo"]=a.doNo;
                    data["doId"]=a.Id;
                    data["doDate"]=a.doDate;
                    data["arrivalDate"]=a.arrivalDate;
                    
                    data["isView"] = !this.hasView ? true : false
                    var quantity = 0;
                    var totPrice = 0;
                    for(var b of a.items){
                        for(var c of b.fulfillments){
                            quantity += c.doQuantity;
                            var priceTemp = c.doQuantity * c.pricePerDealUnit;
                            totPrice += priceTemp;
                        }
                    }
                    data["quantity"] = quantity;
                    data["price"] = totPrice.toFixed(3);
                    dataDelivery.push(data);
                }
                this.data.deliveryOrders = dataDelivery;
            }
        }
        else{
            delete this.data.currencyId;
        }
    }
    selectedCustomTypeChanged(o,n){
        // console.log(n);
        // console.log(o);
        this.data.customType = o;
        if(o =="BC 23")
            this.data.IsBC23 =true;
        else
            this.data.IsBC23 = false;
            this.data.importValue = null;
    }
}