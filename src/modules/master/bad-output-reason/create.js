import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import { activationStrategy } from 'aurelia-router';


@inject(Router, Service)
export class Create {
    hasCancel = true;
    hasSave = true;
    
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind(){
        this.data = { machines:[] };
        this.error = {};
        this.item = "";
    }

    activate(params) {

    }

    cancel() {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    save(event) {
        if(this.data.MachineDetails.length > 0){
            this.item = "";
            this.service.create(this.data)
                .then(result => {
                    //console.log(result);
                    alert("Data berhasil dibuat");
                    this.router.navigateToRoute('create', {}, {replace:true, trigger:true});
                })
                .catch(e => {
                    this.error = e;
                })
        }else{
            this.item = "machine is required";
        }
    }
}