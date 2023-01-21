import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'garment-external-purchase-orders/by-epo-no-str';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("purchasing-azure");
    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), size: 10, supplierId: filter.supplierId, currencyCode: filter.currencyCode, paymentType: filter.paymentType, category: filter.category })
        .then(results => {
            return results.data.map(purchaseOrderExternal => {
                purchaseOrderExternal.toString = function () {
                    return `${this.no}`;
                }
                return purchaseOrderExternal;
            });
        });
}
