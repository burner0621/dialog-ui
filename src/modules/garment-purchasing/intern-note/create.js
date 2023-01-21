import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
export class Create {
    hasCancel = true;
    hasSave = true;
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
    }

    activate(params) {

    }

    cancel(event) {
        if (confirm(`Apakah Anda yakin akan kembali?`))
            this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    bind() {
        this.error = {};
        this.data.isView = false;
    }

    save() 
    {
        for(var item of this.data.items)
        {
            for(var detail of item.details)
            {
                for(var doItem of detail.deliveryOrder.items)
                {
                    doItem.fulfillments=[];
                }
            }
        }

        //Enhance Jason Sept 2021
        //var validateDouble = this.validateDouble(this.data);
        var validateDouble = 0; //Use Backend Validation
        if(validateDouble == 0)
        {
            this.service.create(this.data)
            .then(result => 
                {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
            })
            .catch(e =>
                 {
                if (e.statusCode === 500) 
                {
                    alert("Gagal menyimpan, silakan coba lagi!");
                } else 
                {
                    this.error = e;
                }
            })
        }
    }

    //Enhance Jason Sept 2021
    validateDouble(valid)
    {
        var arrNo = [];
        var errCounter = 0;
        for(var data of valid.items)
        {
            arrNo.push(data.garmentInvoice.invoiceNo);
        }

        arrNo.forEach((v,i,a) => 
        {
            if(a.indexOf(v) != i)
            {
                errCounter++;
                alert("Terdapat Duplikasi Nomor Invoice " + a[i] + ". Mohon Menghapus Salah Satu Data Duplikat");
            }
        })
        return errCounter;
    }
}
