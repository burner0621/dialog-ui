import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


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

    cancelCallback(event) {
      this.list();
    }

    saveCallback(event) {
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
