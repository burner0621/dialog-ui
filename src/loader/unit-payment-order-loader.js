import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'unit-payment-orders/spb';

module.exports = function (keyword, filter) {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("purchasing-azure");
    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), size: 10 })
        .then(results => {
            return results.data.map(unitPaymentOrder => {
                unitPaymentOrder.toString = function () {
                    return `${this.no}`;
                }
                return unitPaymentOrder;
            });
        });
}