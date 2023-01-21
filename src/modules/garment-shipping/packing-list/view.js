import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, CoreService } from './service';

@inject(Router, Service, CoreService)
export class View {

    constructor(router, service, coreService) {
        this.router = router;
        this.service = service;
        this.coreService = coreService;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        var idx=0;
        if(this.data.measurements){
            for(var i of this.data.measurements){
                i.MeasurementIndex=idx;
                idx++;
            }
        }
        if(this.data.isUsed){
            // this.editCallback=null;
            this.deleteCallback=null;
        }
        console.log(this.data);
        if(this.data.isSampleDelivered)
        {
            this.hasUnpost = true;
        }

        if (this.data.section) {
            this.selectedSection = await this.coreService.getSectionById(this.data.section.id);
        }
        if(this.data.invoiceType){
            this.selectedInvoiceType= this.data.invoiceType;
        }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data.id });
    }

    deleteCallback(event) {
        if (confirm("Hapus?")) {
            this.service.delete(this.data).then(result => {
                this.cancelCallback();
            });
        }
    }
    unpostCallback(event) {
        if (confirm(`Yakin Unpost Data ini ?`)) {
            var ids = [];
            ids.push(this.data.id)
            console.log(this.data);
            var dataToBeUnPosted = {
                id: ids,
                isSampleDelivered: false
            }
            this.service.unpost(dataToBeUnPosted)
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

}
