import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'inventory/fp-shipment-document';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("inventory");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), size: 10 })
        .then(results => {
            return results.data.map(step => {
                step.toString = function () {
                    return `${this.name}`;
                }
                return step;
            });
        });
}