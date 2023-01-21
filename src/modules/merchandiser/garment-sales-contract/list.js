import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import { activationStrategy } from 'aurelia-router';
import { AuthService } from "aurelia-authentication";

import moment from 'moment';
@inject(Router, Service, AuthService)
export class List {
    context = ["Rincian", "Cetak PDF"];
    options = {};
    columns = [
        { field: "SalesContractNo", title: "No Sales Contract" },
        { field: "CreatedUtc", title: "Tanggal", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "RONumber", title: "No RO" },
        { field: "BuyerBrandName", title: "Buyer",formatter: function (value, data, index) {
                return data.BuyerBrandCode + " - " + data.BuyerBrandName;
            } },
        { field: "ComodityName", title: "Komoditi" ,formatter: function (value, data, index) {
                return data.ComodityCode + " - " + data.ComodityName;
            }},
        { field: "Article", title: "Artikel" }
    ];

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
    // contextShowCallback(index, name, data) {
    //     switch (name) {
    //         case "Cetak PDF":
    //             return data.DocPrinted;
    //         default:
    //             return true;
    //     }
    // }

    attached() {
        this.options.height = $(window).height() - $('nav.navbar').height() - $('h1.page-header').height();
    }

    create() {
        this.router.navigateToRoute('create');
    }
}