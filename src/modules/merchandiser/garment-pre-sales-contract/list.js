import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import { activationStrategy } from 'aurelia-router';
import { AuthService } from "aurelia-authentication";

import moment from 'moment';
@inject(Router, Service, AuthService)
export class List {
    dataToBePosted = [];
    context = ["Rincian"];
    options = {};
    columns = [
        {
            field: "isPosting", title: "Post", checkbox: true, sortable: false,
            formatter: function (value, data, index) {
              this.checkboxEnabled = !data.IsPosted && data.byUser;
              return ""
            }
        },
        { field: "SCNo", title: "No Sales Contract" },
        { field: "SCDate", title: "Tgl. Sales Contract", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "SCType", title: "Jenis Sales Contract" },
        { field: "BuyerAgentName", title: "Buyer Agent"},
        { field: "BuyerBrandName", title: "Buyer Brand"},
        { field: "OrderQuantity", title: "Jumlah Order" }
    ];

    rowFormatter(data, index) {
        if (data.IsPosted)
          return { classes: "success" }
        else
          return {}
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
                return {
                    total: result.info.total,
                    data: result.data.map(d => Object.assign(d, { byUser: this.byUser }))
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
        }
    }

    attached() {
        this.options.height = $(window).height() - $('nav.navbar').height() - $('h1.page-header').height();
    }

    create() {
        this.router.navigateToRoute('create');
    }

    posting() {
        if (this.dataToBePosted.length > 0) {
          this.service.post(this.dataToBePosted.map(d => d.Id))
            .then(result => {
              this.table.refresh();
            }).catch(e => {
              this.error = e;
            })
        }
      }
}