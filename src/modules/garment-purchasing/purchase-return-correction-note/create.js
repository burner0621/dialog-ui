import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import {activationStrategy} from 'aurelia-router';

@inject(Router, Service)
export class Create {
    hasCancel = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    
    bind() {
        this.data = { Items: [] };
        this.error = {};
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    saveCallback(event) {
        this.service.create(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
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