import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'external-purchase-orders/disposition';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("purchasing-azure");
    return endpoint.find(resource, {
        keyword: keyword,
        currencyId: filter.currencyId,
        supplierId: filter.supplierId,
        categoryId: filter.categoryId,
        divisionId: filter.divisionId,
        incomeTaxBy: filter.incomeTaxBy, size: 10
    })
        .then(results => {
            return results.data.map(purchaseOrderExternal => {
                purchaseOrderExternal.toString = function () {
                    return `${this.no}`;
                }
                return purchaseOrderExternal;
            });
        });
}