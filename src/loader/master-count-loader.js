import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'master-count';

module.exports = function (keyword, filter, select) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("spinning");
    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), size: 10 })
        .then(results => {
            return results.data
        });
}
