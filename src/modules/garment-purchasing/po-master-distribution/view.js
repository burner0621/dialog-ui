import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, DeliveryOrderService } from './service';

@inject(Router, Service, DeliveryOrderService)
export class View {
    constructor(router, service, doService) {
        this.router = router;
        this.service = service;
        this.doService = doService;
    }

    async activate(params) {
        let id = params.id;
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
        }
    }

    backToList() {
        var r = confirm("Apakah anda yakin akan keluar?")
        if (r == true) {
            this.router.navigateToRoute('list');
        }
    }

    cancelCallback(event) {
        this.backToList();
    }

    editCallback(event) {
        var r = confirm("Apakah anda yakin akan mengubah data ini?")
        if (r == true) {
            this.router.navigateToRoute('edit', { id: this.data.Id });
        }
    }

    deleteCallback(event) {
        if (confirm(`Hapus Data?`))
            this.service.delete(this.data)
                .then(result => {
                    this.backToList();
                });
    }
}
