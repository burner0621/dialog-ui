import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';
import { Dialog } from '../../../au-components/dialog/dialog';
import { Service } from './service';
import VBWithPORequestService from '../shared/vb-with-po-request-service';
import VBNonPORequestService from '../shared/vb-non-po-request-service';
import { PermissionHelper } from '../../../utils/permission-helper';
import { PO, NONPO } from '../shared/permission-constants';

import { AlertView } from './custom-dialog-view/alert-view';

@inject(Router, Service, VBWithPORequestService, VBNonPORequestService, Dialog, PermissionHelper)
export class List {
    // context = ['Hapus'];

    columns = [{
        field: "toBeCancelled",
        title: "toBeCancelled Checkbox",
        checkbox: true,
        sortable: false,
        formatter: function (value, data, index) {
            this.checkboxEnabled = !data.IsRealized;
            return ""
        }
    },
    {
        field: "ApprovalDate",
        title: "Tanggal Approval",
        formatter: function (value, data, index) {
            return moment.utc(value).local().format('DD MMM YYYY');
        },
    },
    { field: "DocumentNo", title: "No VB" },
    {
        field: "Date",
        title: "Tgl VB",
        formatter: function (value, data, index) {
            return moment.utc(value).local().format('DD MMM YYYY');
        },
    },
    {
        field: "Amount",
        title: "VB Uang",
        formatter: function (value, data, index) {
            return numeral(value).format('0,000.00');
        },
        align: "right"
    },
    { field: "CurrencyCode", title: "Mata Uang" },
    { field: "CreatedBy", title: "Pemohon" },
    { field: "SuppliantUnitName", title: "Unit" },
    { field: "ApprovedBy", title: "Approved By" }
    ];

    async activate(params) {

        if (params && params.role) {
            params.role.position = parseInt(params.role.position);
            params.role.hasPermission = true;
            params.role.positionAutocomplete = parseInt(params.role.positionAutocomplete);
            this.activeRole = params.role;
        }

    }

    constructor(router, service, vbWithPORequestService, vbNonPORequestService, dialog, permissionHelper) {
        this.service = service;
        this.vbWithPORequestService = vbWithPORequestService;
        this.vbNonPORequestService = vbNonPORequestService;
        this.router = router;
        this.dialog = dialog;

        this.selectedItems = [];
        this.permissions = permissionHelper.getUserPermissions();

        this.initPermission();
    }

    initPermission() {
        this.roles = [PO, NONPO];
        this.accessCount = 0;
        for (let i = this.roles.length - 1; i >= 0; i--) {
            // if (this.permissions.hasOwnProperty(this.roles[i].code)) {
            this.roles[i].hasPermission = true;
            this.accessCount++;
            this.activeRole = this.roles[i];
            // }
        }
    }

    changeRole(role) {
        if (role.key !== this.activeRole.key) {
            this.activeRole = role;
            this.tableList.refresh();

        }
    }

    listDataFlag = false;
    loaderVB = (info) => {
        let order = {};

        if (info.sort)
            order[info.sort] = info.order;

        var type = 0;
        if (this.activeRole.position == 3) {
            type = 1;
        } else {
            type = 2;
        }
        let arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            filter: JSON.stringify({
                Type: type,
                ApprovalStatus: 2
            }),
        };

        return this.service.search(arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    create() {
        this.router.navigateToRoute('create', { role: this.activeRole });
    }

    cancel() {
        this.dialog.show(AlertView)
            .then((response) => {
                console.log(response)
                var items = this.selectedItems.map(s => s.Id);
                var data = {};
                data.IsApproved = false;
                data.Ids = items;
                data.Reason = response.output.Remark;
                this.service.cancellation(data)
                    .then(result => {
                        alert("Data berhasil disimpan");
                        this.error = {};
                        this.tableList.refresh();
                        this.selectedItems = [];
                    })
                    .catch(e => {
                        if (e.message) {
                            alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
                        }
                        this.error = e;
                    });
            })
            .catch(e => {
                this.error = e;
            })

    }
}