import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

let PackingInputSPPLoader = require("../../../loader/input-packaging-production-order-loader");


@inject(Router, Service)
export class Create {
    isCreate = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
        this.error = {};
    }


    back() {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    activate() {
        // PackingInputSPPLoader(null,null).then( data => {
        // });
        this.service.getInputBon().then(result => {
        });
    }

    save() {

        var bodyRequest = {};
        bodyRequest.type = this.data.type;
        bodyRequest.area = this.data.area;
        bodyRequest.date = this.data.date;
        bodyRequest.destinationArea = this.data.destinationArea;
        bodyRequest.group = this.data.group;
        bodyRequest.id = this.data.id;
        bodyRequest.shift = this.data.shift;
        bodyRequest.bonNoInput = this.data.bonNoInput;
        bodyRequest.packagingProductionOrders = [];
        this.data.packagingProductionOrders.forEach(element => {
            element.PackagingList
                // .filter(s => s.IsSave)
                .forEach(item => {
                    var itemSpp = {};
                    itemSpp.productionOrderNo = item.productionOrderNo;
                    itemSpp.productionOrder = item.productionOrder;
                    itemSpp.materialProduct = item.materialProduct;
                    itemSpp.materialConstruction = item.materialConstruction;
                    itemSpp.materialWidth = item.materialWidth;
                    itemSpp.finishWidth = item.finishWidth;
                    itemSpp.processType = item.processType;
                    itemSpp.yarnMaterial = item.yarnMaterial;
                    itemSpp.balance = item.balance;
                    itemSpp.balanceRemains = item.balanceRemains;
                    itemSpp.dyeingPrintingAreaInputProductionOrderId = item.dyeingPrintingAreaInputProductionOrderId;
                    itemSpp.buyerId = item.buyerId;
                    itemSpp.buyer = item.buyer;
                    itemSpp.color = item.color;
                    itemSpp.construction = item.construction;
                    itemSpp.grade = item.grade;
                    itemSpp.keterangan = item.keterangan;
                    itemSpp.motif = item.motif;
                    itemSpp.packagingQTY = item.packagingQTY;
                    itemSpp.packagingType = item.packagingType;
                    itemSpp.packagingUnit = item.packagingUnit;
                    itemSpp.packingLength = item.packingLength;
                    itemSpp.packingInstruction = item.packingInstruction;
                    itemSpp.qtyOrder = item.qtyOrder;
                    itemSpp.qtyOut = item.qtyOut;
                    itemSpp.unit = item.unit;
                    itemSpp.uomUnit = item.uomUnit;
                    itemSpp.cartNo = item.cartNo;
                    itemSpp.remark = item.remark;
                    itemSpp.productionMachine = item.productionMachine;
                    itemSpp.status = item.status;
                    itemSpp.material = item.material;
                    itemSpp.id = item.id;
                    itemSpp.IsSave = item.IsSave;
                    itemSpp.productSKUId = item.productSKUId;
                    itemSpp.fabricSKUId = item.fabricSKUId;
                    itemSpp.productSKUCode = item.productSKUCode;
                    itemSpp.hasPrintingProductSKU = item.hasPrintingProductSKU;
                    itemSpp.productPackingId = item.productPackingId;
                    itemSpp.fabricPackingId = item.fabricPackingId;
                    itemSpp.productPackingCode = item.productPackingCode;
                    itemSpp.hasPrintingProductPacking = item.hasPrintingProductPacking;
                    itemSpp.dateIn = item.dateIn;
                    itemSpp.materialOrigin = item.materialOrigin;
                    itemSpp.productTextile =item.productTextile;
                    bodyRequest.packagingProductionOrders.push(itemSpp);
                });
        });
        bodyRequest.packagingProductionOrdersAdj = this.data.packagingProductionOrdersAdj;

        
        this.service.create(bodyRequest)
            .then(result => {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(e => {
                console.log(e.ProductSKU);
                if (e.statusCode == 500) {
                    alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
                } else if(e.ProductSKU == "SKU belum ada") {

                    alert("SKU Belum ada");
                } 
                else {
                    this.error = e;
                }
            });
    }
}
