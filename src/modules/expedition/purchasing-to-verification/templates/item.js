import { bindable, inject } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
import { Service } from '../service';
const UnitPaymentOrderLoader = require('../../../../loader/unit-payment-orders-for-verification-loader');

@inject(Service)
export class Item {
    @bindable unitPaymentOrder;

    constructor(service) {
        this.service = service;
        // this.queryUPO = { Position: 6}; // PURCHASING_DIVISION
        // this.selectUPO = [
        //     'invoceNo', 'division.code', 'division.name',
        //     'supplier.code', 'supplier.name',
        //     'currency.code', 'no', 'date', 'dueDate',
        //     'useVat', 'useIncomeTax', 'vat._id', 'vat.name', 'vat.rate',
        //     'items.unitReceiptNote.date',
        //     'items.unitReceiptNote.items.product._id',
        //     'items.unitReceiptNote.items.product.code',
        //     'items.unitReceiptNote.items.product.name',
        //     'items.unitReceiptNote.items.deliveredQuantity',
        //     'items.unitReceiptNote.items.deliveredUom.unit',
        //     'items.unitReceiptNote.items.pricePerDealUnit',
        //     'items.unitReceiptNote.items.purchaseOrder.purchaseOrderExternal.no',
        //     'items.unitReceiptNote.no',
        //     'items.unitReceiptNote.items.correction',
        // ];

        this.columns = ['Unit', 'Nama Barang', 'Jumlah', 'UOM', 'Harga'];
    }

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.isShowing = false;

