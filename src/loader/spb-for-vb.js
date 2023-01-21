import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'unit-payment-orders/by-po-ext-ids';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("purchasing-azure");

    return endpoint.find(resource, { keyword: keyword, size: 10, poExtIds: filter.poExtIds })
        .then(results => {
            return results.data.map(unitPaymentOrder => {
                unitPaymentOrder.toString = function () {
                    return `${this.no}`;
                }
                return unitPaymentOrder;
            });
        });
}
