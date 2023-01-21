import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    isEdit=true;
    async activate(params) {
        let id = params.id;
        this.data = await this.service.read(id);

        if(this.data.SampleProducts){
            this.data.SampleProducts.sort(function (a, b) {
                return a.Index - b.Index;
              });
        }
        if(this.data.SampleSpecifications){
            this.data.SampleSpecifications.sort(function (a, b) {
                return a.Index - b.Index;
            });
        }
    }

    bind() {
        this.error = {};
        this.checkedAll = true;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    saveCallback(event) {
        for(var s of this.data.SampleSpecifications){
            if(!s.Uom){
                s.Uom={
                    Id:0,
                    Unit:""
                };
            }
        }
        this.service.update(this.data)
            .then(result => {
                this.cancelCallback();
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