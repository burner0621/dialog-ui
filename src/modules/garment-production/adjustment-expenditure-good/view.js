import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.isView= true;
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.read(id);
        this.selectedRO=this.data.RONo;
        
        this.selectedUnit=this.data.Unit;
        
        this.editCallback = null;

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
                    duplicate.RemainingQuantity+=item.Quantity;
                    items[idx]=duplicate;
                }else{
                    items.push(item);
                }
            }
            if(item.ReturQuantity>0){
                this.deleteCallback=null;
            }
        }
        this.data.Items=items;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    deleteCallback(event) {
        // if (confirm(`Hapus ${this.data.CutInNo}?`))
            this.service.delete(this.data)
                .then(result => {
                    alert(`delete data success`);
                    this.cancelCallback();
                })
                .catch(e => {
                    this.error = e;
                })
    }
}