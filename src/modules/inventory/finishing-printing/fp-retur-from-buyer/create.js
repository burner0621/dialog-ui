import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

var moment = require('moment');
@inject(Router, Service)
export class Create {
    hasCancel = true;
    hasSave = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        this.data = {};
        this.error = {};
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
        // if(this.data.Date == "undefined")
        //     delete this.data.Date;
        // if(this.data.Date && this.data.Date !== "" )
        //     this.data.Date = moment(this.data.Date).format("YYYY-MM-DD");

        // this.service.create(this.data)
        //     .then((result) => {
        //         alert("Data berhasil dibuat");
        //         this.router.navigateToRoute('create',{}, { replace: true, trigger: true });
        //     })
        //     .catch((e) => {
        //         this.error = e;
        //     })

        console.log(this.data);
    }
}