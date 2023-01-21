import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import {activationStrategy} from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class Create {
    hasCancel = true;
    hasSave = true;
    hasCreate = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.isView=false;
    }

    activate(params) {

    }
    
    bind() {
        this.data = { items: [] };
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

    save() {
        if(this.data.Items){
            this.data.Amount=0;
            this.data.IncomeTaxValue=0;
            this.data.IncomeTaxValueView=0;
            this.data.DPP=0;
            this.data.VatValue=0;
            this.data.VatValueView = 0;
            var incomeTaxCalculate = 0;
            var vatCalculate = 0;
            for(var item of this.data.Items){
                // if(item.Details){
                //     for(var detail of item.Details){
                        var pph=0;
                        var pphView=0;
                        var ppn=0;
                        var ppnView =0;
                        if (item.IsIncomeTax) {
                          // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                          // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                          pphView = item.IncomeTaxValueView;
                        }
                        if (item.IsPayIncomeTax) {
                            // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                            // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                            pph = item.IncomeTaxValue;
                        }
                        if (item.IsPayVAT) {
                            // ppn=detail.PriceTotal*0.1;
                            ppn = item.VatValue;
                        }
                        if (item.IsUseVat) {
                            // ppn=detail.PriceTotal*0.1;
                            ppnView = item.VatValueView;
                        }
                        this.data.IncomeTaxValue+=pphView;
                        this.data.IncomeTaxValueView +=pphView;                        
                        this.data.VatValue+=ppnView;
                        this.data.VatValueView+=ppnView;                        
                        this.data.DPP+=item.DPPValue;
                        incomeTaxCalculate +=pph;
                        vatCalculate +=ppn;
                        // if(this.data.IncomeTaxBy=="Supplier"){
                        //     this.data.Amount+=detail.PaidPrice+ppn;
                        // }
                        // else
                        //     this.data.Amount+=detail.PaidPrice+ppn+pph;
                //     }
                // }
            }
            // this.data.Amount =(this.data.DPP+this.data.VatValue+this.data.MiscAmount)-this.data.IncomeTaxValue;
            this.data.Amount = parseFloat((this.data.DPP+vatCalculate+this.data.MiscAmount)-incomeTaxCalculate).toFixed(3);
            // this.data.IncomeTaxValue = this.data.IncomeTaxValueView;
            // this.data.VatValue = this.data.VatValueView;
            
        }
        
        this.service.create(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                console.log(this.data);
                this.router.navigateToRoute('create',{}, { replace: true, trigger: true });
            })
            .catch(e => {
                if (e.statusCode == 500) {
                    alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
                } else {
                    this.error = e;
                }
            })
        // console.log(this.data);
    }
}
