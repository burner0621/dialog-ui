import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import { AuthService } from "aurelia-authentication";
import { activationStrategy } from 'aurelia-router';

var moment = require("moment");

@inject(Router, Service,AuthService)
export class List {

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }
    
    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }

    constructor(router, service,authService) {
        this.service = service;
        this.router = router;
        this.authService=authService;

        this.columns = [
            {field: "CloseDate", title: "Close Date",
                formatter: (value, data) => {
                    return moment(value).format("DD-MMM-YYYY");
                }, sortable: false 
            },
        ];
    }

    filter={};

    edit() {
        this.router.navigateToRoute("edit");
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        
    }


    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
    
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        }
    
        return this.service.search(arg)
          .then(result => {
            return {
                total: result.info.total,
                data: result.data
            }
        });
    }
}