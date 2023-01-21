import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'input-packaging/production-orders';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("packing-inventory");
    return endpoint.find(resource, { bonNo: keyword })
        .then(results => {
            return results.data
        });
}