        if (this.data.no)
            this.unitPaymentOrder = { no: this.data.no };
    }

    unitPaymentOrderChanged(newV, oldV) {
        if (newV) {
            let items = [],
                totalPaid = 0;

            let unitReceiptsNo = newV.items.map(p => p.unitReceiptNote.no);

            let filter = {
                urnNoList: unitReceiptsNo,
                // size: Number.MAX_SAFE_INTEGER,
                // filter: JSON.stringify({ no: { $in: unitReceiptsNo } }),
                // select: ['no', 'unit._id', 'unit.code', 'unit.name']
            };

            this.service.getCorrectionState(newV._id)
                .then((correctionStateResponse) => {
                    let correctionState = correctionStateResponse.data ? correctionStateResponse.data : {};
                    console.log(correctionState);
                    return this.service.getURN(filter)
                        .then((response) => {
                            let urn = response.data;
                            for (let item of newV.items) {
                                let urnObj = urn.find(p => p.no === item.unitReceiptNote.no);
                                // let upoItem = newV.items.find(item => item.unitReceiptNote.no === urnObj.no);

                                // console.log(urnObj);
                                // console.log(item);

                                for (let detail of item.unitReceiptNote.items) {
                                    let corrections = detail.correction;
                                    let price, quantity;

                                    // let upoDetail = item.unitReceiptNote.items.find((item => item.URNItemId === urnObj.))
                                    


                                    // if (corrections && corrections.length !== 0) {
                                    //     if (corrections[corrections.length - 1].correctionRemark === 'Koreksi Jumlah') {
                                    //         let pricePerUnit = corrections[corrections.length - 1].correctionPricePerUnit;
                                    //         let correctionQuantity = detail.deliveredQuantity;

                                    //         for (let correction of corrections.filter(p => p.correctionRemark === 'Koreksi Jumlah')) {
                                    //             correctionQuantity -= correction.correctionQuantity;
                                    //         }

                                    //         price = pricePerUnit * correctionQuantity;
                                    //         quantity = correctionQuantity;
                                    //     }
                                    //     else {
                                    //         price = corrections[corrections.length - 1].correctionPriceTotal;
                                    //         quantity = corrections[corrections.length - 1].correctionQuantity;
                                    //     }
                                    // }
                                    // else {

                                      let correctQuantity = detail.deliveredQuantity;
                                      if (correctionState.IsHavingQuantityCorrection) {
                                          correctQuantity = detail.QuantityCorrection;
                                      }
  
                                      let correctPricePerUnit = Number((detail.pricePerDealUnit).toFixed(4));
                                      if (correctionState.IsHavingPricePerUnitCorrection) {
                                          correctPricePerUnit = Number((detail.PricePerDealUnitCorrection).toFixed(4));
                                      }
  
                                      let correctPriceTotal = Number((correctQuantity * correctPricePerUnit).toFixed(4));
                                      if (correctionState.IsHavingPriceTotalCorrection) {
                                          correctPriceTotal = Number((detail.PriceTotalCorrection).toFixed(4));
                                      }

                                    // if (detail.QuantityCorrection > 0)
                                    //     quantity = detail.QuantityCorrection;
                                    // else
                                    //     quantity = detail.deliveredQuantity;

                                    // if (detail.PriceTotalCorrection > 0)
                                    //     price = Number((detail.PriceTotalCorrection).toFixed(2));
                                    // else if (detail.PricePerDealUnitCorrection > 0)
                                    //     price = Number((detail.PricePerDealUnitCorrection * quantity).toFixed(2));
                                    // else
                                    //     price = Number((detail.pricePerDealUnit * quantity).toFixed(2));
                                    // quantity = detail.deliveredQuantity;
                                    // }

                                    items.push({
                                        productId: detail.product._id,
                                        productCode: detail.product.code,
                                        productName: detail.product.name,
                                        quantity: correctQuantity,
                                        uom: detail.deliveredUom.unit,
                                        price: correctPriceTotal,
                                        unitId: urnObj.unit._id,
                                        unitCode: urnObj.unit.code,
                                        unitName: urnObj.unit.name,
                                        urnNo: urnObj.no,
                                        urnId: urnObj.UId
                                    });

                                    totalPaid += correctPriceTotal;
                                }
                            }

                            // console.log(newV)
                            // console.log(totalPaid);
                            let vat = newV.useVat ? Number((totalPaid * (newV.vatTax.rate/100)).toFixed(4)) : 0;
                            let incomeTax = newV.useIncomeTax ? Number(((newV.incomeTax.rate * totalPaid) / 100).toFixed(4)) : 0;
                            let income = newV.useIncomeTax ? newV.incomeTax : null;

                            console.log(newV.useVat);
                            if (newV.useVat)
                            {
                                totalPaid += vat;
                            }

                            // if (newV.incomeTaxBy && newV.incomeTaxBy.toUpperCase() == "SUPPLIER")
                            // totalPaid = Number((totalPaid + vat).toFixed(2))
                            // console.log(vat);
                            Object.assign(this.data, {
                                id: newV._id,
                                no: newV.no,
                                date: newV.date,
                                dueDate: newV.dueDate,
                                invoiceNo: newV.invoiceNo,
                                supplierCode: newV.supplier.code,
                                supplierName: newV.supplier.name,
                                divisionCode: newV.division.code,
                                divisionName: newV.division.name,
                                incomeTax: incomeTax,
                                vat: vat,
                                category: newV.category,
                                paymentMethod: newV.paymentMethod,
                                totalPaid: totalPaid,
                                currency: newV.currency.code,
                                items: items,
                                useIncomeTax: newV.useIncomeTax,
                                useVat: newV.useVat,
                                incomeTaxBy: newV.incomeTaxBy
                            });
                            if (newV.useIncomeTax) {
                                this.data.incomeTaxId = newV.incomeTax._id;
                                this.data.incomeTaxName = newV.incomeTax.name;
                                this.data.incomeTaxRate = newV.incomeTax.rate;
                            }
                        });
                })


        } else {
            Object.assign(this.data, {
                id: undefined,
                no: undefined,
                date: undefined,
                dueDate: undefined,
                invoceNo: undefined,
                supplierCode: undefined,
                supplierName: undefined,
                divisionCode: undefined,
                divisionName: undefined,
                incomeTax: undefined,
                vat: undefined,
                incomeTaxId: undefined,
                incomeTaxName: undefined,
                incomeTaxRate: undefined,
                incomeTaxBy: undefined,
                totalPaid: undefined,
                currency: undefined,
                category: undefined,
                details: [],
            });
        }
    }

    toggle() {
        this.isShowing = !this.isShowing;
    }

    onRemove() {
        this.bind();
    }

    get unitPaymentOrderLoader() {
        return UnitPaymentOrderLoader;
    }
}
