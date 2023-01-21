import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'output-warehouse/list-bon';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("packing-inventory");
    return endpoint.find(resource, { keyword: keyword })
        .then(results => {
            return results.data
        });
}
