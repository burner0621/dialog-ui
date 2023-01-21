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
        this.selectedUnit=this.data.Unit;
        this.data.BuyerView= this.data.Buyer.Code + ' - '+ this.data.Buyer.Name;
        this.editCallback=null;

        var items=[];
        for(var item of this.data.Items){
            let finGood= await this.service.getFinishedGoodById(item.FinishedGoodStockId);

            if(finGood.Quantity-item.Quantity<0){
                this.deleteCallback=null;
            }

            if(items.length==0){
                items.push(item);
            }
            else{
                let duplicate= items.find(a=>a.Size.Id==item.Size.Id && a.Uom.Id==item.Uom.Id&& a.Description==item.Description);
                                    
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

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    // editCallback(event) {
    //     this.router.navigateToRoute('edit', { id: this.data.Id });
    // }

    // deleteCallback(event) {
    //     if (confirm(`Hapus ${this.data.ReturNo}?`))
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