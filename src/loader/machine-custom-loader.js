import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'machine/machines';

module.exports = function ( keyword, filter) {
    
// module.exports = function (keyword,size) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("customs-report");


    // return endpoint.find(resource, {serial:serial,category:category,brand:brand,type:type  })
    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter)})
        .then(results => {
            return results.data
        });

}