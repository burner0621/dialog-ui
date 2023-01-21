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

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    saveCallback(event) {
        // this.error = {};
        // var errorCount = 0;
        // if(this.data.Date==null){
        //     this.error.Date="Date tidak boleh kosong";
        //     errorCount++;
        // }
        // if(!this.data.ProcessType || this.data.ProcessType==""){
        //     this.error.ProcessType="Jenis Proses tidak boleh kosong";
        //     errorCount++;
        // }
        // if(!this.data.MaterialTypeId || this.data.MaterialTypeId==""){
        //     this.error.MaterialTypeId="Nama Benang tidak boleh kosong";
        //     errorCount++;
        // }
        // if(!this.data.LotId || this.data.LotId==""){
        //     this.error.LotId="Lot tidak boleh kosong";
        //     errorCount++;
        // }
        // if(!this.data.Shift || this.data.Shift==""){
        //     this.error.Shift="Shift tidak boleh kosong";
        //     errorCount++;
        // }
        // if(!this.data.Group || this.data.Group==""){
        //     this.error.Group="Group tidak boleh kosong";
        //     errorCount++;
        // }
        // if(!this.data.UnitDepartmentId || this.data.UnitDepartmentId){
        //     this.error.UnitDepartmentId="Unit tidak boleh kosong";
        //     errorCount++;
        // }

        // if(errorCount==0){
        this.data.Date = this.data.Date ? moment(this.data.Date).format("DD MMM YYYY") : null;
        this.service.create(this.data)
            .then(result => {
                alert('Data berhasil dibuat');
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(e => {
                this.error = e;
                if (typeof (this.error) == "string") {
                    alert(this.error);
                } else {
                    alert("Missing Some Data");
                }
            });
        // }
    }
}
