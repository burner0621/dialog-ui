import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, DeliveryOrderService, CostCalculationService } from './service';

@inject(Router, Service, DeliveryOrderService, CostCalculationService)
export class Edit {
    constructor(router, service, doService, CostCalculationService) {
        this.router = router;
        this.service = service;
        this.doService = doService;
        this.ccService = CostCalculationService;
    }

    bind() {
        this.error = {};
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.read(id);

        if (this.data) {
            this.selectedDeliveryOrder = {
                DONo: this.data.DONo
            };

            this.data.deliveryOrder = await this.doService.read(this.data.DOId);
            this.selectedSupplier = this.data.deliveryOrder.supplier;
            this.selectedSupplier.toString = function() {
                return `${this.Code} - ${this.Name}`;
            };

            for (const item of this.data.Items) {
                const doItem = this.data.deliveryOrder.items.find(i => i.Id == item.DOItemId);
                const doDetail = doItem.fulfillments.find(i => i.Id == item.DODetailId);

                item.DOItemId = doItem.Id;
                item.DODetailId = doDetail.Id;
                item.EPONo = doItem.purchaseOrderExternal.no;
                item.PRId = doDetail.pRId;
                item.PRItemId = doDetail.pRItemId; // untuk filter CC saja
                item.PRNo = doDetail.pRNo;
                item.POSerialNumber = doDetail.poSerialNumber;
                item.Product = doDetail.product;
                item.DealQuantity = doDetail.dealQuantity;
                item.DOQuantity = doDetail.doQuantity;
                item.Uom = doDetail.purchaseOrderUom;
                item.Conversion = doDetail.conversion;
                item.SmallQuantity = doDetail.smallQuantity;
                item.SmallUom = doDetail.smallUom;
                item.PricePerDealUnit = doDetail.pricePerDealUnit;
                item.PriceTotal = doDetail.priceTotal;
                item.Currency = doItem.currency;
                item.Remark = doDetail.product.Remark

            }

            let ccFilter = {};
            ccFilter['CostCalculationGarment.IsApprovedPPIC'] = true;
            ccFilter['IsPRMaster'] = true;
            ccFilter[this.data.Items.map(item => `PRMasterId == ${item.PRId}`).join(" or ")] = true;
            ccFilter[this.data.Items.map(item => `PRMasterItemId == ${item.PRItemId}`).join(" or ")] = true;

            const costCalculationMaterials = await this.ccService.readMaterials({
                filter: JSON.stringify(ccFilter),
                select: "new(Id, IsPRMaster, PRMasterId, PRMasterItemId, PO_SerialNumber, new(ProductId as Id, ProductCode as Code) as Product, BudgetQuantity, new(UOMPriceId as Id, UOMPriceName as Unit) as UOMPrice, CostCalculationGarment.Id as CostcalculationId, CostCalculationGarment.RO_Number, CostCalculationGarment.PreSCId)"
            });

            this.data.Items.forEach(item => {
                const ccMaterials = costCalculationMaterials.data.filter(f => f.PRMasterId == item.PRId && f.PRMasterItemId == item.PRItemId);
                (ccMaterials || []).forEach(material => {
                    item.SCId = material.PreSCId;
                    const detailByPOSerialNumber = (item.Details || []).findIndex(d => d.POSerialNumber === material.PO_SerialNumber);
                    if (detailByPOSerialNumber < 0) {
                        item.Details.push({
                            Conversion: 1,
                            // ParentProduct: item.Product,
                            Uom: item.Uom,
                            // SCId: material.PreSCId,
    
                            RONo: material.RO_Number,
                            CostcalculationId: material.CostcalculationId,
    
                            POSerialNumber: material.PO_SerialNumber,
                            Product: material.Product,
                            QuantityCC: material.BudgetQuantity,
                            UomCC: material.UOMPrice
                        });
                    }
                });
            });
        }
    }

    backToView() {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    cancelCallback(event) {
        this.backToView();
    }

    saveCallback(event) {
        this.service.update(this.data).then(result => {
            this.backToView();
        }).catch(e => {
            this.error = e;
        })
    }
}
