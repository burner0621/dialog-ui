import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class Create {
    isCreate = true;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        this.data = { Items: [] };
        this.error = {};
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
        // return activationStrategy.invokeLifecycle;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    saveCallback(event) {
        if(this.data.SubconCategory=="SUBCON CUTTING SEWING"){
            this.data.UsedQty=this.data.ContractQty-this.data.QtyUsed;
        }
        else{
            this.data.UENId=0;
            //this.data.UsedQty=this.data.ContractQty;
            if(this.data.Items.length>0){
                this.data.UsedQty=this.data.ContractQty-this.data.QtyUsed;
                for(var item of this.data.Items){
                    item.Product={
                        Id:0
                    };
                    item.Uom={
                        Id:0
                    }
                    item.UomOut={
                        Id:0
                    }
                }
            }
        }
        this.service.create(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
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