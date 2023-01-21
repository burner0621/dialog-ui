import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Edit {
    hasCancel = true;
    hasSave = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        this.error = {};
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.selectedSection = { Code:this.data.SectionCode, Name:this.data.SectionName,};
        this.selectedBuyer = { Code:this.data.BuyerCode, Name:this.data.BuyerName,};
    }

    cancel(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    save(event) {
        this.data.isUpdate=true;
        this.service.update(this.data).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        });

        // var conf=false;
        // if(this.data.items){
        //     for(var a of this.data.items){
        //         if(a.isConfirmed){
        //             conf=true;
        //             break;
        //         }
        //     }
        // }
        // if(conf){
        //     var today=new Date();
        //     var a = new Date(this.data.deliveryDate);
        //     var b = today;
        //     var diff=a.getTime() - b.getTime();
        //     var timeDiff = Math.abs(a.getTime() - b.getTime());
        //     var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        //     if(diff>=0){
        //         if(diffDays>=0 && diffDays<=45){
        //             if (confirm('Tanggal Confirm <= 45 hari ('+diffDays+' hari) dari Tanggal Pengiriman. Tetap Confirm?')) {
        //                 this.service.update(this.data)
        //                     .then(result => {
        //                         alert("Data Confirmed");
        //                         this.cancel();
        //                     }).catch(e => {
        //                         this.error = e;
        //                     });
        //             } else {
        //                 this.cancel();
        //             }
        //         }
        //         else{
        //             this.service.update(this.data).then(result => {
        //                 this.cancel();
        //             }).catch(e => {
        //                 this.error = e;
        //             })
        //         }
        //     }
        //     else if(diff<0){
        //         alert("Tanggal Pengiriman sudah lewat.");
        //     }
        // }
        // else{
        //     this.service.update(this.data).then(result => {
        //         this.cancel();
        //     }).catch(e => {
        //         this.error = e;
        //     })
        // }
    }
}