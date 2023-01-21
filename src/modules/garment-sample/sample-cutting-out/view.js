import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    isView = true;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.read(id);
        if (this.data) {
            this.selectedCuttingIn = {
                RONo: this.data.RONo
            };

            this.selectedUnit=this.data.Unit;
            this.selectedUnitFrom=this.data.UnitFrom;

            var filter = {};
            filter={
                CuttingOutNo:this.data.CutOutNo
            };
            var sewIn= await this.service.getSewingIn({ filter: JSON.stringify(filter),size:1});
        
            if(sewIn.data.length>0){
                for(var a of sewIn.data[0].Items){
                    if(a.RemainingQuantity!=a.Quantity){
                        this.deleteCallback = null;
                        break;
                    }
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

    deleteCallback(event) {
        if (confirm(`Hapus ${this.data.CutOutNo}?`))
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