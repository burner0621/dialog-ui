import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Edit {
    hasCancel = true;
    hasSave = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        this.error = {};
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.supplier = this.data.supplier;
        this.currency = this.data.currency;
        this.incomeTax={Id:this.data.incomeTaxId,name:this.data.incomeTaxName,rate:this.data.incomeTaxRate};
        this.vat={Id:this.data.vatId, Rate:this.data.vatRate};
        //this.vat = this.data.vat;

        

        this.data.items.map((items) => {
            items.check = true;
        })
        
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.data._id });
    }

    save(event) {
        // console.log(this.data);
        // var itemToBeSaved = this.data.items.filter(function (item) {
        //     return item.check
        // });
        // var _data = Object.assign({}, this.data);
        // _data.items = itemToBeSaved;
        // console.log(_data);
        this.service.update( this.data).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })

    }
}
