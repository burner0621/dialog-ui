import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import { activationStrategy } from 'aurelia-router';
import { AuthService } from "aurelia-authentication";

import SectionLoader from "../../../loader/garment-sections-loader";

import moment from 'moment';
@inject(Router, Service, AuthService)
export class List {
    @bindable section;

    context = ["Rincian"];
    columns = [
        { field: "SCNo", title: "No Sales Contract" },
        { field: "PRNo", title: "No PR" },
        { field: "PRType", title: "Jenis PR" },
        { field: "RONo", title: "NO Ro" },
        {
            field: "Date", title: "Tanggal PR", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "BuyerCode", title: "Kode Buyer" },
        { field: "BuyerName", title: "Nama Buyer" },
        { field: "Article", title: "ARtikel" },
        {
            field: "ShipmentDate", title: "Tgl. Shipment", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "SectionName", title: "Penanggung Jawab Seksi" },
        { field: "CreatedBy", title: "Staf Merchandiser" },    
    ];

    controlOptions = {
        label: {
            length: 1
        },
        control: {
            length: 3
        }
    }

    rowFormatter = () => {
        return {};
    }

    loader = (info) => {
        let order = {};

        if (info.sort) {
            order[info.sort] = info.order;
        }

        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            filter: JSON.stringify(this.filter)
        }
        return this.service.search(arg)
            .then(result => {
                result.data.forEach(data => {
                    data.BuyerCode = data.Buyer.Code;
                    data.BuyerName = data.Buyer.Name;
                });
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    get sectionLoader() {
        return SectionLoader;
    }

    get sectionVisibility() {
        return this.type == 'Purchasing' || this.type == 'MD2';
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

    defaultFilter = {
        IsPosted: true,
        "PRType == \"MASTER\" || PRType == \"SAMPLE\"": true
    }

    get filter() {
        let filter = {};
        switch (this.type) {
            case "MD1":
                filter = Object.assign({
                    IsValidatedMD1: false,
                    IsValidated: false,                    
                    ApprovalPR: this.section.ApprovalCC
                }, this.defaultFilter);
                break;
            case "Purchasing":
                filter = Object.assign({
                    IsValidatedMD1: true,
                    IsValidatedPurchasing: false,
                }, this.defaultFilter);
                if (this.section) {
                    filter.SectionName = this.section.Name;
                }
                break;
            case "MD2":
                filter = Object.assign({
                    IsValidatedMD1: true,
                    IsValidatedPurchasing: true,
                    IsValidatedMD2: false,
                    ApprovalKadiv: this.section.ApprovalKadiv
                }, this.defaultFilter);
                if (this.section) {
                    filter.SectionName = this.section.Name;
                }
                break;
        }

        return filter;
    }

    activate(params, routeConfig, navigationInstruction) {
        const instruction = navigationInstruction.getAllInstructions()[0];
        const parentInstruction = instruction.parentInstruction;
        this.title = parentInstruction.config.title;
        this.type = parentInstruction.config.settings.type;

        let username = null;
        if (this.authService.authenticated) {
            const me = this.authService.getTokenPayload();
            username = me.username;
        }

        switch (this.type) {
            case "MD1":
                this.section = { ApprovalCC: username };
                break;
            case "Purchasing":
                this.section = null;
                break;
            case "MD2":
                this.section = { ApprovalKadiv: username };
                break;
        }
    }

    sectionChanged() {
        if (this.table) {
            this.table.refresh();
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
}