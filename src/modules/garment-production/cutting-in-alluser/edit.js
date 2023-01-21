import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, SalesService } from './service';

@inject(Router, Service,SalesService)
export class View {
    constructor(router, service,salesService) {
        this.router = router;
        this.service = service;
        this.salesService=salesService;
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.read(id);

        if (this.data) {
            this.selectedPreparing = {
                RONo: this.data.RONo
            };
            
            let noResult = await this.salesService.getCostCalculationByRONo({ size: 1, filter: JSON.stringify({ RO_Number: this.data.RONo }) });
                if(noResult.data.length>0){
                    this.data.Comodity = noResult.data[0].Comodity;
                    //console.log(this.data.Comodity)
                }
            
            let priceResult= await this.service.getComodityPrice({ filter: JSON.stringify({ ComodityId: this.data.Comodity.Id, UnitId: this.data.Unit.Id , IsValid:true})});
            if(priceResult.data.length>0){
                this.data.Price= priceResult.data[0].Price;
                //console.log(this.data.Price)
            }
            else{
                this.data.Price=0;
            }

            for(var item of this.data.Items){
                let preparing=await this.service.readPreparing(item.PreparingId);
                for(var detail of item.Details){
                    detail.ComodityPrice=this.data.Price;
                    var prepItem= preparing.Items.find(a=>a.Id==detail.PreparingItemId);
                    detail.PreparingBasicPrice=prepItem ? prepItem.BasicPrice :0;
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
        this.service.update(this.data)
            .then(result => {
                this.cancelCallback();
            })
            .catch(e => {
                this.error = e;
            })
    }
}