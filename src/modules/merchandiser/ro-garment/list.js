import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import { activationStrategy } from 'aurelia-router';
import { AuthService } from "aurelia-authentication";

@inject(Router, Service, AuthService)
export class List {
    dataToBePosted = [];
    context = ["Rincian", "Cetak PDF"];
    options = {};
    columns = [
        {
            field: "isPosting", title: "Post", checkbox: true, sortable: false,
            formatter: function (value, data, index) {
                this.checkboxEnabled = !data.IsPosted && data.byUser;
                return "";
            }
        },
        { field: "CostCalculationGarment.RO_Number", title: "No RO" },
        { field: "BrandCode", title: "Kode Buyer" },
        { field: "BrandName", title: "Nama Buyer" },
        { field: "CostCalculationGarment.Article", title: "Artikel" },
        { field: "CostCalculationGarment.UnitName", title: "Unit" },
        { field: "Total", title: "Kuantitas Order" },
        { field: "UOMUnit", title: "Satuan" },
        { field: "CostCalculationGarment.IsValidatedROSample", title: "Approval Sample"
            , formatter: (value) => value === true ? "SUDAH" : "BELUM"},
        { field: "CostCalculationGarment.IsValidatedROMD", title: "Approval Kabag Md"
            , formatter: (value) => value === true ? "SUDAH" : "BELUM"},
    ];

    rowFormatter(data, index) {
        if (data.CostCalculationGarment.IsValidatedROSample && data.CostCalculationGarment.IsValidatedROMD)
            return { classes: "success" }
        else
            return { classes: "danger" }
    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            filter: JSON.stringify(this.filter)
        }

        return this.service.search(arg)
            .then(result => {
                result.data.forEach(data => {
                    data.byUser = this.byUser;
                    data.isPosting = data.IsPosted;
                    data.CostCalculationGarment.UnitName = data.CostCalculationGarment.Unit.Name;
                    data.BrandCode = data.CostCalculationGarment.BuyerBrand.Code;
                    data.BrandName = data.CostCalculationGarment.BuyerBrand.Name;   
                    data.UOMUnit = data.CostCalculationGarment.UOM.Unit; 
                });
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    constructor(router, service, authService) {
        this.service = service;
        this.router = router;
        this.authService = authService;
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    activate(params, routeConfig, navigationInstruction) {
        const instruction = navigationInstruction.getAllInstructions()[0];
        const parentInstruction = instruction.parentInstruction;
        this.byUser = parentInstruction.config.settings.byUser;

        let username = null;
        if (this.authService.authenticated) {
            const me = this.authService.getTokenPayload();
            username = me.username;
        }

        if (this.byUser) {
                this.filter = {
                    CreatedBy: username
                };
        } else {
                this.filter = {};
        }
    }

    get postButtonActive() {
        return this.dataToBePosted.filter(d => d.IsPosted === false).length < 1;
    }

    contextCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
            case "Cetak PDF":
                this.service.getPdfById(data.Id);
                break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            case "Cetak PDF":
                return data.IsPosted;
            default:
                return true;
        }
    }

    attached() {
        this.options.height = $(window).height() - $('nav.navbar').height() - $('h1.page-header').height();
    }

    create() {
        this.router.navigateToRoute('create');
    }

    posting() {
        const unpostedDataToBePosted = this.dataToBePosted.filter(d => d.IsPosted === false);
        if (unpostedDataToBePosted.length > 0) {
            if (confirm(`Post ${unpostedDataToBePosted.length} data?`)) {
                this.service.postRO(unpostedDataToBePosted.map(d => d.Id))
                    .then(result => {
                        this.table.refresh();
                        this.dataToBePosted = [];
                    }).catch(e => {
                        this.error = e;
                    })
            }
        }
    }
}