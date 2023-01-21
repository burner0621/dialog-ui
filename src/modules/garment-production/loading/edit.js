import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class Edit {
    isEdit = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.read(id);
        this.selectedUnit=this.data.Unit;

        let priceResult= await this.service.getComodityPrice({ filter: JSON.stringify({ ComodityId: this.data.Comodity.Id, UnitId: this.data.Unit.Id , IsValid:true})});
        if(priceResult.data.length>0){
            this.data.Price= priceResult.data[0].Price;
            //console.log(this.data.Price)
        }
        else{
            this.data.Price=0;
        }

        if(this.data.SewingDOId){
            this.selectedSewingDO= await this.service.getSewingDObyId(this.data.SewingDOId);
            this.data.SewingDODate=this.selectedSewingDO.SewingDODate;
            for(var a of this.data.Items){
                var same= this.selectedSewingDO.Items.find(b=>b.Id==a.SewingDOItemId);
                if(same){
                    a.SewingDORemainingQuantity=same.RemainingQuantity + a.Quantity;
                }
                a.ComodityPrice=this.data.Price;
            }
        }
    }

    bind() {
        this.error = {};
    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    saveCallback(event) {
        this.service.update(this.data)
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