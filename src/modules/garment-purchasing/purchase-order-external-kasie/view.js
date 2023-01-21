import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, ServiceFinance } from './service';

@inject(Router, Service, ServiceFinance)
export class View {
    hasCancel = true;
    hasEdit = false;
    hasDelete = false;
    hasCancelPo = false;
    hasUnpost = false;
    hasClosePo = false;

    constructor(router, service, serviceFinance) {
        this.router = router;
        this.service = service;
        this.serviceFinance = serviceFinance;
    }
    async activate(params) {
        var isVoid = false;
        var isArriving = false;
        var id = params.id;
        this.poExId = id;
        this.data = await this.service.getById(id);
        this.isVBWithPO = await this.serviceFinance.getVbWithPO(id);
        var kurs = await this.service.getKurs(this.data.Currency.Code, new Date(this.data.OrderDate).toLocaleDateString());
        this.kurs=kurs[0];

        var isUsedSJ=false;
        for(var item of this.data.Items){
            if(item.DOQuantity>0){
                isUsedSJ=true;break;
            }
        }
        var canClose=false;
        for(var item of this.data.Items){
            if(item.DOQuantity>0 && item.DOQuantity<item.DealQuantity){
                canClose=true;break;
            }
        }

        if(this.data.Currency){
            this.selectedCurrency=this.data.Currency;
        }

        if(this.data.Supplier){
            this.selectedSupplier=this.data.Supplier;
        }

        if(this.data.IncomeTax){
            this.selectedIncomeTax=this.data.IncomeTax;
            this.data.IncomeTaxRate= this.data.IncomeTax.Rate;
        }

        if(this.data.Vat){
            this.selectedVatTax=this.data.Vat;
            console.log(this.data.Vat);
        }

        if (!this.data.IsPosted && !this.data.IsApproved) {
            this.hasDelete = true;
            this.hasEdit = true;
        }
        if (this.data.IsPosted && !isUsedSJ) {
            this.hasCancelPo = true;
            this.hasUnpost = true;
        }
        if (this.data.IsPosted==true && this.data.IsClosed==false && canClose && this.data.IsCanceled==false){
            this.hasClosePo=true;
        }
        if (this.data.IsCanceled || this.data.IsClosed || this.data.IsUnpost || this.isVBWithPO || this.data.IsApproved) {
            this.hasUnpost = false;
            this.hasCancelPo = false;
        }

        if(this.data.Supplier){
            this.selectedSupplier=this.data.Supplier;
            this.data.SupplierId=this.data.Supplier.Id;
            this.data.Supplier.usevat=this.data.IsUseVat ;
           
            if(this.data.IsIncomeTax){
                this.data.Supplier.usetax=true;
            }
            
        }
    }

    cancel(event) {
        var r = confirm("Apakah Anda yakin akan keluar?")
        if (r == true) {
            this.router.navigateToRoute('list');
        }
        // this.router.navigateToRoute('list');
    }

    edit(event) {
        var r = confirm("Apakah Anda yakin akan mengubah data ini?");
        if (r == true) {
            this.router.navigateToRoute('edit', { id: this.data.Id });
        }
        // this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    delete(event) {
        var r = confirm("Apakah Anda yakin akan menghapus data ini?");
        if (r == true) {
            this.service.delete(this.data).then(result => {
                this.cancel();
            });
        } 
        
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
