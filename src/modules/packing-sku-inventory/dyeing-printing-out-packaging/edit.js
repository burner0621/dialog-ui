import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import * as _ from 'underscore';

@inject(Router, Service)
export class Edit {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        if (this.data.type == "OUT") {
            this.data.packagingProductionOrders = this.data.packagingProductionOrders.filter(s => s.hasNextAreaDocument === false);
        }
        
        var groupObj = _.groupBy(this.data.packagingProductionOrders, 'productionOrderNo');
        var mappedGroup = _.map(groupObj);

        var packagingProductionOrdersGroup = [];
        mappedGroup.forEach((element, index) => {
            var headData = {};

            element.forEach((x, i) => {
                if (i == 0) {
                    headData = x;
                    headData.PackagingList = [];
                }
                headData.PackagingList.push(x);
            });
            packagingProductionOrdersGroup.push(headData);
        });
        this.data.packagingProductionOrders = packagingProductionOrdersGroup;
        this.canEdit = true;
    }

    view(data) {
        this.router.navigateToRoute('view', { id: this.data.id });
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
        bodyRequest.bonNo = this.data.bonNo;
        bodyRequest.bonNoInput = this.data.bonNoInput;
        bodyRequest.hasNextAreaDocument = this.data.hasNextAreaDocument;
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
                    itemSpp.status = item.status;
                    itemSpp.hasNextAreaDocument = item.hasNextAreaDocument;
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
                    bodyRequest.packagingProductionOrders.push(itemSpp);
                });
        });
        bodyRequest.packagingProductionOrdersAdj = this.data.packagingProductionOrdersAdj;
        this.service.update(bodyRequest).then(result => {
            this.view();
        }).catch(e => {
            this.error = e;
        })
    }
}