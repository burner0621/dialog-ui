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
        this.selectedRO={
            RONo:this.data.RONo
        };
        this.selectedUnitTo=this.data.UnitTo;
        this.selectedUnit=this.data.Unit;
        this.selectedFinishingTo=this.data.FinishingTo;
        for(var a of this.data.Items){
            if(a.RemainingQuantity != a.Quantity){
                this.deleteCallback = null;
                this.editCallback=null;
                break;
            }
        }
        this.editCallback=null;
        if(this.data.FinishingTo=="SEWING"){
            var filter = {};
            filter[`GarmentSewingInItem.Any(FinishingOutItemId.ToString()=="${this.data.Items[0].Id.toString()}")`] = true;
            var sewIn= await this.service.searchSewingIn({ filter: JSON.stringify(filter),size:1});
        
            if(sewIn.data.length>0){
                if(sewIn.data[0].TotalRemainingQuantity!=sewIn.data[0].TotalQuantity){
                    this.deleteCallback = null;
                }
            }
        }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    deleteCallback(event) {
        if (confirm(`Hapus ${this.data.FinishingOutNo}?`))
            this.service.delete(this.data)
                .then(result => {
                    this.cancelCallback();
                })
                .catch(e => {
                    this.error = e;
                    if (typeof (this.error) == "string") {
                        alert(this.error);
                    } else {
                        alert("Missing Some Data");
                    }
                })
    }
}