import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'vb-request-po-external';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("purchasing-azure");
    return endpoint.find(resource, { keyword: keyword, division: filter.division, currencyCode: filter.currencyCode, size: 10 })
        .then(results => {
            return results.data.map(purchaseOrderExternal => {
                purchaseOrderExternal.toString = function () {
                    return `${this.No}`;
                }
                return purchaseOrderExternal;
            });
        });
}