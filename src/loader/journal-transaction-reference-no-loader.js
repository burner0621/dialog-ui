import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'journal-transactions/reference-no';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("finance");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), isVB: filter.isVB, size: 10 })
        .then(results => {
            return results.data.map((element) => {
                return { value: element };
            })
        });
}