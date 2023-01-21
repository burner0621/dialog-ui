import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from '../service';

@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    controlOptions = {
        label: {
            align: "left",
            length: 4
        },
    };

    get loader() {
        const filter = {};
        filter["RONoSample != null"] = true;

        return (keyword) => {

            const info = {
                keyword: keyword,
                filter: JSON.stringify(filter),
                select: "new(Id,RONoSample)"
            };

            return this.service.getROSample(info)
                .then(results => {
                    return results.data;
                });
        };
    }

    copy() {
        if (this.data) {
            this.router.navigateToRoute('copy', { id: this.data.Id });
        }
    }
}
