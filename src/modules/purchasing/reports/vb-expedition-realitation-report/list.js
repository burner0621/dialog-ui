import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import numeral from 'numeral';
var moment = require("moment");

const VBWithPOLoader = require('./../../../../loader/vb-with-po-request-loader');
const VBNonPOLoader = require('./../../../../loader/vb-non-po-request-loader');
const VBRealizationLoader = require('./../../../../loader/vb-realization-loader');
const UnitLoader = require('./../../../../loader/unit-loader');
const DivisionLoader = require('./../../../../loader/division-loader');
const AccountLoader = require('./../../../../loader/account-loader');

import { Dialog } from './../../../../au-components/dialog/dialog';

@inject(Router, Service, Dialog)
export class List {
    filterAccount = {};
    filter = {};
    listDataFlag = false;

    constructor(router, service, dialog) {
        this.service = service;
        this.router = router;
        this.dialog = dialog;
    }

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        sortable: false,
        pagination: false
    }

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    setValue() {
        this.arg.vbRequestId = this.selectedVBRequest ? this.selectedVBRequest.Id : null;
        this.arg.vbRealizeId = this.selectedVBRealize ? this.selectedVBRealize.Id : null;
        this.arg.applicantName = this.selectedApplicant ? this.selectedApplicant.username : null;
        this.arg.unitId = this.selectedUnit ? this.selectedUnit.Id : null;
        this.arg.divisionId = this.selectedDivision ? this.selectedDivision.Id : null;
        this.arg.isVerified = this.selectedStatus ? this.selectedStatus.value : null;
        this.arg.realizeDateFrom = this.realizeStartDate && this.realizeStartDate != "Invalid Date" ? moment(this.realizeStartDate).format("YYYY-MM-DD") : null;
        this.arg.realizeDateTo = this.realizeEndDate && this.realizeEndDate != "Invalid Date" ? moment(this.realizeEndDate).format("YYYY-MM-DD") : null;
    }

    columns = [
        { field: "RequestVBNo", title: "No. VB" },
        { field: "RealizationVBNo", title: "No. Realisasi VB" },
        { field: "VbType", title: "Tipe VB" },
        { field: "Applicant", title: "Nama" },
        { field: "Unit.Name", title: "Bagian/Unit" },
        { field: "Division.Name", title: "Divisi" },
        {
            field: "DateUnitSend", title: "Tgl. Unit Kirim", formatter: function (value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        { field: "Usage", title: "Keperluan" },
        { field: "RequestCurrency", title: "Kurs VB" },
        {
            field: "RequestAmount", title: "Nominal VB", formatter: function (value, data, index) {
                return numeral(value).format('0,000.00');
            },
        },
        { field: "RealizationCurrency", title: "Kurs Realisasi" },
        {
            field: "RealizationAmount", title: "Nominal Realisasi", formatter: function (value, data, index) {
                return numeral(value).format('0,000.00');
            },
        },
        {
            field: "RealizationDate", title: "Tgl. Realisasi", formatter: function (value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        {
            field: "DateVerifReceive", title: "Tgl. Verif Terima", formatter: function (value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        { field: "Verificator", title: "Nama Verifikator" },
        {
            field: "DateVerifSend", title: "Tgl. Verif Kirim Kasir/Retur", formatter: function (value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        { field: "Status", title: "Status Kasir" },
        { field: "VerificationStatus", title: "Status Retur" },
        { field: "Notes", title: "Keterangan (Retur)" },
        {
            field: "DateCashierReceive", title: "Tgl. Kasir Terima", formatter: function (value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
    ];

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        this.arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        };

        return this.listDataFlag ? (
            this.setValue(),
            this.service.getReport(this.arg)
                .then(result => {
                    return {
                        data: result.data,
                    }
                })
        ) : { total: 0, data: {} };
    }

    reset() {
        this.selectedVBRequest = null;
        this.selectedVBRealize = null;
        this.selectedApplicant = null;
        this.selectedUnit = null;
        this.selectedDivision = null;
        this.selectedStatus = this.statusTypes[0];
        this.realizeStartDate = null;
        this.realizeEndDate = null;
        this.listDataFlag = false;
        this.table.refresh();
    }

    search() {
        this.listDataFlag = true;
        this.table.refresh();
    }

    exportToExcel() {
        this.setValue();
        this.service.generateExcel(this.arg);
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            default:
                return true;
        }
    }

    statusTypes = [{ value: "ALL", label: "Semua" }, { value: "CASHIER", label: "Kasir" }, { value: "RETURN", label: "Retur" }];

    get vbWithPOLoader() {
        return VBWithPOLoader;
    }

    get vbNonPOLoader() {
        return VBNonPOLoader;
    }
    
    get vbRealizationLoader() {
        return VBRealizationLoader;
    }

    get unitLoader() {
        return UnitLoader;
    }

    get divisionLoader() {
        return DivisionLoader;
    }

    get accountLoader() {
        return AccountLoader;
    }
}