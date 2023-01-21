import { inject, bindable, computedFrom } from 'aurelia-framework'
var ProductionOrderLoader = require('../../../../loader/production-order-azure-loader');
import { DataForm } from '../data-form'
import { ItemSPP } from './item-spp'
@inject(DataForm, ItemSPP)
export class CartItem {
    @bindable product;

    constructor(dataForm, itemSPP) {
        this.dataForm = dataForm;
        this.itemSPP = itemSPP;
    }
    remarks = ["Acc Buyer", "Keputusan Prod", "Perbaikan", "Colet"];
    activate(context) {

        this.context = context;
        this.data = context.data;
        
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        this.isEdit = this.contextOptions.isEdit;
        this.type = this.contextOptions.type;
        this.destinationArea = this.dataForm.data.destinationArea;
        this.isTransit = this.destinationArea == "TRANSIT";


        // this.productionOrderListItem = this.dataForm.selectedPackaging.packagingProductionOrders;
        this.packType = ["WHITE", "DYEING", "BATIK", "TEXTILE", "DIGITAL PRINT", "TRANFER PRINT", "PRINTING MAKLOON", "PRINTING SUBCON", "DYEING MAKLOON", "DYEING SUBCON", "GINGHAM", "YARN DYED"];
        this.packUnit = ["ROLL", "PIECE", "POTONGAN"];

        if (this.data.productionOrder && this.data.productionOrder.id) {
            console.log(this.selectedProductionOrder);
            this.selectedProductionOrder = {};
            this.selectedProductionOrder.Id = this.data.productionOrder.id;
            this.selectedProductionOrder.OrderNo = this.data.productionOrder.no;
            this.selectedProductionOrder.productionOrderNo = this.data.productionOrder.no;
            this.selectedProductionOrder.OrderType = {};
            this.selectedProductionOrder.OrderType.Name = this.data.productionOrder.type;
            this.selectedProductionOrder.OrderQuantity = this.data.balance;
            this.selectedProductionOrder.Construction = this.data.construction;
            this.selectedProductionOrder.Buyer = {};
            this.selectedProductionOrder.Buyer.Id = this.data.buyerId;
            this.selectedProductionOrder.Buyer.Name = this.data.buyer;
            this.selectedProductionOrder.PackingInstruction = this.data.packingInstruction;
            this.selectedProductionOrder.Details = [];
            this.selectedProductionOrder.Details.push({});
            this.selectedProductionOrder.Details[0].ColorRequest = this.data.color;
            this.selectedProductionOrder.DesignCode = this.data.motif;
            this.selectedProductionOrder.Uom = {};
            this.selectedProductionOrder.Uom.Unit = this.data.unit;
            this.selectedProductionOrder.OrderQuantity = this.data.balance;
            this.selectedProductionOrder.Construction = this.data.construction;
            this.selectedProductionOrder.PackagingUnit = this.data.packagingUnit;
            this.selectedProductionOrder.PackagingType = this.data.packagingType;
            this.selectedProductionOrder.grade = this.data.grade;
            this.selectedProductionOrder.PackagingQty = this.data.packagingQTY;
            //this.selectedProductionOrder.ProductTextile.Name = this.data.productTextile.name
            // this.selectedProductionOrder.qtyOut = this.data.qtyOut;
            if (this.data.packagingQTY) {
                this.inputPackagingQTY = this.data.packagingQTY;
            }

            if (this.data.packingLength) {
                this.saldoPerPackaging = this.data.packingLength;

            }

            // if (this.itemSPP && this.itemSPP.data && this.itemSPP.data.PackagingList) {
            //     var sum = this.itemSPP.data.PackagingList.filter(s => s.dyeingPrintingAreaInputProductionOrderId == this.data.dyeingPrintingAreaInputProductionOrderId)
            //         .reduce((a, b) => {
            //             return +a + +b.qtyOut
            //         }, 0);
            //     for (var item of this.itemSPP.data.PackagingList.filter(s => s.dyeingPrintingAreaInputProductionOrderId == this.data.dyeingPrintingAreaInputProductionOrderId)) {

            //         item.balanceRemains = item.previousBalance - sum;

            //     }
            // }

            if (this.itemSPP && this.itemSPP.data && this.itemSPP.data.PackagingList) {
                var sum = this.itemSPP.data.PackagingList.filter(s => s.grade == this.data.grade)
                    .reduce((a, b) => {
                        return +a + +b.qtyOut
                    }, 0);
                for (var item of this.itemSPP.data.PackagingList.filter(s => s.grade == this.data.grade)) {

                    item.balanceRemains = item.previousBalance - sum;

                }
            }

            if (this.selectedProductionOrder.OrderNo.charAt(0) === 'P') {
                this.data.unit = "PRINTING"
            } else {
                this.data.unit = "DYEING"
            }

        }
    }


    controlOptions = {
        control: {
            length: 12
        }
    };

    get productionOrderLoader() {
        return ProductionOrderLoader;
    }
    // get productionOrderList(){
    //     return (keyword) => {
    //         return Promise.resolve().then(result => {return this.productionOrderListItem;});
    //       }
    // }
    get productionOrderList() {
        return (keyword) => {
            return Promise.resolve().then(result => { return this.productionOrderListItem; });
        }
    }

    @bindable isCheckedSPP;
    isCheckedSPPChanged(e) {
        this.data.isCheckedSPP = this.isCheckedSPP;
    }

