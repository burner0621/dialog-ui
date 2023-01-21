import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import Loader from "../../../../loader/garment-packing-list-loader";

@inject(Router)
export class List {
    controlOptions = {
        label: {
            length: 2
        },
        control: {
            length: 3
        }
    };

    filter = {};

    get loader() {
        return Loader;
    }

    constructor(router) {
        this.router = router;
    }

    copy() {
        if (this.data) {
            this.router.navigateToRoute('copy', { id: this.data.id });
        }
    }
}
