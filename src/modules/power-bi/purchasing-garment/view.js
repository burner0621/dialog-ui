import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
require('powerbi-client');


@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    activate(params) {
        var id = params.id;
        this.service.getById(id)
            .then(data => {
                this.data = data;
                var container = document.getElementById("powerbi-container");
                this.report = powerbi.embed(container, data);
            })
    }

    fullscreen() {
        if (this.report)
            this.report.fullscreen();
    }
    list() {
        this.router.navigateToRoute('list');
    }
}
