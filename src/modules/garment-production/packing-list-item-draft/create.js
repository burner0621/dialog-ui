import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class Create {
    isCreate = true;
    @bindable packingList;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Buat"
    }

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    bind() {
        this.data = { items: [] };
        this.error = {};
    }
    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    saveCallback(event) {
        this.service.create(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.data = { items: [] };
                this.router.navigateToRoute('create',{}, { replace: true, trigger: true });
            })
            .catch(e => {
                this.error = e;
                if (typeof (this.error) == "string") {
                    alert(this.error);
                } else {
                    alert("Missing Some Data");
                }
            })
    }
}