import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import { activationStrategy } from 'aurelia-router';
import { AuthService } from "aurelia-authentication";

@inject(Router, Service, AuthService)
export class List {
    dataToBePosted = [];
    context = ["Detail", "Cetak Cost Calculation", "Cetak Budget", "Cetak Cost Calculation (DRAFT)", "Cetak Budget (DRAFT)"];
    options = {};
    columns = [
        {
            field: "isPosting", title: "Post", checkbox: true, sortable: false,
            formatter: function (value, data, index) {
                this.checkboxEnabled = !data.IsPosted && data.byUser;
                return "";
            }
        },
        { field: "PreSCNo", title: "No Sales Contract" },
        { field: "RO_Number", title: "No RO" },
        { field: "Article", title: "Artikel" },
        { field: "UnitName", title: "Unit" },
        { field: "Quantity", title: "Kuantitas" },
        { field: "ConfirmPrice", title: "Harga Konfirmasi" },
        { field: "IsApprovedMD", title: "Approval Kabag Md" },
        { field: "IsApprovedIE", title: "Approval IE" },
        { field: "IsApprovedPurchasing", title: "Approval Purchasing" },
        { field: "IsApprovedKadivMD", title: "Approval Kadiv Md" },
    ];

    rowFormatter(data, index) {
        if (data.ApprovalMD.IsApproved && data.ApprovalPurchasing.IsApproved && data.ApprovalIE.IsApproved && data.ApprovalKadivMD.IsApproved)
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
                result.data.map(data => {
                    data.byUser = this.byUser;
                    data.isPosting = data.IsPosted;
                    data.IsApprovedMD = data.ApprovalMD.IsApproved ? "SUDAH" : "BELUM";
                    data.IsApprovedIE = data.ApprovalIE.IsApproved ? "SUDAH" : "BELUM";
                    data.IsApprovedPurchasing = data.ApprovalPurchasing.IsApproved ? "SUDAH" : "BELUM";
                    data.IsApprovedKadivMD = data.ApprovalKadivMD.IsApproved ? "SUDAH" : "BELUM";
                    return data;
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
            case "Detail":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
            case "Cetak Cost Calculation":
            case "Cetak Cost Calculation (DRAFT)":
                this.service.getPdfById(data.Id)
                break;
            case "Cetak Budget":
            case "Cetak Budget (DRAFT)":
                this.service.getBudgetById(data.Id)
                break;
        }
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            case "Cetak Cost Calculation":
            case "Cetak Budget":
                return data.IsPosted;
            case "Cetak Cost Calculation (DRAFT)":
            case "Cetak Budget (DRAFT)":
                return !data.IsPosted;
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
                this.service.postCC(unpostedDataToBePosted.map(d => d.Id))
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