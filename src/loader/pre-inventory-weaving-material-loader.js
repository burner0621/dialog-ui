import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'output-inventory-weaving/material-loader';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("inventory-azure");
    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), size: 10 })
        .then(results => {
            console.log(results);
            return results.Data


        });
}
