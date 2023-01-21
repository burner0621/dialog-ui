import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'preparings';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("garment-production");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), size: 10 })
        .then(results => {
            const roNoDistinct = Array.from(new Set(results.data.map(x => x.RONo))).map(roNo => {
                return {
                    RONo: roNo,
                    Article: results.data.find(o => o.RONo === roNo).Article
                };
            });
            return roNoDistinct;
        });
}
