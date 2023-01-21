import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service, PurchasingService } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');
var BuyerLoader = require('../../../loader/garment-buyers-loader');
// var uomLoader = require('../../../loader/uom-loader');

@inject(Service, PurchasingService)
export class DataForm {
    @bindable readOnly = false;
    @bindable isCreate = false;
    @bindable isView = false;
    @bindable isEdit = false;
    @bindable title;
    @bindable data = {};
    @bindable error = {};
    @bindable itemOptions = {};

    constructor(service, purchasingService) {
        this.service = service;
        this.purchasingService = purchasingService;
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    };

    UomOptions = ['COLI', 'IKAT', 'CARTON', 'ROLL'];
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
            "No.Bon Pengeluaran Unit",
            "Tanggal Pengeluaran",
            "Asal Unit",
            "Asal Gudang"
        ]
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.itemOptions = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            checkedAll: this.context.isCreate == true ? false : true,
            isEdit: this.context.isEdit,

        }
        if (this.data && this.data.Items) {
            // this.data.Items.forEach(
            //     item => {
            //         item.Unit = this.data.Unit;
            //     }
            // );
            // for(var item of this.data.Items){
            //     for(var d of item.Details){
            //         var Sizes=[];
            //         for(var s of d.Sizes){
            //             var detail={};
            //             if(Sizes.length==0){
            //                 detail.Quantity=s.Quantity;
            //                 detail.Size=s.Size;
            //                 detail.Color=s.Color;
            //                 detail.Uom=s.Uom;
            //                 Sizes.push(detail);
            //             }
            //             else{
            //                 var exist= Sizes.find(a=>a.Size.Id==s.Size.Id);
            //                 if(!exist){
            //                     detail.Quantity=s.Quantity;
            //                     detail.Size=s.Size;
            //                     detail.Color=s.Color;
            //                     detail.Uom=s.Uom;
            //                     Sizes.push(detail);
            //                 }
            //                 else{
            //                     var idx= Sizes.indexOf(exist);
            //                     exist.Quantity+=s.Quantity;
            //                     Sizes[idx]=exist;
            //                 }
            //             }
            //         }
            //         d.Sizes=Sizes;
            //     }
            // }
        }
    }

    // get uomLoader() {
    //     return uomLoader;
    //   }
    //   uomView = (uom) => {
    //     var uomName = uom.Name || uom.name;
    //     return `${uomName}`
    //   }

    get addItems() {
        return (event) => {
            this.data.Items.push({
                UnitExpenditureNo: "",
                ExpenditureDate: "",
                UnitSender: {},
                UnitRequest: {},
                Details: []
            });
        };
    }

    get removeItems() {
        return (event) => {
            this.error = null;
        };
    }

    get totalQuantity() {
        var qty = 0;
        if (this.data.Items) {
            for (var item of this.data.Items) {
                if (item.Details) {
                    for (var detail of item.Details) {
                        qty += detail.Quantity;
                    }
                }
            }
        }
        return qty;
    }
}