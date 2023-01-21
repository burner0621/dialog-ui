 import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
export class Create {
    hasCancel = true;
    hasSave = true;
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
    }

    bind() {
        this.data = { Items: [] };
        this.error = {};
    }

    cancel(event) {
        if (confirm(`Apakah Anda yakin akan kembali?`))
            this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    save() {
        this.data.ReceiptDate = new Date(new Date().setHours(0, 0, 0, 0));
        if(this.data.URNType=="PROSES"){
            this.data.Items=[];
            for(var a of this.data.DRItems){
                this.data.Items.push(a);
            }
        }
        else if(this.data.URNType=="SISA SUBCON"){
            for(var a of this.data.Items){
                a.ReceiptQuantity=a.SmallQuantity;
            }
        }
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
