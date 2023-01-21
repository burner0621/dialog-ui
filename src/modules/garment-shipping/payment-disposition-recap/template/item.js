import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "../service";

const PaymentDispositionsLoader = require('../../../../loader/garment-shipping-payment-dispositions-loader');

@inject(Service)
export class item {

    @bindable selectedPaymentDisposition;

    constructor(service) {
        this.service = service;
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = this.options.readOnly;
        this.isEdit = this.context.context.options.isEdit;

        this.isShowing = false;
        this.isNewSelected = true;
        if (this.data && this.data.paymentDisposition && this.data.paymentDisposition.id) {
            this.selectedPaymentDisposition = this.data.paymentDisposition;
            this.isShowing = true;
        }
        if(!this.data.paymentDisposition) {
            this.data.paymentDisposition = {};
        }

    }

    invoicesColumns = [
        { header: "Invoice" },
        { header: "Buyer" },
        { header: "Volume" },
        { header: "Unit" },
        { header: "Amount" },
        { header: "Jasa" },
        { header: "PPH" },
        { header: "Terbayar" },
        { header: "C1A" },
        { header: "C1B" },
        { header: "C2A" },
        { header: "C2B" },
        { header: "C2C" },
        { header: "Amount per Unit" },
    ];

    units = ["C1A", "C1B", "C2A", "C2B", "C2C"];

    get paymentDispositionsLoader() {
        return PaymentDispositionsLoader;
    }

    get dispositionFilter() {
        return {
            paymentType: "EMKL",
            EMKLId: this.context.context.options.data.emkl ? this.context.context.options.data.emkl.Id || this.context.context.options.data.emkl.id : -1
        };
    };

    async selectedPaymentDispositionChanged(newValue) {
        if (newValue) {
            const disposition = await this.service.getDispositionById(newValue.id);

            disposition.amount = disposition.billValue + disposition.vatValue;
            if(this.isNewSelected == false) {
                if(this.data.paymentDisposition.incomeTaxValue != disposition.incomeTaxValue) {
                    disposition.incomeTaxValue = this.data.paymentDisposition.incomeTaxValue;
                }
            }
            disposition.paid = disposition.amount - disposition.incomeTaxValue + this.data.othersPayment;

            const invIds = disposition.invoiceDetails.map(i => i.invoiceId).filter((value, index, self) => self.indexOf(value) == index);
            const invoices = [];
            for (const id of invIds) {
                const inv = await this.service.getInvoiceById(id);
                invoices.push(inv);
            }

            const packingListIds = invoices.map(i => i.packingListId).filter((value, index, self) => self.indexOf(value) == index);
            const packingLists = [];
            for (const id of packingListIds) {
                const pl = await this.service.getPackingListById(id);
                packingLists.push(pl);
            }

            disposition.percentage = {};
            disposition.amountPerUnit = {};

            for (const invoiceDetail of disposition.invoiceDetails) {
                const invoice = invoices.find(inv => inv.id == invoiceDetail.invoiceId);
                const packingList = packingLists.find(pl => pl.id == invoice.packingListId);

                let totalCBM = 0;
                for (const m of packingList.measurements) {
                    if (m.length && m.width && m.height && m.cartonsQuantity) {
                        totalCBM += (m.length * m.width * m.height * m.cartonsQuantity / 1000000);
                    }
                }
                invoiceDetail.packingList = {
                    totalCBM: totalCBM.toLocaleString('en-EN', { minimumFractionDigits: 3, maximumFractionDigits: 3 })
                };

                const invoiceUnits = invoice.items.map(i => i.unit.code).filter((value, index, self) => self.indexOf(value) == index);
                invoiceDetail.invoice = {
                    buyerAgent: invoice.buyerAgent,
                    unit: invoiceUnits.join(", ")
                };

                for (const unit of invoiceUnits) {
                    const qtyByUnit = invoice.items.filter(i => i.unit.code == unit).reduce((acc, cur) => acc += cur.quantity, 0);
                    disposition.percentage[unit] = (disposition.percentage[unit] || 0) + qtyByUnit;
                }
            }

            const totalQuantity = disposition.invoiceDetails.reduce((acc, cur) => acc += cur.quantity, 0);
            for (const unit of this.units) {
                if (disposition.percentage[unit]) {
                    disposition.percentage[unit] = Math.round((disposition.percentage[unit] / totalQuantity * 100) * 100) / 100;
                    disposition.amountPerUnit[unit] = Math.round((disposition.percentage[unit] * disposition.paid / 100) * 100) / 100;
                }
            }

            this.data.paymentDisposition = disposition;
            // console.log(this.data.paymentDisposition);
            this.isShowing = true;
            this.isNewSelected == true;
        } else {
            this.data.paymentDisposition = {};
            this.isNewSelected == true;
        }
    }

    toggle() {
        if (!this.isShowing){
            this.isShowing = true;
        }
        else {
            this.isShowing = !this.isShowing;
        }
    }

    @computedFrom('data.service')
    get vatService() {
        if(this.data.service) {
            var value = 0.1 * this.data.service;
            this.data.vatService = value;
            return value;
        }
        return 0;        
    }

    get amountService() {
        if(this.data.service > 0 && this.data.truckingPayment > 0 && this.data.vatService > 0) {
            var value = this.data.paymentDisposition.amount - this.data.service - this.data.truckingPayment - this.data.vatService;
            this.data.amountService = value;
            return value; 
        }
        return 0;
    }

    get paidDisposition() {
        if(this.data.paymentDisposition.amount > 0 && this.data.paymentDisposition.incomeTaxValue > 0) {
            var value = this.data.paymentDisposition.amount - this.data.paymentDisposition.incomeTaxValue + this.data.othersPayment;
            this.data.paymentDisposition.paid = value;
            
            return value;
        }
        return 0;
    }

    itemChanged(e) {
        this.selectedPaymentDisposition = this.data.paymentDisposition;
        this.isNewSelected = false;
    }
}