import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
export class Create {
    constructor(router, service) {
        this.router = router;
        this.service = service;
     
      
    }

    bind() {
        this.data = {};
        this.error = {};
        this.hasCancel=true;
        this.hasSave=true;
        this.isCreate= true;
    }
    activate(params) {

    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
        // return activationStrategy.invokeLifecycle;
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    save(event) {
       
        var total=0;
        for(var i=0;i <this.data.Items.length ;i++)
        {
            console.log(this.data.Items[i].Quantity);
            total=total+ parseFloat( this.data.Items[i].Quantity);
        }
        if(total ===0)
        {
            alert("Jumlah tidak boleh 0 semua");
        }
        else
        {  this.service.create(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(e => {
                this.error = e;
            })

        }
      
    }
}