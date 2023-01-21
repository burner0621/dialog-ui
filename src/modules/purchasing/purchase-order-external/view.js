import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import { Dialog } from '../../../au-components/dialog/dialog';

@inject(Router, Service, Dialog)
export class View {
    hasCancel = true;
    hasEdit = false;
    hasDelete = false;
    hasUnpost = false;
    hasView = true;

    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
    }

    async activate(params) {
        var isVoid = false;
        var isArriving = false;
        var canClose=false;
        var id = params.id;
        this.poExId = id;
        this.data = await this.service.getById(id);
        for(var a of this.data.items){
            for(var b of a.details){
                if(b.doQuantity && b.doQuantity>0 ){
                    isVoid=true;
                }
                if(b.doQuantity && b.doQuantity>0 && b.doQuantity< b.dealQuantity){
                    canClose=true;
                }
                if(b.priceBeforeTax){
                    b.priceBeforeTax=b.priceBeforeTax.toLocaleString('en-EN', { minimumFractionDigits: 4 });
                  }
            }
        }
        
        
        if (!this.data.isPosted) {
            this.hasDelete = true;
            this.hasEdit = true;
        }
        if (this.data.isPosted && !isVoid  && !this.data.isClosed && !this.data.isCanceled) {
            this.hasUnpost = true;
            this.hasCancelPo = true;
        }
        if (this.data.isPosted && !this.data.isClosed &&  canClose) {
            this.hasClosePo = true;
        }

        if(this.data.isClosed || this.data.isCanceled){
            this.hasDelete = false;
            this.hasEdit = false;
            this.hasUnpost = false;
            this.hasClosePo = false;
            this.hasCancelPo = false;
        }

        // if(this.data.IsCreateOnVBRequest){
        //     this.hasUnpost = false;
        // }
        // else{
        //     this.hasUnpost = true;
        // }
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    edit(event) {
        if(confirm('Apakah anda ingin merubah data ini?') == true)
        {
            this.router.navigateToRoute('edit', { id: this.data._id });
        }
    }

    delete(event) {
        this.dialog.prompt('Apakah anda yakin akan menghapus data ini?', 'Hapus Data PO Eksternal')
        .then(response => {
            if (response.ok) {
                this.service.delete(this.data).then(result => {
                    alert("Data berhasil dihapus");
                    this.cancel();
                });
            }
        })
    }

    cancelPO(e) {
        this.service.cancel(this.poExId).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }

    unpostPO(e) {
        this.service.unpost(this.poExId).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }

    closePO(e) {
        this.service.close(this.poExId).then(result => {
            this.cancel();
        }).catch(e => {
            this.error = e;
        })
    }

}
