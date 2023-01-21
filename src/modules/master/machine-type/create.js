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

    bind() {
      this.data = { Indicators: [] };
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    saveCallback(event) {
        for (var d of this.data.Indicators) {
            if (d.dataType == "numeric") {
                if (d.DefaultValue == "" || !d.DefaultValue || d.DefaultValue == 0) {
                    d.DefaultValue = 0;
                }
            }

        }

        this.service.create(this.data)
            .then(result => {
                this.router.navigateToRoute('list');
            })
            .catch(e => {
                this.error = e;
            })

    }
}
