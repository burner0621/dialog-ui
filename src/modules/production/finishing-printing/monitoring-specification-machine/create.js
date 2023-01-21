import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
export class Create {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = { "import": true };

    }

    activate(params) {

    }

    list() {

        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    save() {
        // var hours = new Date(this.data.time).getHours() ? new Date(this.data.time).getHours() : "";
        // var minutes = new Date(this.data.time).getMinutes() ? new Date(this.data.time).getMinutes() : "";
        // var date = this.data.date.toString();

        // var dateTime = date + ":" + hours + ":" + "" + minutes;

        // this.data.time = new Date(dateTime);
        // this.data.date = new Date(this.data.date);

        // this.data.time = this.data.date;
        var date = new Date(this.data.DateTimeInput);
        this.data.DateTimeInput = date;

        this.service.create(this.data)
            .then(result => {
                
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(e => {
                
                if (e.statusCode == 500) {
                    alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
                } else {
                    this.error = e;
                }
            })
    }

}