import { bindable, inject } from 'aurelia-framework'
import moment from 'moment';
import numeral from 'numeral';
import { Service } from '../service';

const PurchasingDispositionLoader = require('../../../../loader/purchase-dispositions-loader');

@inject(Service)
export class Item {
    @bindable selectedPurchaseDisposition;

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;

        this.columns = ['Unit', 'Nama Barang', 'Jumlah', 'UOM', 'Harga'];

    }
    activate(context) {
        this.context = context;
        this.data = context.data;
        this.options = context.options;
        this.filter = {};
        this.error = context.error;
        if (this.data) {
            this.selectedPurchaseDisposition = this.data.dispositionNo;
        }
    }


    get purchasingDispositionLoader() {
        return PurchasingDispositionLoader;
    }

    selectedPurchaseDispositionChanged(newValue) {
        if (newValue === null) {
            this.data.items = [];
            this.error = {};
        } else if (newValue) {
            var paytoSupp = newValue.DPP + newValue.VatValue + newValue.PaymentCorrection;
            if (newValue.IncomeTaxBy == "Supplier") {
                paytoSupp = newValue.DPP + newValue.VatValue - newValue.IncomeTaxValue + newValue.PaymentCorrection;
            }
            this.data.dispositionDate = newValue.CreatedUtc;
            this.data.currency = {};
            this.data.currency._id = newValue.Currency._id;
            this.data.currency.code = newValue.Currency.code;
            this.data.supplier = {};
            this.data.supplier._id = newValue.Supplier._id;
            this.data.supplier.code = newValue.Supplier.code;
            this.data.supplier.name = newValue.Supplier.name;
            this.data.division = {};
            this.data.division._id = newValue.Division._id;
            this.data.division.code = newValue.Division.code;
            this.data.division.name = newValue.Division.name;
            this.data.category = {};
            this.data.category._id = newValue.Category._id;
            this.data.category.code = newValue.Category.code;
            this.data.category.name = newValue.Category.name;
            this.data.paymentDueDate = newValue.PaymentDueDate;
            this.data.incomeTaxVm = {};
            this.data.incomeTaxVm._id = newValue.Items[0].IncomeTax._id;
            this.data.incomeTaxVm.name = newValue.Items[0].IncomeTax.name;
            this.data.incomeTaxVm.rate = newValue.Items[0].IncomeTax.rate;
            this.data.incomeTax = newValue.Amount * this.data.incomeTaxVm.rate;
            this.data.proformaNo = newValue.ProformaNo;
            this.data.dispositionId = newValue.Id;
            this.data.dispositionNo = newValue.DispositionNo;
            this.data.useIncomeTax = newValue.Items[0].UseIncomeTax;
            this.data.useVat = newValue.Items[0].UseVat;
            this.data.paymentMethod = newValue.PaymentMethod;
            this.data.paymentCorrection = newValue.PaymentCorrection;
            this.data.vatValue = newValue.VatValue;
            this.data.incomeTaxValue = newValue.IncomeTaxValue;
            this.data.dpp = newValue.DPP;
            this.data.payToSupplier = paytoSupp;
            if (this.data.useVat == true) {
                this.data.vat = newValue.Amount * 0.1;
            } else {
                this.data.vat = 0;
            }
            this.data.totalPaid = newValue.DPP + this.data.vatValue;
            this.data.items = [];
            for (var items of newValue.Items) {
                for (var details of items.Details) {
                    var item = {
                        price: details.PaidPrice,
                        product: details.Product,
                        quantity: details.PaidQuantity,
                        unit: details.Unit,
                        uom: details.DealUom,
                        purchasingDispositionDetailId: details.Id,
                        epoId: items.EPOId
                    };
                    this.data.items.push(item);
                }
            }
        }
    }

    toggle() {
        this.isShowing = !this.isShowing;
    }

    purchasingDispositionView = (purchasingDisposition) => {
        return purchasingDisposition.DispositionNo
    }

    onRemove() {
        this.bind();
    }

}