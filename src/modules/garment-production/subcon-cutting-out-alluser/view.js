import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service,PurchasingService } from './service';

@inject(Router, Service,PurchasingService)
export class View {
    isView = true;
    constructor(router, service,purchasingService) {
        this.router = router;
        this.service = service;
        this.purchasingService=purchasingService;
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.read(id);
        this.selectedUnitFrom=this.data.UnitFrom;
        var epoItem= await this.purchasingService.getGarmentEPOByRONo({ filter: JSON.stringify({ Id: this.data.EPOItemId}) });
        
        this.data.PlanPORemainingQuantity=epoItem.data[0].DealQuantity;
        this.data.PlanPOQuantity=epoItem.data[0].DealQuantity;
        Promise.resolve(this.service.getCuttingOut({ filter: JSON.stringify({ EPOItemId: this.data.EPOItemId}) }))
                    .then(result => {
                        if(result.data.length>0){
                            for(var cuttingOutHeader of result.data){
                                for(var cuttingOutItem of cuttingOutHeader.Items){
                                    for(var cuttingOutDetail of cuttingOutItem.Details){
                                        this.data.PlanPORemainingQuantity-=cuttingOutDetail.CuttingOutQuantity;
                                    }
                                }
                            }
                        }
                        
                    });
        if (this.data) {
            this.selectedCuttingIn = {
                RONo: this.data.RONo,
                PO_SerialNumber:this.data.POSerialNumber
            };
        
        }
        for(var a of this.data.Items){
            for(var b of a.Details){
                if(b.RemainingQuantity != b.CuttingOutQuantity){
                    this.deleteCallback = null;
                    break;
                }
            }
        }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    // editCallback(event) {
    //     this.router.navigateToRoute('edit', { id: this.data.Id });
    // }

    // deleteCallback(event) {
    //     if (confirm(`Hapus ${this.data.CutOutNo}?`))
    //         this.service.delete(this.data)
    //             .then(result => {
    //                 this.cancelCallback();
    //             })
    //             .catch(e => {
    //                 this.error = e;
    //                 if (typeof (this.error) == "string") {
    //                     alert(this.error);
    //                 } else {
    //                     alert("Missing Some Data");
    //                 }
    //             })
    // }
}