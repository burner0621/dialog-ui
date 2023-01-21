import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
import { MasterService } from './master-service';
import moment from 'moment';

const CashflowCategoryLoader = require("../../loader/cashflow-category-loader");


@inject(Service, MasterService)
export class DataForm {
    @bindable title;
    @bindable readOnly;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }

    reportTypeOptions = [{
        value: 0,
        text: ""
    }, {
        value: 1,
        text: "Rekap Hutang dan Disposisi"
    }, {
        value: 2,
        text: "Laporan Pembelian"
    }]

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    }

    constructor(service, masterService) {
        this.service = service;
        this.masterService = masterService;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        this.cashflowCategory = this.data.CashflowCategory || null;
        this.reportType = this.reportTypeOptions.find((option) => option.value == this.data.ReportType)

        // if (this.data.PurchasingCategoryIds)
        //     this.data.Items = await Promise.all(this.data.PurchasingCategoryIds.map(async (item) => {
        //         let resultItem = {};
        //         resultItem.Category = await this.masterService.getCategoryById(item);
        //         return resultItem;
        //     }));
        // console.log(this.data.Items);
        // this.cashflowCategory = await this.service.getBudgetCashflowCategoryById(this.data.CashflowCategoryId);

        // this.reportType = this.reportTypeOptions.find(f => f.value == this.data.ReportType);
    }

    get cashflowCategoryLoader() {
        return CashflowCategoryLoader;
    }

    @bindable cashflowCategory;
    cashflowCategoryChanged(newVal, oldVal) {
        if (newVal) {
            this.data.CashflowCategoryId = newVal.Id;
        } else {
            this.data.CashflowCategoryId = 0;
        }
    }

    columns = [
        "Kategori"
    ]

    get addItems() {
        return (event) => {
            console.log(this.data.Items);
            this.data.Items.push({})
        };
    }

    @bindable reportType
    reportTypeChanged(newVal, oldVal) {
        if (newVal) {
            this.data.ReportType = newVal.value
        } else {
            this.data.ReportType = 0;
        }
    }

    // @computedFrom("data.Items")
    get anyCategoryIsRawMaterial() {

        if (this.data.Items && this.data.Items.length > 0) {
            return this.data.Items.find(f => f.Category && f.Category.code == "BB");
        }
        return false;
    }
}
