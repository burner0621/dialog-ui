import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'inventory/fp-retur-fr-byr-docs';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("inventory");
    var filterName = {
        "isVoid": false,
        "code": {
            '$regex': keyword,
            '$options': 'i'
        }
    }
    var _filter = { "$and": [filter ? filter : {}, filterName] };
    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(_filter), size: 10 })
        .then(results => {
            return results.data;
        });

}