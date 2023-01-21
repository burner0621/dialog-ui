import { bindable, inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { activationStrategy } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';
import { Service } from './service';
import PurchasingDispositionExpeditionService from '../shared/purchasing-disposition-expedition-service';
import { PermissionHelper } from '../../../utils/permission-helper';
import { VERIFICATION, CASHIER,RETUR  } from '../shared/permission-constants';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"
const DispositionLoader = require('../../../loader/garment-purchase-dispositions-all-loader');
const SupplierLoader = require('../../../loader/garment-supplier-loader');

@inject(Router, Service, PurchasingDispositionExpeditionService, PermissionHelper)
export class Create {
    columns = [
        { field: "selected", checkbox: true, sortable: false },
        { field: "DispositionNoteNo", title: "No Disposisi" },
        {
            field: "CreatedUtc", title: "Tgl Disposisi", formatter: function (value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        {
            field: "PaymentDueDate", title: "Tgl Jatuh Tempo", formatter: function (value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        { field: "SupplierName", title: "Supplier" },
        { field: "ProformaNo", title: "No Proforma / Invoice" },
        // { field: "IncomeTax", title: "PPH" },
        // { field: "Vat", title: "PPN" },
        {
            field: "CurrencyTotalPaid", title: "Total Bayar", formatter: function (value, data, index) {
                return numeral(value).format('0,000.00');
            },
        },
        { field: "CurrencyCode", title: "Mata Uang" },
        { field: "CreatedBy", title: "Nama Pembelian" },
    ];

    tableOptions = {
        pagination: false,
        showColumns: false,
        search: false,
        showToggle: false,
    };

    filterQuery={
        "Position":"2"
    }

    filterQueryVerified={
        "Position":"4"
    }

    filterQueryRetur={
        "Position":"6"
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
        params.role.position=parseInt(params.role.position);
        params.role.hasPermission=true;
        params.role.positionAutocomplete=parseInt(params.role.positionAutocomplete);
        this.activeRole = params.role;
    }

    constructor(router, service, purchasingDispositionExpeditionService, permissionHelper) {
        this.router = router;
        this.service = service;
        this.purchasingDispositionExpeditionService = purchasingDispositionExpeditionService;

        this.selectDisposition = ['DispositionNoteNo'];
        this.selectSupplier = ['code', 'name'];
        this.documentData = [];
        this.selectedItems = [];

        this.permissions = permissionHelper.getUserPermissions();
        this.initPermission();
    }

    initPermission() {
        // this.roles = [VERIFICATION, CASHIER, ACCOUNTING];
        this.roles = [VERIFICATION, CASHIER,RETUR];
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
        }else{
            this.disposition == null;
        }
    }

    supplierChanged(newValue, oldValue){
        if (newValue) {
            this.supplier = newValue;
        } else if (oldValue) {
            this.supplier == null;
        }else{
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

        if (this.supplier){
            filter.SupplierCode = this.supplier.Code;
            filter.SupplierId = this.supplier.Id;
        }
        // console.log("search",this);
        let arg = {
            page: 1,
            size: 255,
            // filter: JSON.stringify(filter),
            dispositionNoteId:this.disposition? this.disposition.Id:0,
            supplierId :filter.SupplierId?filter.SupplierId:0,
            position : filter.Position
        };
        // console.log("search arg",arg);

        this.purchasingDispositionExpeditionService.search(arg)
            .then(result => {
                var dispositions=[];
                for(var data of result.data){
                    var config = Container.instance.get(Config);
                    var _endpoint = config.getEndpoint("purchasing-azure");
                    const resource = `garment-disposition-purchase/${data.DispositionNoteId}`;
                    var disp=  _endpoint.find(resource);
                        // .then(result => {
                        //     var dispoData= result.data;
                        //     return dispoData.CreatedBy;
                        // });
                     dispositions.push(disp);
                }
                Promise.all(dispositions).then(dispo=>{
                    var dataDisposition=[];
                    for(var dataResult of dispo){
                        dataDisposition.push(dataResult.data);
                    }
                    // for(var data of result.data){
                    //     var same= dataDisposition.find(a=>a.Id==data.DispositionNoteId);
                    //     if(same){
                    //         // data.totalPaid=same.DPP+same.VatValue;
                    //         // if(same.IncomeTaxBy=="Supplier"){
                    //         //     data.totalPaid=same.DPP+same.VatValue-same.IncomeTaxValue;
                    //         // }
                    //         data.dispoCreatedby=same.CreatedBy;
                    //     }
                    // }
                    this.selectedItems.splice(0, this.selectedItems.length);
                    this.documentData.splice(0, this.documentData.length);
                    this.documentData.push(...result.data)
                    this.documentTable.refresh();
                })
                
            });
        // console.log("after search",this);
            
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
            Items: [],
        };

        for (let s of this.selectedItems) {
            // data.PurchasingDispositionExpedition.push({
            //     Id: s.Id,
            //     DispositionNo: s.DispositionNoteNo,
            // });
            // data.Items.push({
            //     DispositionNote:{
            //         Id : s.Id,
            //         DocumentNo : s.DispositionNoteNo,
            //         Date : s.DispositionNoteDate,
            //         DueDate : s.DispositionNoteDueDate,
            //         SupplierId : s.SupplierId,
            //         SupplierCode : s.SupplierCode,
            //         SupplierName : s.SupplierName,
            //         VATAmount : s.VATAmount,
            //         CurrencyVATAmount : s.CurrencyVATAmount,
            //         IncomeTaxAmount : s.IncomeTaxAmount,
            //         CurrencyIncomeTaxAmount : s.CurrencyIncomeTaxAmount,
            //         TotalPaid : s.TotalPaid,
            //         CurrencyTotalPaid : s.CurrencyTotalPaid,
            //         CurrencyId : s.CurrencyId,
            //         CurrencyCode : s.CurrencyCode,
            //         CurrencyRate : s.CurrencyRate,
            //         DPPAmount : s.DPPAmount,
            //         CurrencyDPPAmount : s.CurrencyDPPAmount
            //     },
            //     Remark:s.Remark
            // });
            data.Items.push(s.Id);
        }

        this.service.create(data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create', {role:this.activeRole}, { replace: true, trigger: true });
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