    @bindable selectedProductionOrder;
    selectedProductionOrderChanged(newValue, oldValue) {
        if (this.selectedProductionOrder && this.selectedProductionOrder.id) {
            this.data.productionOrder = {};
            this.data.productionOrder.id = this.selectedProductionOrder.id;
            this.data.productionOrder.no = this.selectedProductionOrder.productionOrderNo;
            this.data.productionOrder.type = this.selectedProductionOrder.productionOrder.type;
            this.data.balance = this.selectedProductionOrder.balance;
            this.data.balanceRemains = this.selectedProductionOrder.balanceRemains;
            this.data.dyeingPrintingAreaInputProductionOrderId = this.selectedProductionOrder.dyeingPrintingAreaInputProductionOrderId;
            this.data.qtyOrder = this.selectedProductionOrder.qtyOrder;
            if (this.selectedProductionOrder.construction) {
                this.data.construction = this.selectedProductionOrder.construction;
            } else {
                this.data.construction = `${this.selectedProductionOrder.Material.Name} / ${this.selectedProductionOrder.MaterialConstruction.Name} / ${this.selectedProductionOrder.MaterialWidth}`
            }
            this.data.material = this.data.construction;
            this.data.buyerId = this.selectedProductionOrder.buyerId;
            this.data.buyer = this.selectedProductionOrder.buyer;
            this.data.packingInstruction = this.selectedProductionOrder.packingInstruction;
            this.data.color = this.selectedProductionOrder.color;
            this.data.motif = this.selectedProductionOrder.motif;
            this.data.uomUnit = this.selectedProductionOrder.uomUnit;
            this.data.grade = this.selectedProductionOrder.grade;
            // this.data.qtyOut = this.selectedProductionOrder.qtyOut;
            this.inputPackagingQTY = this.selectedProductionOrder.PackagingQty;
            this.data.packagingQTY = this.selectedProductionOrder.PackagingQty;
            this.data.productTextile.name = this.selectedProductionOrder.productTextile.name ;
            // this.data.
            // this.data.bonNoInput = this.selectedProductionOrder.bonNo;
            if (this.selectedProductionOrder.productionOrderNo.charAt(0) === 'P') {
                this.data.unit = "PRINTING"
            } else {
                this.data.unit = "DYEING"
            }
        }
        else {
            this.data.productionOrder = {};
        }
    }

    @bindable saldoPerPackaging
    saldoPerPackagingChanged(newValue, olderValue) {
        // if (this.dataForm.context.isCreate) {
        if (newValue != olderValue) {
            this.data.qtyOut = this.inputPackagingQTY * newValue;
            // this.data.packagingQTY = this.inputPackagingQTY;
            this.data.packingLength = this.saldoPerPackaging;
            // if (this.itemSPP && this.itemSPP.data && this.itemSPP.data.PackagingList) {

            //     var sum = this.itemSPP.data.PackagingList.filter(s => s.dyeingPrintingAreaInputProductionOrderId == this.data.dyeingPrintingAreaInputProductionOrderId)
            //         .reduce((a, b) => +a + +b.qtyOut, 0);
            //     for (var item of this.itemSPP.data.PackagingList.filter(s => s.dyeingPrintingAreaInputProductionOrderId == this.data.dyeingPrintingAreaInputProductionOrderId)) {
            //         item.balanceRemains = item.previousBalance - sum;

            //     }
            // }

            if (this.itemSPP && this.itemSPP.data && this.itemSPP.data.PackagingList) {

                var sum = this.itemSPP.data.PackagingList.filter(s => s.grade == this.data.grade)
                    .reduce((a, b) => +a + +b.qtyOut, 0);
                for (var item of this.itemSPP.data.PackagingList.filter(s => s.grade == this.data.grade)) {
                    item.balanceRemains = item.previousBalance - sum;

                }
            }
        }
    }
    @bindable inputPackagingQTY
    inputPackagingQTYChanged(newValue, olderValue) {
        // if (this.dataForm.context.isCreate) {
        if (newValue != olderValue) {
            this.data.qtyOut = this.saldoPerPackaging * newValue;

            this.data.packagingQTY = this.inputPackagingQTY;

            // if (this.itemSPP && this.itemSPP.data && this.itemSPP.data.PackagingList) {

            //     var sum = this.itemSPP.data.PackagingList.filter(s => s.dyeingPrintingAreaInputProductionOrderId == this.data.dyeingPrintingAreaInputProductionOrderId)
            //         .reduce((a, b) => +a + +b.qtyOut, 0);
            //     for (var item of this.itemSPP.data.PackagingList.filter(s => s.dyeingPrintingAreaInputProductionOrderId == this.data.dyeingPrintingAreaInputProductionOrderId)) {
            //         item.balanceRemains = item.previousBalance - sum;

            //     }
            // }
            if (this.itemSPP && this.itemSPP.data && this.itemSPP.data.PackagingList) {

                var sum = this.itemSPP.data.PackagingList.filter(s => s.grade == this.data.grade)
                    .reduce((a, b) => +a + +b.qtyOut, 0);
                for (var item of this.itemSPP.data.PackagingList.filter(s => s.grade == this.data.grade)) {
                    item.balanceRemains = item.previousBalance - sum;

                }
            }
        }
    }
    changeCheckBox() {
        this.context.context.options.checkedAll = this.context.context.items.reduce((acc, curr) => acc && curr.data.IsSave, true);
    }
}