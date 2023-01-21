import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'garment-disposition-purchase/loader';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("purchasing-azure");

    return endpoint.find(resource, { keyword: keyword ,position: filter.Position, size: 10 })
        .then(results => {
            return results.data;
        });
}