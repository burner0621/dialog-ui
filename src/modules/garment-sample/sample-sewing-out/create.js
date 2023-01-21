import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class Create {
    isCreate = true;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        this.data = { Items: [] };
        this.error = {};
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
        // return activationStrategy.invokeLifecycle;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    saveCallback(event) {
        this.data.SewingInDate=null;
        if(this.data && this.data.IsDifferentSize){
            if(this.data.Items){
                for(var item of this.data.Items){
                    if(item.Quantity>0){
                        item.IsSave=true;
                    }
                    else{
                        item.IsSave=false;
                    }
                    if(item.IsSave){
                        item.TotalQuantity=0;
                        if(this.data.SewingInDate==null || this.data.SewingInDate<item.SewingInDate)
                            this.data.SewingInDate=item.SewingInDate;
                        for(var detail of item.Details){
                            item.TotalQuantity += detail.Quantity;
                            detail.Uom=item.Uom;
                        }
                        item.RemainingQuantity=item.TotalQuantity;
                        item.Price=(item.BasicPrice + (item.ComodityPrice * 50/100)) * item.RemainingQuantity;
                        
                    }
                }
            }
        }
        if(this.data&& !this.data.IsDifferentSize){
            if(this.data.Items){
                for(var item of this.data.Items){
                    if(item.Quantity>0){
                        item.IsSave=true;
                    }
                    else{
                        item.IsSave=false;
                    }
                    if(item.IsSave){
                        if(this.data.SewingInDate==null || this.data.SewingInDate<item.SewingInDate)
                            this.data.SewingInDate=item.SewingInDate;
                        item.RemainingQuantity=item.Quantity;
                        item.Price=(item.BasicPrice + (item.ComodityPrice * 50/100)) * item.Quantity;
                    }
                }
            }
        }
        this.service.create(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
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