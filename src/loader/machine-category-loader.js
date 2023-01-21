import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'machine/category';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("customs-report");

    return endpoint.find(resource, {size: 10, keyword: keyword,  })
        .then(results => {
            return results.data
        });

}