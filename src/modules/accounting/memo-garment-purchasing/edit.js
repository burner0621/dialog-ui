import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Dialog } from '../../../components/dialog/dialog'

import { Service } from './service';


@inject(Router, Service, Dialog)
export class Edit {

    isEdit = true;

    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
    }

    bind() {
        this.error = {};
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.getById(id);

        console.log('detail', this.data);

        // if (this.data.Status == "POSTED") {
        //     this.hasPosting = false;
        //     this.editCallback = false;
        //     this.deleteCallback = false;
        // } else {
        //     this.hasPosting = true;
        // }

    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    saveCallback(event) {

        console.log('update', this.data);
        this.service.update(this.data)
            .then(result => {
                alert("Data berhasil diupdate");
                // this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
                this.router.navigateToRoute('view', { id: this.data.Id });
            })
            .catch(e => {
                if (e.statusCode == 500) {
                    alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
                } else {
                    this.error = e;
                }
            })
    }


    // get grandTotal() {
    //     let result = 0;
    //     let viewResult=0;
    //     if (this.Items && this.Items.length > 0) {
    //         for (let detail of this.Items) {
    //             if (detail.Select){
    //                 result += detail.TotalPaidPayment;
    //                 viewResult+=(detail.TotalPaidPayment);
    //             }
    //         }
    //     }
    //     this.data.Amount = result;
    //     // if(this.IDR)
    //     //     return viewResult
    //     // else
    //     //     return result;
    // }

    // onCheckAll(event) {
    //     for (var item of this.Items) {
    //         item.Select = event.detail.target.checked;
    //     }
    // }
}
