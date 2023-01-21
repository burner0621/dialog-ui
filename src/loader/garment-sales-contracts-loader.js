import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'merchandiser/garment-sales-contracts';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("sales");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
        .then(results => {
            return results.data;
        });
}