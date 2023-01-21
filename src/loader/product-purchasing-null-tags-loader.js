import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'master/products/null-tags';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("core");
    
    // if (!filter) {
    //     filter = {};
    // }
    // Object.assign(filter, { "Tags.StartsWith(\"sales contract\")": false } )
    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), size: 10 })
        .then(results => {
            return results.data.map(product => {
                product.toString = function () {
                    return [this.Code, this.Name]
                        .filter((item, index) => {
                            return item && item.toString().trim().length > 0;
                        }).join(" - ");
                }
                return product;
            })
        });
}