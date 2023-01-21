import { bindable, inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { activationStrategy } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';
import { Service } from './service';
import VBWithPORequestService from '../shared/vb-with-po-request-service';
import VBNonPORequestService from '../shared/vb-non-po-request-service';
import { PermissionHelper } from '../../../utils/permission-helper';
import { PO, NONPO } from '../shared/permission-constants';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"
const VBWithPOLoader = require('../../../loader/vb-with-po-request-loader');
const VBNonPOLoader = require('../../../loader/vb-non-po-request-loader');
const VBLoader = require('../../../loader/vb-request-document-loader');
const UnitLoader = require('../../../loader/unit-loader');
import { Dialog } from '../../../au-components/dialog/dialog';

import { CreateView } from './custom-dialog-view/create-view';

@inject(Router, Service, VBWithPORequestService, VBNonPORequestService, PermissionHelper, Dialog)
export class Create {
    columns = [
        { field: "IsApproved", checkbox: true, sortable: false },
        { field: "DocumentNo", title: "No VB" },
        {
            field: "Date", title: "Tgl VB", formatter: function (value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        {
            field: "Amount", title: "VB Uang", formatter: function (value, data, index) {
                return numeral(value).format('0,000.00');
            },
        },
        { field: "CurrencyCode", title: "Mata Uang" },
        { field: "CreatedBy", title: "Pemohon" },
        { field: "SuppliantUnitName", title: "Unit" }
    ];

    tableOptions = {
        pagination: false,
        showColumns: false,
        search: false,
        showToggle: false,
    };

    filterWithPO = {
        "Type": 1
    }

    filterNonPO = {
        "Type": 2
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
    };

    @bindable documentVB;
    @bindable unit;
    @bindable date;

    async activate(params) {
        if (params) {
            params.role.position = parseInt(params.role.position);
            params.role.hasPermission = true;
            params.role.positionAutocomplete = parseInt(params.role.positionAutocomplete);
            this.activeRole = params.role;
        }

    }

    constructor(router, service, vbWithPORequestService, vbNonPORequestService, permissionHelper, dialog) {
        this.router = router;
        this.service = service;
        this.vbWithPORequestService = vbWithPORequestService;
        this.vbNonPORequestService = vbNonPORequestService;
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
            // this.documentTable.refresh();
        }
        this.listDataFlag = false;
        this.unit = null;
        this.documentVB = null;
        this.date = null;
        this.documentTable.refresh();
    }


    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    search() {
        this.listDataFlag = true;

        this.documentTable.refresh();
    }

    loaderVB = (info) => {

        let filter = {};
        let order = {};

        if (info.sort) {
            order[info.sort] = info.order;
        }

        filter.order = order;

        if (this.activeRole.key == "PO") {
            filter.type = 1;
        } else {
            filter.type = 2;
        }

        if (this.documentVB) {
            filter.vbId = this.documentVB.Id;
        }

        if (this.unit) {
            filter.suppliantUnitId = this.unit.Id;
        }

        if (this.date && this.date != "Invalid Date") {
            filter.date = moment(this.date).format("YYYY-MM-DD");
        } else {
            filter.date = null;
        }

        return this.listDataFlag ? this.service.searchNotApproveVB(filter)
            .then(result => {
                return {
                    total: result.data.length,
                    data: result.data
                }
            }) : { data: [], total: 0 };
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list', { role: this.activeRole });
    }

    saveCallback(event) {

        console.log("dialog")

        var items = this.selectedItems.map(s => s.Id);
        var data = {};
        data.IsApproved = true;
        data.Ids = items;

        this.dialog.show(CreateView)
            .then((response) => {
                data.Bank = response.output.Bank;
                this.service.approval(data)
                    .then(result => {
                        alert("Data berhasil disimpan");
                        this.router.navigateToRoute('create', { role: this.activeRole }, { replace: true, trigger: true });
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


    get vbLoader() {
        return VBLoader;
    }

    get unitLoader() {
        return UnitLoader;
    }

    vbView = (vb) => {
        return vb.DocumentNo;
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`

    }

}
