import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';

@inject(Router, Service)
export class Create {

    isCreate = true;
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        this.data = { Items: [] };
        this.error = {};
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    saveCallback(event) {
        console.log(this.data);
        this.data.Items = [];
        var same = [];
        if (this.data.DataItems) {
            for (var exGood of this.data.DataItems) {
                var quantity = 0;
                if (exGood.dataDetails) {
                    for (var detail of exGood.dataDetails) {
                        var dataItem = {};
                        dataItem.ExpenditureGoodId = exGood.ExpenditureGoodId;
                        dataItem.ExpenditureGoodNo = exGood.ExpenditureGoodNo;
                        dataItem.RONo = exGood.RONo;
                        dataItem.Article = exGood.Article;
                        dataItem.Comodity = exGood.Comodity;
                        dataItem.Buyer = exGood.Buyer;
                        dataItem.ExpenditureGoodItemId = detail.ExpenditureGoodItemId;
                        dataItem.Quantity = detail.qty;
                        dataItem.LeftoverComodity = detail.LeftoverComodity;
                        dataItem.BasicPrice = detail.BasicPrice;
                        quantity += detail.qty;
                        console.log(quantity)
                        this.data.Items.push(dataItem);
                    }
                    if (quantity != exGood.Quantity) {
                        same += `- ${exGood.ExpenditureGoodNo} \n`;
                    }
                }

            }

        }
        if (same.length > 0) {
            alert(`${same} \n Jumlah total Breakdown belum sama dengan jumlah per bon pengeluaran.`)
        }
        else {
            this.service.create(this.data)
                .then(result => {
                    alert("Data berhasil dibuat");
                    this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
                })
                .catch(error => {
                    this.error = error;
                });
        }

    }
}