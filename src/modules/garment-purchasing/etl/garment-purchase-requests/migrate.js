import { inject, bindable, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { activationStrategy } from 'aurelia-router';
var moment = require("moment");

var BuyerLoader = require('../../../../loader/garment-buyers-loader');

@inject(Router, Service)
export class Migrate {
    @bindable error = {};

    yearList = [];

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
        this.totalData = 0;
        this.count = 0;
        this.page = 1;
        this.size = 10;

        this.year = moment().format('YYYY');
        for (var i = parseInt(this.year) + 1; i > 2010; i--) {
            this.yearList.push(i.toString());
        }
    }

    auInputOptions = {
        label: {
            length: 4,
            align: "right"
        },
        control: {
            length: 5
        }
    };

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    tables = ["", "Budget & POrder", "Budget1 & POrder1"];
    monthOpt = ["latest", "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

    activate(params) {
    }

    list() {
        this.router.navigateToRoute('list');
    }

    get buyerLoader(){
        return BuyerLoader;
    }

    cancelCallback(event) {
        this.list();
    }

    ETL() {
        this.data.i = this.page;
        this.data.pageSize = this.size;
        this.service.migrate(this.data)
            .then(result => {
                if (result.processed.length == 0) {
                    alert("tidak ada data");
                } else {
                    this.count += this.size;
                    this.migratedFalse += result.MigratedFalse;
                    if (this.count < this.totalData) {
                        this.page++;
                        this.ETL();
                    }
                    else {
                        alert(this.totalData + " data Ro migration , migration berhasil : " + (this.totalData - this.migratedFalse) + " , migration gagal: " + this.migratedFalse);
                        this.router.navigateToRoute('migrate', {}, { replace: true, trigger: true });
                    }

                }

            })
            .catch(e => {
                this.error = e;
            })
    }

    saveCallback(event) {
        this.service.getDataSql(this.data).then((data) => {
            this.totalData = data;
            this.migratedFalse = 0;
            this.ETL();
        });
    }
}

