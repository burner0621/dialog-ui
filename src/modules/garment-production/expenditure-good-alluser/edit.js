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
            this.selectedUnit=this.data.Unit;
            this.data.BuyerView= this.data.Buyer.Code + ' - '+ this.data.Buyer.Name;
        }

        var items=[];
        for(var item of this.data.Items){
            if(items.length==0){
                items.push(item);
            }
            else{
                let duplicate= items.find(a=>a.Size.Id==item.Size.Id && a.Uom.Id==item.Uom.Id);
                                    
                if(duplicate){
                    var idx= items.indexOf(duplicate);
                    duplicate.Quantity+=item.Quantity;
                    duplicate.StockQuantity+=item.Quantity;
                    items[idx]=duplicate;
                }else{
                    items.push(item);
                }
            }
        }
        this.data.Items=items;
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