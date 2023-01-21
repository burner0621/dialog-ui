import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
    hasCancel = true;
    hasEdit = true;
    hasDelete = true;
    totalData = 0;
    size = 5;
    items = [];

    constructor(router, service) {
        this.router = router;
        this.service = service;

    }

    async activate(params) {
    
        var id = params.id;
        this.data = await this.service.getById(id);
        this.supplier = this.data.supplier;
        this.currency = this.data.currency;
        this.incomeTax={Id:this.data.incomeTaxId,name:this.data.incomeTaxName,rate:this.data.incomeTaxRate};
        this.vatTax={Id:this.data.vatId, Rate:this.data.vatRate};
        
        //this.vat = this.data.vat;
        this.items = this.data.items;
        this.totalData = this.items.length;
        for(var item in this.data.items)
        { 
            //this.data.deliveryOrder.totalAmount=item.totalAmount.toLocaleString('en-EN', { maximumFractionDigits: 2,minimumFractionDigits:2});
        }
        if(this.data.hasInternNote ===true)
        {
            this.hasEdit = false;
            this.hasDelete = false;
        }else
        {
            this.hasEdit = true;
            this.hasDelete = true;
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

        var itemTemp = [];
        for (var i = 0; i < this.size; i++) {
            if (this.items[i] != undefined) {
                itemTemp.push(this.items[i]);
            }
        }
        this.data.items = itemTemp;
        this.items = this.items.slice(itemTemp.length);

        var r = confirm("Apakah Anda yakin akan menghapus data ini?")
        if (r == true) {
            this.service.delete(this.data).then(result => {
                if (this.size < this.totalData) {
                    this.size += this.size;
                    this.delete(event);
                }
                this.cancel();
            });
        }
       
    }
}
