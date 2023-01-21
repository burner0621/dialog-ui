import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import {activationStrategy} from 'aurelia-router';

@inject(Router, Service)
export class Create {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        let now = new Date();
        this.data = {
            Date: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
            ShipmentDate: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        };
        this.error = {};
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
        // return activationStrategy.invokeLifecycle;
    }

    saveCallback(event) {
        this.service.create(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create',{}, { replace: true, trigger: true });
            })
            .catch(e => {
                if (e.statusCode === 500) {
                    alert("Gagal menyimpan, silakan coba lagi!");
                } else {
                    this.error = e;
                }
            })
    }
}