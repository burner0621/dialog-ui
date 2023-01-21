import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';
import { Dialog } from '../../../au-components/dialog/dialog';
import { Service } from './service';
import PurchasingDispositionExpeditionService from '../shared/purchasing-disposition-expedition-service';
import { PermissionHelper } from '../../../utils/permission-helper';
import { VERIFICATION, CASHIER, RETUR } from '../shared/permission-constants';

@inject(Router, Service, PurchasingDispositionExpeditionService, Dialog, PermissionHelper)
export class List {
    context = ['Hapus'];

    columns = [
        {
            field: "VerifiedDateSend",
            title: "Tanggal Pembelian Kirim",
            formatter: function(value, data, index) {
                return moment.utc(value).local().year() == 1?"-":moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        { field: "DispositionNoteNo", title: "No Disposisi" },
        {
            field: "DispositionNoteDate",
            title: "Tgl Disposisi",
            formatter: function(value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        {
            field: "paymentDueDate",
            title: "Tgl Jatuh Tempo",
            formatter: function(value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        { field: "SupplierName", title: "Supplier" },
        { field: "ProformaNo", title: "No Proforma / Invoice" },
        // { field: "IncomeTax", title: "PPH" },
        // { field: "Vat", title: "PPN" },
        {
            field: "CurrencyTotalPaid",
            title: "Total Bayar ke Supplier",
            formatter: function(value, data, index) {
                return numeral(value).format('0,000.00');
            },
            align: 'right'
        },
        { field: "CurrencyCode", title: "Mata Uang" },
        { field: "Remark", title: "Keterangan" }
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
        // this.roles = [VERIFICATION, CASHIER];
        this.roles = [VERIFICATION, CASHIER,RETUR];
        // this.roles = [VERIFICATION, CASHIER, ACCOUNTING];
        this.accessCount = 0;

        for (let i = this.roles.length - 1; i >= 0; i--) {
            if (this.permissions.hasOwnProperty(this.roles[i].code)) {
                this.roles[i].hasPermission = true;
                this.accessCount++;
                this.activeRole = this.roles[i];
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
            filter: JSON.stringify({ IsPaid: false }),
            position: this.activeRole.position, // VERIFICATION_DIVISION
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