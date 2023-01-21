import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'garment-unit-expenditure-notes/custom-loader';

module.exports = function (keyword, filter) {

    console.log("filter custom",filter);
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("purchasing-azure");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) ,conditionType:0})
        .then(results => {
            return results.data;
        });
}