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
    
    async activate(params) {
        var past = await this.service.search();
        if(past.data.length==0){
            this.data = { };
        }
        else{
            this.data = past.data[0];
        }
    }

    async bind() {
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
                alert("Data berhasil disimpan");
                this.cancelCallback();;
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