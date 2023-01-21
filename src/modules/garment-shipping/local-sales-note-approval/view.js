import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { RejectDialog } from "../packing-list-approval/template/dialog/reject";
import { Dialog } from "../../../au-components/dialog/dialog";

@inject(Router, Service, Dialog)
export class View {

    constructor(router, service,dialog) {
        this.router = router;
        this.service = service;
        this.dialog=dialog;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
        this.selectedTransactionType = this.data.transactionType;
        
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }


    approve(event) {
        if (confirm("Approve Draft Packing List?")) {
            this.service.approve(this.data).then(result => {
                this.cancel(event);
            });
        }
    }

    reject(event) {
        this.dialog.show(RejectDialog, { title: "Alasan Reject" })
            .then(response => {
                if (!response.wasCancelled) {
                    this.data.rejectedReason=response.output;
                    if(response.output.trim()=="" || response.output==null){
                        alert('Alasan Reject Harus Diisi');
                    }
                    else{
                        this.service.reject(this.data)
                        .then(result => {
                            alert('Nota Penjualan Lokal berhasil diReject');
                            this.cancel(event);
                        })
                        .catch(error => {
                            if (typeof error === 'string') {
                                alert(`Reject dibatalkan : ${error}`);
                            } else {
                                alert(`Error : ${error.message}`);
                            }
                        });
                    }
                    
                }
            });
    }

}
