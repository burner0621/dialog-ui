import { inject, bindable, computedFrom, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class Create {
    @bindable data = {};

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    saveCallback(event) {
        this.data.LotDate = this.data.LotDate ? moment(this.data.LotDate).format("DD MMM YYYY") : null;
        this.service.create(this.data)
            .then(result => {
                alert(`create data success`);
                this.router.navigateToRoute('create',{}, { replace: true, trigger: true }); 
            })
            .catch(e => {
                this.error = e;
                if(typeof(this.error)=="string"){
                    alert(this.error);
                } else {
                    alert("Missing Some Data");
                }
            })
    }

}