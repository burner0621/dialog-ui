import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

var CurrencyLoader = require('../../../loader/currency-in-garment-currency-loader');
const UnitLoader = require('../../../loader/unit-loader');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable options = {};
    @bindable title;
    // useVat: false 
    @bindable selectedCurrency;
    @bindable isGarment = false;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    itemsColumns = ["Nomor PO"]

    garmentSelection = [{ id: 2, label: "Job", value: "GARMENT" }, { id: 1, label: "Umum", value: "UMUM" }];

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.data.TotalPaid = this.getTotalPaid;

        if (this.data.SuppliantUnit && this.data.SuppliantUnit.Id) {
            this.selectedSuppliantUnit = this.data.SuppliantUnit;
            this.options.Unit = this.data.SuppliantUnit;
        }
        this.selectedCurrency = this.data.Currency;

        // if (this.data.TotalPaid) {
        //   this.TotalPaid = this.data.TotalPaid;
        //   this.data.TotalPaid = this.getTotalPaid;
        // }
    }

    get addItems() {
        return (event) => {
            this.data.Items.push({ purchaseRequest: { no: "" } })
        };
    }

    get currencyLoader() {
        return CurrencyLoader;
    }

    @bindable selectedCurrency;
    selectedCurrencyChanged(newValue, oldValue) {
        if (oldValue && this.data.Items && this.data.Items.length > 0) {
            this.data.Items.splice(0, this.data.Items.length);
        }

        this.data.Currency = newValue;
        if (this.data.Currency) {
            this.options.CurrencyCode = this.data.Currency.Code;
        }
    }

    @bindable selectedSuppliantUnit;
    selectedSuppliantUnitChanged(newValue, oldValue) {
        if (oldValue && this.data.Items && this.data.Items.length > 0) {
            this.data.Items.splice(0, this.data.Items.length);
        }

        if (newValue) {
            this.data.SuppliantUnit = newValue;
            this.options.Unit = this.data.SuppliantUnit;

            this.isGarment = (this.data.SuppliantUnit.Division.Name == "GARMENT") ? true : false;
            this.options.TypePurchasing = (this.data.SuppliantUnit.Division.Name == "GARMENT") ? "GARMENT" : "";
        } else
            delete this.data.SuppliantUnit;
    }

    // get getTotalPaid() {
    //     var result = 0;
    //     console.log(this.data.Items)
    //     if (this.data.Items) {
    //         console.log(this.data.Items)
    //         // if (this.data.Items.items) {
    //         if(this.data.Items.length > 1){

    //             for (var productList of this.data.items) {
    //                 console.log(productList)
    //                 for (var proddetail of productList.details) {
    //                     console.log(proddetail.priceBeforeTax)
    //                     result += proddetail.priceBeforeTax;
    //                 }
    //             }
    //         }

    //         // }

    //     }
    //     this.data.TotalPaid = result;
    //     return result;
    // }

    get getTotalPaid() {
        var result = 0;
        if (this.data.Items) {
            for (var item of this.data.Items) {
                if (item.PurchaseOrderExternal && item.PurchaseOrderExternal.Items) {

                    for (var epoItem of item.PurchaseOrderExternal.Items) {
                        // let dealQuantity = parseFloat(proddetail.dealQuantity.toString().replace(/,/g, ""));
                        let price = epoItem.DealQuantity * epoItem.Price;
                        if (epoItem.UseVat)
                            price += price * (epoItem.VatTax.Rate/100);
                        result += price;
                    }
                }
            }
        }

        this.data.TotalPaid = result;
        return result.toLocaleString('en-EN', { minimumFractionDigits: 2 });
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`
    }

    get unitLoader() {
        return UnitLoader;
    }

    selectedTypePurchasingChanged(e) {
        let type = (e.detail) ? e.detail : "";

        if (type) {
            this.data.TypePurchasing = (type == "GARMENT") ? type : "UMUM";
            this.options.TypePurchasing = this.data.TypePurchasing;
        }
    }
}