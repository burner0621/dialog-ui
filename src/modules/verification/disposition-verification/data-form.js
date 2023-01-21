import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
import moment from 'moment';

var DispositionLoader = require('../../../loader/purchase-dispositions-all-loader');
//var IncomeTaxLoader = require('../../../loader/income-tax-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable DispositionNo;
    @bindable supplierName;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }
    itemsColumns = [{ header: "Nomor External PO" },
    { header: "Kena PPN" },
    { header: "Nominal PPN" },
    { header: "Kena PPH" },
    { header: "PPH" },
    { header: "Nominal PPH" },
    { header: "Verified Amount" },
    { header: "Harga yang Sudah dibayar" },
    { header: "" }];

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
        this.dispositionNoQuery = { "position": 3 };
        this.selectDispositionNo = [
            'DispositionNo',
            'Supplier.name', 'Supplier.code',
            'Currency.code',
            'Bank',
            'ConfirmationOrderNo',
            'InvoiceNo',
            'PaymentMethod',
            'PaymentDueDate',
            'Calculation',
            'Remark',
            'ProformaNo',
            'Investation',
            'DPP',
            'VatValue',
            'IncomeTaxValue',
            'Amount',
            'IncomeTaxBy',
            'PaymentCorrection',
            'Items.EPOId',
            'Items.EPONo',
            'Items.UseVat',
            'Items.UseIncomeTax',
            'Items.IncomeTax.name',
            'Items.IncomeTax.rate',
            'Items.Details.PRNo',
            'Items.Details.Category.name',
            'Items.Details.Product.name', 'Items.Details.Product.code',
            'Items.Details.DealQuantity',
            'Items.Details.DealUom.unit',
            'Items.Details.PaidQuantity',
            'Items.Details.PricePerDealUnit',
            'Items.Details.PriceTotal',
            'Items.Details.PaidPrice',
            'Items.Details.Unit.name',
        ];
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        if (!this.data || !this.data.Id) {
            this.data.VerifyDate = moment(new Date()).format("DD-MMM-YYYY");
        } else {
            this.supplierName = this.data.Supplier.code + " - " + this.data.Supplier.name;
        }
        if (this.readOnly) {
            this.data.Amount = this.data.Amount.toLocaleString('en-EN', { minimumFractionDigits: 4 });
        }
        if(this.data.Items){
            for(var a of this.data.Items){
                if(a.Details){
                    for(var b of a.Details){
                        b.Category=this.data.Category;
                    }
                }
            }
        }
    }
    context = ["Rincian Purchase Request"];


    supplierView = (supplier) => {
        var code = supplier.code || supplier.Code;
        var name = supplier.name || supplier.Name;
        return `${code} - ${name}`
    }

    currencyView = (currency) => {
        return `${currency.code}`
    }

    DispositionNoChanged(newVal, oldVal) {
        if (this.DispositionNo) {

            this.data = Object.assign(this.data, this.DispositionNo)
            
            this.supplierName = this.data.Supplier.code + " - " + this.data.Supplier.name;

            console.log(this.data)
            this.data.PayToSupplier=this.data.DPP+this.data.VatValue+ this.data.PaymentCorrection;
            if(this.data.IncomeTaxBy=="Supplier"){
                this.data.PayToSupplier=this.data.DPP+this.data.VatValue+ this.data.PaymentCorrection-this.data.IncomeTaxValue;
            }
            if(this.data.Items){
                for(var a of this.data.Items){
                    if(a.Details){
                        for(var b of a.Details){
                            b.Category=this.data.Category;
                        }
                    }
                }
            }

            //PERHITUNGAN HARGA dibayar
            
            // let arg = {
            //     page: 1,
            //     size: Number.MAX_SAFE_INTEGER,
            //     filter: JSON.stringify({DispositionNo:this.DispositionNo}) 
            // };
            // return this.service.searchPaymentDispo(arg)
            //     .then(result => {
            //         console.log(result.data)
            //         return result.data;
            //     })
            
        } else {
            this.data = Object.assign(this.data, {})
        }
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        editText: "Ubah",
        deleteText: "Hapus",
    };

    get dispositionLoader() {
        return DispositionLoader;
    }
} 