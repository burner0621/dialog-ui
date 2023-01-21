import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    isEdit=true;
    async activate(params) {
        let id = params.id;
        this.data = await this.service.read(id);

        if (this.data) {
            this.selectedRO={
                RONo:this.data.RONo
            };
            this.selectedUnitTo=this.data.UnitTo;
            this.selectedUnit=this.data.Unit;
            this.selectedFinishingTo=this.data.FinishingTo;
            
            let priceResult= await this.service.getComodityPrice({ filter: JSON.stringify({ ComodityId: this.data.Comodity.Id, UnitId: this.data.Unit.Id , IsValid:true})});
            if(priceResult.data.length>0){
                this.data.Price= priceResult.data[0].Price;
            }
            else{
                this.data.Price=0;
            }

            for(var a of this.data.Items){
                var FinishingIn=await this.service.GetFinishingInById(a.FinishingInId );
                var finishIn= FinishingIn.Items.find(x=>x.Id==a.FinishingInItemId);
                if(finishIn){
                    a.FinishingInQuantity=a.Quantity + finishIn.RemainingQuantity;
                    if(this.data.IsDifferentSize){
                        a.Quantity+= finishIn.RemainingQuantity;
                    }
                }
            }
        }
    }

    bind() {
        this.error = {};
        this.checkedAll = true;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    saveCallback(event) {
        if(this.data && this.data.IsDifferentSize){
            if(this.data.Items){
                for(var item of this.data.Items){
                    if(item.IsSave){
                        item.TotalQuantity=0;
                        for(var detail of item.Details){
                            item.TotalQuantity += detail.Quantity;
                            detail.Uom=item.Uom;
                        }
                        item.RemainingQuantity=item.TotalQuantity;
                        item.Price=(item.BasicPrice + (this.data.Price * 50/100)) * item.TotalQuantity;
                    }
                }
            }
        }
        else if(this.data&& !this.data.IsDifferentSize){
            if(this.data.Items){
                for(var item of this.data.Items){
                    if(item.IsSave){
                        item.RemainingQuantity=item.Quantity;
                        item.Price=(item.BasicPrice + (this.data.Price * 50/100)) * item.Quantity;
                    }
                }
            }
        }
        this.service.update(this.data)
            .then(result => {
                this.cancelCallback();
            })
            .catch(e => {
                this.error = e;
            })
    }
}