import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'customs-reports/traceable/master';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("customs-report");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), size: 10 })
        .then(results => {
            return results.data.map(item => {
                item.toString = function () {
                    return `${this.ItemCode}`;
                }
                return item;
            });
        });
}