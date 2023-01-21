import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, CoreService } from './service';

@inject(Router, Service, CoreService)
export class Edit {
    isEdit = true;

    constructor(router, service, coreService) {
        this.router = router;
        this.service = service;
        this.coreService = coreService;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.error = {};
        var idx=0;
        if(this.data.measurements){
            this.data.measurementsTemp = [];
            for(var i of this.data.measurements){
                i.MeasurementIndex=idx;
                idx++;
                this.data.measurementsTemp.push(i);
            }
        }

        if (this.data.items) {
            for (const item of this.data.items) {
                item.buyerAgent = this.data.buyerAgent;
                item.section = this.data.section;
            }
        }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: this.data.id });
    }

    saveCallback(event) {
        if (this.data.items && this.data.items[0]) {
            this.data.buyerAgent = this.data.items[0].buyerAgent;
            this.data.section = this.data.items[0].section;
        }
        this.service.update(this.data)
            .then(result => {
                this.router.navigateToRoute('view', { id: this.data.id });
            })
            .catch(error => {
                this.error = error;

                let errorNotif = "";
                if (error.InvoiceType || error.Type || error.Date || error.ItemsCount || error.Items) {
                    errorNotif += "Tab DESCRIPTION ada kesalahan pengisian.\n"
                }
                if (error.GrossWeight || error.NettWeight || error.totalCartons || error.SayUnit || error.MeasurementsCount || error.Measurements) {
                    errorNotif += "Tab DETAIL MEASUREMENT ada kesalahan pengisian.\n"
                }
                if (error.ShippingMark || error.SideMark || error.Remark) {
                    errorNotif += "Tab SHIPPING MARK - SIDE MARK - REMARK ada kesalahan pengisian."
                }

                if (errorNotif) {
                    alert(errorNotif);
                }
            })
    }
}
