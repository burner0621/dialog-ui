import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';
import { Dialog } from '../../../au-components/dialog/dialog';
import { Service } from './service';
import PurchasingDispositionExpeditionService from '../shared/purchasing-disposition-expedition-service';
import { PermissionHelper } from '../../../utils/permission-helper';
import { VERIFICATION, CASHIER, ACCOUNTING } from '../shared/permission-constants';

@inject(Router, Service, PurchasingDispositionExpeditionService, Dialog, PermissionHelper)
export class List {
    context = ['Hapus'];

    columns = [
        { field: "dispositionNo", title: "No Disposisi" },
        {
            field: "dispositionDate",
            title: "Tgl Disposisi",
            formatter: function (value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        {
            field: "paymentDueDate",
            title: "Tgl Jatuh Tempo",
            formatter: function (value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        { field: "supplier.name", title: "Supplier" },
        { field: "proformaNo", title: "No Proforma / Invoice" },
        // { field: "IncomeTax", title: "PPH" },
        // { field: "Vat", title: "PPN" },
        {
            field: "payToSupplier",
            title: "Total Bayar ke Supplier",
            formatter: function (value, data, index) {
                return numeral(value).format('0,000.00');
            },
            align: 'right'
        },
        { field: "currency.code", title: "Mata Uang" },
    ];

    constructor(router, service, purchasingDispositionExpeditionService, dialog, permissionHelper) {
        this.service = service;
        this.purchasingDispositionExpeditionService = purchasingDispositionExpeditionService;
        this.router = router;
        this.dialog = dialog;

        this.permissions = permissionHelper.getUserPermissions();
        this.initPermission();
    }

    initPermission() {
        this.roles = [VERIFICATION, CASHIER];
        // this.roles = [VERIFICATION, CASHIER, ACCOUNTING];
        this.accessCount = 0;

        for (let i = this.roles.length - 1; i >= 0; i--) {

            for (let code of this.roles[i].code) {
                if (this.permissions.hasOwnProperty(code)) {
                    this.roles[i].hasPermission = true;
                    this.accessCount++;
                    this.activeRole = this.roles[i];
                    this.changeRole(this.activeRole);
                }
            }

        }
    }

    changeRole(role) {
        if (role.key !== this.activeRole.key) {
            this.activeRole = role;
            this.tableList.refresh();
        }
    }

    loader = (info) => {
        let order = {};

        if (info.sort)
            order[info.sort] = info.order;
        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            filter: JSON.stringify({ Position: this.activeRole.position, IsPaid: false }), // VERIFICATION_DIVISION
        };

        if (this.activeRole.key === 'CASHIER') {
            let filter = JSON.parse(arg.filter);

            filter.IsPaid = false;
            filter.IsPaidPPH = false;
            arg.filter = JSON.stringify(filter);
        }

        return this.purchasingDispositionExpeditionService.search(arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    contextClickCallback(event) {
        let arg = event.detail;
        let data = arg.data;

        switch (arg.name) {
            case 'Hapus':
                this.dialog.prompt('Apakah anda yakin mau menghapus data ini?', 'Hapus Data Penerimaan Dokumen Disposisi Pembelian')
                    .then(response => {
                        if (response.ok) {
                            this.service.delete(data)
                                .then(result => {
                                    this.tableList.refresh();
                                });
                        }
                    });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create', { role: this.activeRole });
    }
}