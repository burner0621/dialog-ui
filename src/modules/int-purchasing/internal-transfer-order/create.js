import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import {activationStrategy} from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class Create {
    hasCancel = true;
    hasSave = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        this.data = {};
        this.error = {};
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
        this.data.CategoryCode=this.data.CategoryCode?this.data.CategoryCode:"";
        this.data.CategoryId=this.data.CategoryId?this.data.CategoryId:"";
        this.data.CategoryName=this.data.CategoryName ?this.data.CategoryName :"";
        this.data.ITONo=this.data.ITONo?this.data.ITONo:"";
        this.data.Id=this.data.Id?this.data.Id:0;
        this.data.TRId=this.data.TRId?this.data.TRId:0;
        this.data.TRNo=this.data.TRNo?this.data.TRNo:"";
        this.data.UnitId=this.data.UnitId?this.data.UnitId:""; 
        this.data.Remarks=this.data.Remarks?this.data.Remarks:"";
        this.data.RequestedArrivalDate = moment(this.data.RequestedArrivalDate).format("DD MMM YYYY HH:mm");
        this.data.TRDate =moment(this.data.TRDate).format("DD MMM YYYY HH:mm");
        this.data.UnitCode=this.data.UnitCode?this.data.UnitCode:"";
        this.data.UnitName=this.data.UnitName?this.data.UnitName:"";
        this.data.DivisionCode=this.data.DivisionCode?this.data.DivisionCode:"";
        this.data.DivisionId=this.data.DivisionId?this.data.DivisionId:"";
        this.data.DivisionName=this.data.DivisionName?this.data.DivisionName:"";
        this.data.IsPost=this.data.IsPost?this.data.IsPost:false; 
        // console.log(this.data);
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