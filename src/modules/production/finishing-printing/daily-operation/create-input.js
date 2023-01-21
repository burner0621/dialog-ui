import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import {activationStrategy} from 'aurelia-router';

@inject(Router, Service)
export class CreateInput {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
    }

    activate(params) {

    }

    list() {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; 
        //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
        // return activationStrategy.invokeLifecycle;
    }

    save(event) {
        event.toElement.disabled = true;
        this.data.Type = "input";
        this.service.create(this.data)
            .then(result => {
                this.data = {};
                this.error={};
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create-input', {}, {replace:true, trigger:true});
                // this.list();
            })
            .catch(e => {
                event.toElement.disabled = false;
                this.error = e;
            })
    }
}