import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import {activationStrategy} from 'aurelia-router';

var moment = require('moment');

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
        this.data = { deliveryOrders: [] };
        this.error = {};
        this.item = "";
    }

    cancel(event) {
        if (confirm(`Apakah Anda yakin akan kembali?`))
            this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; 
        //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
        // return activationStrategy.invokeLifecycle;
    }

    save(event) {
        if (this.data.beacukaiDate == "undefined") {
            delete this.data.beacukaiDate;
        }
        if (this.data.validationDate == "undefined") {
            delete this.data.validationDate;
        }
        if(this.data.beacukaiDate && this.data.beacukaiDate !== "")
            this.data.beacukaiDate = moment(this.data.beacukaiDate).format("YYYY-MM-DD");
        if(this.data.validationDate && this.data.validationDate !== "")
            this.data.validationDate = moment(this.data.validationDate).format("YYYY-MM-DD");
        var dataCustoms = Object.assign({}, this.data);
        var items = [];
      
        var isSelectedData = false;
        if(dataCustoms.deliveryOrders && dataCustoms.deliveryOrders.length > 0){
            this.item = "";
            for(var a of dataCustoms.deliveryOrders){
                if(a && a.selected){
                    var deliveryOrder={};
                    deliveryOrder.doNo=a.doNo;
                    deliveryOrder.Id=a.Id;
                    deliveryOrder.doDate=a.doDate;
                    deliveryOrder.totalAmount=a.totalAmount;
                    deliveryOrder.arrivalDate=a.arrivalDate;
                    items.push({deliveryOrder : deliveryOrder});
                    isSelectedData = true;
                }
                items.quantity=a.quantity;
            }
            dataCustoms.items = items;
        }if(this.data.billNo.includes("BP"))
        {
            dataCustoms.billNo=this.data.billNo;
        }else
        {
            dataCustoms.billNo="";
        }
        
        if(isSelectedData){
            this.service.create(dataCustoms)
                .then(result => {
                    alert("Data berhasil dibuat");
                    this.router.navigateToRoute('create',{}, { replace: true, trigger: true });
                })
                .catch(e => {
                    this.error = e;
                    if(e.deliveryOrders.lenght > 0){
                        var itemErrors = [];
                        for(var a of this.data.deliveryOrders){
                            var error = {};
                            var item = e.deliveryOrders.find(dataItem => dataItem.dOrderNumber === a.no)
                            if(item)
                                error["no"] = item.no;
                            itemErrors.push(error);
                        }
                        this.error.deliveryOrders = itemErrors;
                    }
                })
        }else{
            this.item = "Surat Jalan Harus dipilih";
        }
    }

    // validateData(valid) {
    //     var validateArrTemp = [];
    //     var errors = []
        
    //     for (var data of valid.items) {
    //         var error = {};
    //         var tempValid;

    //         error.deliveryOrderId = "payment method:" + data.details[0].paymentMethod + ", " + "payment type:" + data.details[0].paymentType +" (semua harus sama)";
    //         errors.push(error);
            
    //         tempValid = data.details[0].paymentMethod + data.details[0].paymentType;
    //         if (!(validateArrTemp.find(data => data == tempValid))) {
    //             validateArrTemp.push(tempValid);
    //         }
    //     }

    //     if (validateArrTemp.length > 1) {
    //         this.error.details = errors;
    //         alert(error.deliveryOrderId);
    //         return this.error.details;
    //     } else {
    //         return this.error.details = [];
    //     }

    // }
}