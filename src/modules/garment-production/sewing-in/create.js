import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import {activationStrategy} from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class Create {
    hasCancel = true;
    hasSave = true;
    isCreate = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    activate(params) {

    }
    bind() {
        this.data = { Items: [] };
        this.error = {};
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
        // return activationStrategy.invokeLifecycle;
    }

    saveCallback(event) {
        this.data.FinishingDate=null;
        this.data.SewingDate=null;
        if(this.data.SewingFrom=="SEWING"){
            if(this.data.Items){
                for(var item of this.data.Items){
                    if(this.data.SewingDate==null || this.data.SewingDate<item.SewingDate)
                        this.data.SewingDate=item.SewingDate;
                }
            }
        }
        else if(this.data.SewingFrom=="FINISHING"){
            if(this.data.Items){
                for(var item of this.data.Items){
                    if(this.data.FinishingDate==null || this.data.FinishingDate<item.FinishingDate)
                        this.data.FinishingDate=item.FinishingDate;
                }
            }
        }
        this.service.create(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create',{}, { replace: true, trigger: true });
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