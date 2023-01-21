import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from "../service";

const InvoiceLoader = require('../../../../loader/garment-shipping-invoice-loader');

@inject(Service)
export class items {
    @bindable selectedInvoice;
    get invoiceLoader() {
        return InvoiceLoader;
    }


    comodityView = (comodity) => {
        return `${comodity.Code || comodity.code} - ${comodity.Name || comodity.name}`;
    }


    constructor(service) {
        this.service = service;
    }

    async activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = this.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.type = context.context.options.type;
        this.rate = this.data.rate;
        this.selectedInvoice = {
            invoiceNo: this.data.invoiceNo,
            id: this.data.invoiceId
        }
        if (this.data.id) {
            var invoice = await this.service.getInvoiceById(this.data.invoiceId);
            for (var item of invoice.garmentShippingInvoiceUnits) {
                if (item.unit.code.includes("2A"))
                    this.data.amount2APercentage = item.amountPercentage;
                if (item.unit.code.includes("2B"))
                    this.data.amount2BPercentage = item.amountPercentage;
                if (item.unit.code.includes("2C"))
                    this.data.amount2CPercentage = item.amountPercentage;
                if (item.unit.code.includes("1A"))
                    this.data.amount1APercentage = item.amountPercentage;
                if (item.unit.code.includes("1B"))
                    this.data.amount1BPercentage = item.amountPercentage;
            }

        }
    }

    async selectedInvoiceChanged(newValue) {
        this.data.amount2APercentage = 0;
        this.data.amount2BPercentage = 0;
        this.data.amount2CPercentage = 0;
        this.data.amount1APercentage = 0;
        this.data.amount1BPercentage = 0;
        this.data.amount = 0;
        if (newValue) {
            this.data.buyerAgent = newValue.buyerAgent;
            this.data.invoiceNo = newValue.invoiceNo;
            this.data.invoiceId = newValue.id;
            if (this.type != "Kargo") {
                this.data.amount = newValue.totalAmount;
            }
            var invoice = await this.service.getInvoiceById(this.data.invoiceId);
            for (var item of invoice.garmentShippingInvoiceUnits) {
                if (item.unit.code.includes("2A"))
                    this.data.amount2APercentage = item.amountPercentage;
                if (item.unit.code.includes("2B"))
                    this.data.amount2BPercentage = item.amountPercentage;
                if (item.unit.code.includes("2C"))
                    this.data.amount2CPercentage = item.amountPercentage;
                if (item.unit.code.includes("1A"))
                    this.data.amount1APercentage = item.amountPercentage;
                if (item.unit.code.includes("1B"))
                    this.data.amount1BPercentage = item.amountPercentage;
            }
        }
        else {
            this.data.buyerAgent = null;
            this.data.invoiceNo = "";
            this.data.invoiceId = 0;
            this.data.amount2APercentage = 0;
            this.data.amount2BPercentage = 0;
            this.data.amount2CPercentage = 0;
            this.data.amount1APercentage = 0;
            this.data.amount1BPercentage = 0;
            this.data.amount = 0;
        }
    }

    get amountIDR() {
        this.data.amountIDR = 0;
        if (this.data.amount && this.data.currencyRate && this.type == "Kargo") {
            this.data.amountIDR = this.data.amount * this.data.currencyRate;
        }
        return this.data.amountIDR;
    }

    @computedFrom("data.rate", "data.amount")
    get premi() {
        this.data.premi = 0;
        if (this.data.amount && this.rate && this.type != "Kargo") {
            this.data.premi = this.data.amount * this.data.rate / 100;
        }
        return this.data.premi;
    }

    get amount2A() {
        this.data.amount2A = 0;
        if (this.type == "Kargo") {
            if (this.data.amount && this.data.currencyRate && this.data.amount2APercentage) {
                this.data.amount2A = this.data.amount * this.data.currencyRate * this.data.amount2APercentage / 100;
            }
        }
        else {
            if (this.data.premi && this.data.amount2APercentage) {
                this.data.amount2A = this.data.premi * this.data.amount2APercentage / 100;
            }
        }
        return this.data.amount2A;
    }

    get amount2B() {
        this.data.amount2B = 0;
        if (this.type == "Kargo") {
            if (this.data.amount && this.data.currencyRate && this.data.amount2BPercentage) {
                this.data.amount2B = this.data.amount * this.data.currencyRate * this.data.amount2BPercentage / 100;
            }
        }
        else {
            if (this.data.amount2BPercentage && this.data.premi) {
                this.data.amount2B = this.data.premi * this.data.amount2BPercentage / 100;
            }
        }

        return this.data.amount2B;
    }

    get amount2C() {
        this.data.amount2C = 0;
        if (this.type == "Kargo") {
            if (this.data.amount && this.data.currencyRate && this.data.amount2CPercentage) {
                this.data.amount2C = this.data.amount * this.data.currencyRate * this.data.amount2CPercentage / 100;
            }
        }
        else {
            if (this.data.amount2CPercentage && this.data.premi) {
                this.data.amount2C = this.data.premi * this.data.amount2CPercentage / 100;
            }
        }
        return this.data.amount2C;
    }

    get amount1A() {
        this.data.amount1A = 0;
        if (this.type == "Kargo") {
            if (this.data.amount && this.data.currencyRate && this.data.amount1APercentage) {
                this.data.amount1A = this.data.amount * this.data.currencyRate * this.data.amount1APercentage / 100;
            }
        }
        else {
            if (this.data.amount1APercentage && this.data.premi) {
                this.data.amount1A = this.data.premi * this.data.amount1APercentage / 100;
            }
        }
        return this.data.amount1A;
    }

    get amount1B() {
        this.data.amount1B = 0;
        if (this.type == "Kargo") {
            if (this.data.amount && this.data.currencyRate && this.data.amount1BPercentage) {
                this.data.amount1B = this.data.amount * this.data.currencyRate * this.data.amount1BPercentage / 100;
            }
        }
        else {
            if (this.data.amount1BPercentage && this.data.premi) {
                this.data.amount1B = this.data.premi * this.data.amount1BPercentage / 100;
            }
        }
        return this.data.amount1B;
    }
}