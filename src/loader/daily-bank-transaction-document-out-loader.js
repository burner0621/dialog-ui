import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'daily-bank-transactions/loader';

module.exports = function (keyword, filter) {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("finance");
    var filterIn = { Status: "OUT" };
    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filterIn), size: 10 })
        .then(results => {
            return results.data
        });
}