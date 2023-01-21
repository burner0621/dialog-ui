import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service, SalesService, CoreService } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');
var BuyerLoader = require('../../../loader/garment-buyers-loader');
const UomLoader = require("../../../loader/uom-loader");

@inject(Service, SalesService, CoreService)
export class DataForm {
    @bindable readOnly = false;
    @bindable isCreate = false;
    @bindable isView = false;
    @bindable isEdit = false;
    @bindable title;
    @bindable data = {};
    // @bindable error = {};
    @bindable itemOptions = {};
    @bindable selectedUnit;

    constructor(service, salesService, coreService) {
        this.service = service;
        this.salesService = salesService;
        this.coreService = coreService;
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    };
    subconTypes=["BORDIR","PRINT","PLISKET","OTHERS"];
    controlOptions = {
        label: {
            length: 2
        },
        control: {
            length: 5
        }
    };

    itemsInfo = {
        columns: [
            "RO",
            "No Artikel",
            "Komoditi",
            ""
        ]
    }

    UomPackingfilter={
        'Unit=="ROLL" || Unit=="COLI" || UNIT=="IKAT" || UNIT=="CARTON"': "true",
    };

    get UomPackingLoader() {
        return UomLoader;
    }

    get buyerLoader() {
        return BuyerLoader;
    }
    buyerView = (buyer) => {
        var buyerName = buyer.Name || buyer.name;
        var buyerCode = buyer.Code || buyer.code;
        return `${buyerCode} - ${buyerName}`
    }

    // @computedFrom("data.Unit")
    // get cuttingInFilter() {
    //     this.selectedCuttingIn = null;
    //     if (this.data.Unit) {
    //         return {
    //             UnitId: this.data.Unit.Id,
    //             CuttingFrom:"PREPARING",
    //             CuttingType:"MAIN FABRIC"
    //         };
    //     } else {
    //         return {
    //             UnitId: 0,
    //             CuttingFrom:"PREPARING",
    //             CuttingType:"MAIN FABRIC"
    //         };
    //     }
    // }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.itemOptions = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            checkedAll: this.context.isCreate == true ? false : true,
            isEdit: this.isEdit,
            readOnly: this.readOnly,

        }

        if (this.data && this.data.Items) {
            this.data.Items.forEach(
                item => {
                    item.Unit = this.data.Unit;
                }
            );
            for(var item of this.data.Items){
                for(var d of item.Details){
                    var Sizes=[];
                    for(var s of d.Sizes){
                        var detail={};
                        if(Sizes.length==0){
                            detail.Id=s.Id;
                            detail.CuttingInDetailId = s.CuttingInDetailId;
                            detail.CuttingInId = s.CuttingInId;
                            detail.Quantity=s.Quantity;
                            detail.Size=s.Size;
                            detail.Color=s.Color;
                            detail.Uom=s.Uom;
                            Sizes.push(detail);
                        }
                        else{
                            var exist= Sizes.find(a=>a.Size.Id==s.Size.Id);
                            if(!exist){
                                detail.Id=s.Id;
                                detail.CuttingInDetailId = s.CuttingInDetailId;
                                detail.CuttingInId = s.CuttingInId;
                                detail.Quantity=s.Quantity;
                                detail.Size=s.Size;
                                detail.Color=s.Color;
                                detail.Uom=s.Uom;
                                Sizes.push(detail);
                            }
                            else{
                                var idx= Sizes.indexOf(exist);
                                exist.Quantity+=s.Quantity;
                                Sizes[idx]=exist;
                            }
                        }
                    }
                    d.Sizes=Sizes;
                }
            }
        }
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    get unitLoader() {
        return UnitLoader;
    }

    get addItems() {
        return (event) => {
            this.data.Items.push({
                Unit:this.data.Unit,
                Buyer:this.data.Buyer
            });
        };
    }

    get removeItems() {
        return (event) => {
            this.error = null;
        };
    }

    selectedUnitChanged(newValue){
        if(newValue){
            this.data.Unit=newValue;
        }
        else{
            this.data.Unit=null;
            this.data.Items.splice(0);
        }
        this.data.Items.splice(0);
    }

    get totalQuantity(){
        var qty=0;
        if(this.data.Items){
            for(var item of this.data.Items){
                if(item.Details){
                    for(var detail of item.Details){
                        qty += detail.Quantity;
                    }
                }
            }
        }
        return qty;
    }

    get buyerLoader() {
        return BuyerLoader;
    }
    buyerView = (buyer) => {
        var buyerName = buyer.Name || buyer.name;
        var buyerCode = buyer.Code || buyer.code;
        return `${buyerCode} - ${buyerName}`
    }
}