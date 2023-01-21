import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'master/suppliers';

module.exports = function(keyword, filter, select) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("core-azure");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), select: select })
        .then(results => {
            return results.data.map(supplier => {
                supplier.toString = function () {
                    return [this.code, this.name]
                        .filter((item, index) => {
                            return item && item.toString().trim().length > 0;
                        }).join(" - ");
                }
                return supplier;
            })
        });
}