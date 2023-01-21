import { inject, bindable, computedFrom } from 'aurelia-framework'
import {Dialog} from '../../../../components/dialog/dialog';
import{PackagingDetails} from './packaging-details';
import{DialogService} from 'aurelia-dialog';
var ProductionOrderLoader = require('../../../../loader/output-packaging-loader');

@inject(Dialog,DialogService)
export class PackagingItem {
    @bindable product;
    @bindable detailShow;
    constructor(dialog,dialogService){
        this.dialog = dialog;
        this.dialogService = dialogService;
    }
    remarks = [];
    activate(context) {

        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        // this.destinationArea = this.contextOptions.destinationArea;
        this.packType=["WHITE","DYEING","BATIK","TEXTILE","DIGITAL PRINT","TRANFER PRINT"];
        this.packUnit=["ROLL","PIECE","POTONGAN"];
        if (this.data.productionOrder) {
            this.selectedProductionOrder = {};
            this.selectedProductionOrder.Id = this.data.productionOrder.id;
            this.selectedProductionOrder.OrderNo = this.data.productionOrder.no;
            this.selectedProductionOrder.productionOrderNo = this.data.productionOrder.no;
            this.selectedProductionOrder.OrderType = {};
            this.selectedProductionOrder.OrderType.Name = this.data.productionOrder.type;
            this.selectedProductionOrder.OrderQuantity = this.data.balance;
            this.selectedProductionOrder.Construction = this.data.construction;
            this.selectedProductionOrder.Buyer = {};
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
            this.selectedProductionOrder.PackagingQty = this.data.packagingQTY;
            this.selectedProductionOrder.PackagingUnit = this.data.packagingUnit;
            this.selectedProductionOrder.PackagingType = this.data.packagingType;
            if (this.selectedProductionOrder.OrderNo.charAt(0) === 'P') {
                this.data.unit = "PRINTING"
            } else {
                this.data.unit = "DYEING"
            }
        }
    }
    @bindable selectedProductionOrder;
    selectedProductionOrderChanged(newValue, oldValue) {
        if (this.selectedProductionOrder) {
            this.data.productionOrder = {};
            this.data.productionOrder.id = this.selectedProductionOrder.Id;
            this.data.productionOrder.no = this.selectedProductionOrder.productionOrder.no;
            this.data.productionOrderNo = this.selectedProductionOrder.productionOrder.no;
            this.data.productionOrder.type = this.selectedProductionOrder.productionOrder.type;
            
            if (this.selectedProductionOrder.construction) {
                this.data.construction = this.selectedProductionOrder.construction;
            } else {
                this.data.construction = `${this.selectedProductionOrder.Material.Name} / ${this.selectedProductionOrder.MaterialConstruction.Name} / ${this.selectedProductionOrder.MaterialWidth}`
            }
            this.data.buyer = this.selectedProductionOrder.buyer;
            this.data.packingInstruction = this.selectedProductionOrder.packingInstruction;
            this.data.color = this.selectedProductionOrder.color;
            this.data.motif = this.selectedProductionOrder.motif;
            this.data.uomUnit = this.selectedProductionOrder.uomUnit;
            this.data.productionOrder.orderQuantity = this.selectedProductionOrder.productionOrder.orderQuantity;
            this.data.balance = this.selectedProductionOrder.balance;
            if (this.selectedProductionOrder.productionOrder.no.charAt(0) === 'P') {
                this.data.unit = "PRINTING"
            } else {
                this.data.unit = "DYEING"
            }
            // this.data.selectedProductionOrder.push(this.selectedProductionOrder);
            this.data.packagingProductionOrdersDetails = this.data.packagingProductionOrdersDetails||[];
            this.data.packagingProductionOrdersDetails.push({
                productionOrderNo : this.data.productionOrder.no,
                balance : this.data.balance,
                usedBalance : this.data.balance
            });
        }
        else {
            this.data.productionOrder = {};
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
    detailPackaging(datas,e) {

        this.dialogService.open({viewModel: 'modules/packing-sku-inventory/dyeing-printing-out-packaging-v2/dialogs/packaging-details',model:datas}).then(response =>            
        {
            
        })
    }
}