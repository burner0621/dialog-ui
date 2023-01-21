import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'master/products';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("core-azure");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), order: JSON.stringify({ "name": "asc" }) })
        .then(results => {
            return results.data;
        });
}