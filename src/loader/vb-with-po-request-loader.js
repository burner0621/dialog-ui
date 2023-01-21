import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'vb-with-po-request';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("finance");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), size: 10 })
        .then(results => {
            return results.data
        });

}