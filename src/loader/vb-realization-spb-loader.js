import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'vb-request-po-external/spb';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("purchasing-azure");
    return endpoint.find(resource, { keyword: keyword, division: filter.division, epoIds: JSON.stringify(filter.epoIds), currencyCode: filter.currencyCode, typePurchasing: filter.typePurchasing, size: 10 })
        .then(results => {
            return results.data.map(result => {
                result.toString = function () {
                    return `${this.No}`;
                }
                return result;
            });
        });
}