import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'garment-external-purchase-orders/by-epo-no';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("purchasing-azure");
    return endpoint.find(resource, { keyword: keyword, supplierId: filter.supplierId, currencyCode: filter.currencyCode, paymentType: filter.paymentType, size: 10 })
        .then(results => {
            return results.data.map(purchaseOrderExternal => {
                purchaseOrderExternal.toString = function () {
                    return `${this.no}`;
                }
                return purchaseOrderExternal;
            });
        });
}