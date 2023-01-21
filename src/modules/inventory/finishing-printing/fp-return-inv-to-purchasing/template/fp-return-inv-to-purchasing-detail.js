import { inject, bindable } from 'aurelia-framework';
import { Service } from '../service';
const FPRegradingResultDocsLoader = require('../../../../../loader/fp-regrading-result-docs-loader');

@inject(Service)
export class FPReturnInvToPurchasingDetail {
    @bindable fpRegradingResultDocs;

    constructor(service) {
        this.service = service;
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;

        if (this.data.FPRegradingResultDocsCode)
            this.fpRegradingResultDocs = { Code: this.data.FPRegradingResultDocsCode };
    }

    fpRegradingResultDocsChanged(newValue, oldValue) {
        if (newValue) {
            this.service.getFPReturnProInvDocs(newValue.Id)
                .then(result => {
                    this.data.FPRegradingResultDocsId = result.Id;
                    this.data.FPRegradingResultDocsCode = result.Code;
                    this.data.Product = {
                        _id: result.Product.Id,
                        code: result.Product.Code,
                        name: result.Product.Name
                    };

                    let TotalQuantity = 0, TotalLength = 0;
                    let Details = result.Details.filter(p => p.Retur == "Ya");

                    for (let detail of Details) {
                        TotalQuantity += detail.Quantity;
                        TotalLength += detail.Length;
                    }

                    this.data.Quantity = TotalQuantity;
                    this.data.Length = TotalLength;
                });
        }
        else {
            this.data = {};
        }
    }

    get fpRegradingResultDocsLoader() {
        return function (keyword, filter) {
            return FPRegradingResultDocsLoader(keyword, filter)
                .then(data => {
                    let loaderData = [];

                    for (let d of data) {
                        if (d.IsReturnedToPurchasing === false && d.Details.filter(p => p.Retur == "Ya").length > 0)
                            loaderData.push(d);
                    }

                    return loaderData;
                });
        }
    }
}