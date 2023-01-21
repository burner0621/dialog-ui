import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';
import { item } from '../../garment-shipping/payment-disposition-recap/template/item';

@inject(Router, Service)
export class Create {
    hasCancel = true;
    hasSave = true;
    isCreate = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    activate(params) {

    }
    bind() {
        this.data = { useIncomeTax: false, useVat: false, items: [] };
        this.error = {};
        this.incometaxdate="";
    }

    cancel(event) {
        if (confirm(`Apakah Anda yakin akan kembali?`))
            this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    save(event) 
    {
        //Enhance Jason Sept 2021
        //var validateDouble = this.validateDouble(this.data);
        var validateDouble = 0; //Use Backend Validation
        var validateErrors = this.validateData(this.data);
        // var itemToBeSaved = this.data.items.filter(function (item) {
        //     return item.check
        // });
        // var _data = Object.assign({}, this.data);
        // _data.items = itemToBeSaved;
        
        if (validateErrors.length == 0 && validateDouble == 0) {
            if(this.data.useIncomeTax && this.data.incomeTaxDate == "undefined")
            {
                this.incometaxdate="Tanggal PPH harus diisi";

            } else {
            this.service.create(this.data)
                .then(result => {
                    alert("Data berhasil dibuat");
                    this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
                    // this.data.no = "";
                    // this.data.items = this.data.items.filter(function (item) {
                    //     return !item.check
                    // });
                    // this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
                    // var supplier = Object.assign({}, this.data.supplier);
                    // this.data = Object.assign({}, { supplier: supplier, supplierId: supplier._id, items: [] });
                })
                .catch(e => {
                    this.error = e;
                })
            }
        }
    }

    //Enhance Jason Sept 2021
    validateDouble(valid)
    {
        var arrDoNo = [];
        var errCounter = 0;
        for(var data of valid.items)
        {
            arrDoNo.push(data.deliveryOrder.doNo);
        }

        arrDoNo.forEach((v,i,a) => 
        {
            if(a.indexOf(v) != i)
            {
                errCounter++;
                alert("Terdapat Duplikasi Nomor Surat Jalan " + a[i] + ". Mohon Menghapus Salah Satu Data Duplikat");
            }
        })
        return errCounter;
    }

    validateData(valid) {
        var validateArrTemp = [];
        var errors = []
        
        for (var data of valid.items) {
            var error = {};
            var tempValid;

            error.deliveryOrderId = "payment method:" + data.details[0].paymentMethod + ", " + "payment type:" + data.details[0].paymentType +" (semua harus sama)";
            errors.push(error);
            
            tempValid = data.details[0].paymentMethod + data.details[0].paymentType;
            if (!(validateArrTemp.find(data => data == tempValid))) {
                validateArrTemp.push(tempValid);
            }
        }

        if (validateArrTemp.length > 1) {
            this.error.details = errors;
            alert(error.deliveryOrderId);
            return this.error.details;
        } else {
            return this.error.details = [];
        }

    }
}
