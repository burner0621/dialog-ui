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
        this.checkedAll = false;
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
        this.data.SampleCuttingDate = null;
        this.data.SampleSewingDate = null;
        if (this.data.Items) {
            for (var item of this.data.Items) {
                if (item.IsSave) {
                    if (this.data.SampleAvalComponentType == "CUTTING" && (this.data.SampleCuttingDate == null || this.data.SampleCuttingDate < item.SampleCuttingDate))
                        this.data.SampleCuttingDate = item.SampleCuttingDate;
                    if (this.data.SampleAvalComponentType == "SEWING" && (this.data.SampleSewingDate == null || this.data.SampleSewingDate < item.SampleSewingDate))
                        this.data.SampleSewingDate = item.SampleSewingDate;
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
            })
    }
}