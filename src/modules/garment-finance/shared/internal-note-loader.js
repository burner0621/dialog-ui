import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'garment-purchasing-expeditions/internal-notes';

module.exports = function (keyword, filter, checkExist) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("purchasing-azure");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), checkExist : JSON.stringify(filter), size: 10 })
        .then(results => {
            return results.data;
        });
}
