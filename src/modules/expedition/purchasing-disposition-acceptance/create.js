import { bindable, inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { activationStrategy } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';
import { Service } from './service';
import PurchasingDispositionExpeditionService from '../shared/purchasing-disposition-expedition-service';
import { PermissionHelper } from '../../../utils/permission-helper';
import { VERIFICATION, CASHIER } from '../shared/permission-constants';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"
const DispositionLoader = require('../../../loader/purchase-dispositions-all-loader');
const SupplierLoader = require('../../../loader/supplier-loader');

@inject(Router, Service, PurchasingDispositionExpeditionService, PermissionHelper)
export class Create {
    columns = [
        { field: "selected", checkbox: true, sortable: false },
        { field: "dispositionNo", title: "No Disposisi" },
        {
            field: "dispositionDate", title: "Tgl Disposisi", formatter: function (value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        {
            field: "paymentDueDate", title: "Tgl Jatuh Tempo", formatter: function (value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        { field: "supplier.name", title: "Supplier" },
        { field: "proformaNo", title: "No Proforma / Invoice" },
        // { field: "IncomeTax", title: "PPH" },
        // { field: "Vat", title: "PPN" },
        {
            field: "payToSupplier", title: "Total Bayar", formatter: function (value, data, index) {
                return numeral(value).format('0,000.0000');
            },
        },
        { field: "currency.code", title: "Mata Uang" },
        { field: "dispoCreatedby", title: "Nama Pembelian" },
    ];

    tableOptions = {
        pagination: false,
        showColumns: false,
        search: false,
        showToggle: false,
    };

    filterQuery = {
        "Position": "2"
    }

    filterQueryVerified = {
        "Position": "4"
    }


    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
    };

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    @bindable disposition;
    @bindable supplier;

    async activate(params) {
        params.role.position = parseInt(params.role.position);
        params.role.hasPermission = true;
        params.role.positionAutocomplete = parseInt(params.role.positionAutocomplete);
        this.activeRole = params.role;
    }

    constructor(router, service, purchasingDispositionExpeditionService, permissionHelper) {
        this.router = router;
        this.service = service;
        this.purchasingDispositionExpeditionService = purchasingDispositionExpeditionService;

        this.selectDisposition = ['DispositionNo'];
        this.selectSupplier = ['code', 'name'];
        this.documentData = [];
        this.selectedItems = [];

        this.permissions = permissionHelper.getUserPermissions();
        this.initPermission();
    }

    initPermission() {
        // this.roles = [VERIFICATION, CASHIER, ACCOUNTING];
        this.roles = [VERIFICATION, CASHIER];
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
            this.selectedItems.splice(0, this.selectedItems.length);
            this.documentData.splice(0, this.documentData.length);
            this.documentTable.refresh();
        }
    }

    dispositionChanged(newValue, oldValue) {
        if (newValue) {
            this.disposition = newValue;
        } else if (oldValue) {
            this.disposition == null;
        } else {
            this.disposition == null;
        }
    }

    supplierChanged(newValue, oldValue) {
        if (newValue) {
            this.supplier = newValue;
        } else if (oldValue) {
            this.supplier == null;
        } else {
            this.supplier == null;
        }
    }

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    search() {
        let filter = { Position: this.activeRole.positionAutocomplete };

        if (this.disposition)
            filter.dispositionNo = this.disposition.DispositionNo;

        if (this.supplier)
            filter.SupplierCode = this.supplier.code;

        let arg = {
            page: 1,
            size: 255,
            filter: JSON.stringify(filter),
        };

        this.purchasingDispositionExpeditionService.search(arg)
            .then(result => {
                var dispositions = [];
                for (var data of result.data) {
                    var config = Container.instance.get(Config);
                    var _endpoint = config.getEndpoint("purchasing-azure");
                    const resource = `purchasing-dispositions/${data.dispositionId}`;
                    var disp = _endpoint.find(resource);
                    // .then(result => {
                    //     var dispoData= result.data;
                    //     return dispoData.CreatedBy;
                    // });
                    dispositions.push(disp);
                }
                Promise.all(dispositions).then(dispo => {
                    var dataDisposition = [];
                    for (var dataResult of dispo) {
                        dataDisposition.push(dataResult.data);
                    }
                    for (var data of result.data) {
                        var same = dataDisposition.find(a => a.Id == data.dispositionId);
                        if (same) {
                            // data.totalPaid=same.DPP+same.VatValue;
                            // if(same.IncomeTaxBy=="Supplier"){
                            //     data.totalPaid=same.DPP+same.VatValue-same.IncomeTaxValue;
                            // }
                            data.dispoCreatedby = same.CreatedBy;
                        }
                    }
                    this.selectedItems.splice(0, this.selectedItems.length);
                    this.documentData.splice(0, this.documentData.length);
                    this.documentData.push(...result.data)
                    this.documentTable.refresh();
                })

            });
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    saveCallback(event) {
        /*
            let data = {
                ReceiptDate: this.receiptDate,
                Role: this.activeRole.key,
                PurchasingDocumentExpedition: [],
            };
        */

        let data = {
            Role: this.activeRole.key,
            PurchasingDispositionExpedition: [],
        };

        for (let s of this.selectedItems) {
            data.PurchasingDispositionExpedition.push({
                Id: s.Id,
                DispositionNo: s.dispositionNo,
            });
        }

        this.service.create(data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create', { role: this.activeRole }, { replace: true, trigger: true });
            })
            .catch(e => {
                this.error = e;
            });
    }

    get dispositionLoader() {
        return DispositionLoader;
    }

    dispositionView = (disposition) => {
        return disposition.DispositionNo
    }

    get supplierLoader() {
        return SupplierLoader;
    }

}
