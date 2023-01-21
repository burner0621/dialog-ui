import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import {activationStrategy} from 'aurelia-router';

@inject(Router, Service)
export class Create {
    hasCancel = true;
    hasSave = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    activate(params) {

    }
    bind() {
        this.data = {};
        this.error = {};
        this.booking = {};
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    save(event) {
        // var bookItems=[];
        // for(var book of this.data.booking){
        //     var item={
        //         ComodityId:book.ComodityId,
        //         ComodityCode:book.ComodityCode,
        //         ComodityName:book.ComodityName,
        //         ConfirmQuantity:book.ConfirmQuantity,
        //         DeliveryDate:book.DeliveryDate,"ConfirmDate":"2019-02-25T01:47:03.047+00:00","Remark":"aa","IsCanceled":false,"CanceledDate":"0001-01-01T00:00:00+00:00",
        //         "Id":43,
        //         "IsDeleted":false
        //     }
        // }
        this.data.BookingItems=(JSON.stringify(this.data.booking));
        if(!this.data.BookingOrderId){
            this.data.BookingOrderId=0;
        }
        this.service.create(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create',{}, { replace: true, trigger: true });
            })
            .catch(e => {
                this.error = e;
            })
    }
}