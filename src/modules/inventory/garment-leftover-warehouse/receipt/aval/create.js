import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

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
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    saveCallback(event) {
        var Items=[];
        var dataSave=this.data;
        if(this.data.AvalType=="AVAL FABRIC"){
            for(var item of this.data.ROList){
                var saved= item.FabricItems.find(a=>a.IsSave==true);
                if(!saved){
                    var notItem={};
                    notItem.RONo="error";
                    Items.push(notItem);
                }
                for(var detail of item.FabricItems){
                    var itemSave={};
                    if(detail.IsSave){
                        itemSave.RONo=item.RONo;
                        itemSave.Product=detail.Product;
                        itemSave.ProductRemark=detail.ProductRemark;
                        itemSave.Quantity=detail.Quantity;
                        itemSave.Uom=detail.Uom;
                        itemSave.GarmentAvalProductId=detail.GarmentAvalProductId;
                        itemSave.GarmentAvalProductItemId=detail.GarmentAvalProductItemId;
                        Items.push(itemSave);
                    }
                }
            }
            dataSave.Items= Items;
        }

      
        this.service.create(dataSave)
            .then(result => {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(error => {
                this.error = error;
            });
    }
}