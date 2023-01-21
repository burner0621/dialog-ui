import { inject, bindable, computedFrom, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class Create {
    @bindable data = {};

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    saveCallback(event) {
        // this.error = {};
        // var errorCount = 0;
        // if(!this.data.ProcessType || this.data.ProcessType==""){
        //     this.error.ProcessType="Jenis Proses tidak boleh kosong";
        //     errorCount++;
        // }
        // if(!this.data.YarnType || this.data.YarnType=="" && this.data.IsMixDrawing!=true){
        //     this.error.YarnType="Jenis Benang tidak boleh kosong";
        //     errorCount++;
        // }
        // if(!this.data.Count){
        //     this.error.Count="Count tidak boleh kosong";
        //     errorCount++;
        // }
        // if(this.data.ProcessType == "Finish Drawing" && this.data.IsMixDrawing==true && this.data.Items){
        //     this.error.Items="Item tidak boleh kosong";
        //     errorCount++;
        // }
        // if(errorCount==0){
        if (this.data.ProcessType != "Mix Drawing") {
            this.data.MaterialComposition = [];
            var itemDetail = {};
            itemDetail.LotId = this.data.LotId;
            itemDetail.LotNo = this.data.LotNo;
            itemDetail.YarnId = this.data.YarnMaterialTypeId;
            itemDetail.YarnCode = this.data.YarnMaterialTypeCode;
            itemDetail.Composition = 100;
            this.data.MaterialComposition.push(itemDetail);
        }
        this.service.create(this.data)
            .then(result => {
                alert(`create data success`);
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(e => {
                alert("Missing Some Data");
                this.error = e;
            })
        // }
    }
}