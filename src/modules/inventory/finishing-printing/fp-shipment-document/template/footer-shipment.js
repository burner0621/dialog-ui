import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"
import numeral from 'numeral';

export class FooterShipment {
    activate(context) {
        this.context = context;
    }

    // @computedFrom("context.items.data.items.packingReceiptItems.quantity")
    get totalQuantityShipment() {
        // console.log(this.context)
        if (this.context.items.length > 0) {
            var total = this.context.items
                .map((item) => {
                    if (item.data.Items instanceof Array) {
                        var qty = item.data.Items
                            .map((detailItem) => {
                                // console.log(detailItem)
                                if (detailItem.PackingReceiptItems instanceof Array) {
                                    var quantity = detailItem.PackingReceiptItems
                                        .map((packingReceiptItem) => Number(packingReceiptItem.Quantity));
                                    return quantity
                                        .reduce((prev, curr, index) => { return prev + curr }, 0)
                                }
                                else {
                                    return 0;
                                }
                            });
                        return qty
                            .reduce((prev, curr, index) => { return prev + curr }, 0);
                    }
                    else {
                        return 0
                    }
                });
            return numeral(total
                .reduce((prev, curr, index) => { return prev + curr }, 0)).format('0,000.00');
        }
        else {
            return 0
        }
    }

    get totalLengthShipment() {
        if (this.context.items.length > 0) {
            var total = this.context.items
                .map((item) => {
                    if (item.data.Items instanceof Array) {
                        var qty = item.data.Items
                            .map((detailItem) => {
                                if (detailItem.PackingReceiptItems instanceof Array) {
                                    var quantity = detailItem.PackingReceiptItems
                                        .map((packingReceiptItem) => Number(packingReceiptItem.Quantity) * Number(packingReceiptItem.Length));
                                    return quantity
                                        .reduce((prev, curr, index) => { return prev + curr }, 0)
                                }
                                else {
                                    return 0;
                                }
                            });
                        return qty
                            .reduce((prev, curr, index) => { return prev + curr }, 0);
                    }
                    else {
                        return 0
                    }
                });
            return numeral(total
                .reduce((prev, curr, index) => { return prev + curr }, 0)).format('0,000.00');
        }
        else {
            return 0
        }
    }

    get totalWeightShipment() {
        if (this.context.items.length > 0) {
            var total = this.context.items
                .map((item) => {
                    if (item.data.Items instanceof Array) {
                        var qty = item.data.Items
                            .map((detailItem) => {
                                if (detailItem.PackingReceiptItems instanceof Array) {
                                    var quantity = detailItem.PackingReceiptItems
                                        .map((packingReceiptItem) => Number(packingReceiptItem.Quantity) * Number(packingReceiptItem.Weight));
                                    return quantity
                                        .reduce((prev, curr, index) => { return prev + curr }, 0)
                                }
                                else {
                                    return 0;
                                }
                            });
                        return qty
                            .reduce((prev, curr, index) => { return prev + curr }, 0);
                    }
                    else {
                        return 0
                    }
                });
            return numeral(total
                .reduce((prev, curr, index) => { return prev + curr }, 0)).format('0,000.00');
        }
        else {
            return 0
        }
    }
}