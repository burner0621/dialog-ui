import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'article-colors';

module.exports = function (keyword, filter) {
    let config = Container.instance.get(Config);
    let endpoint = config.getEndpoint("sales");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), size: 10 })
        .then(results => {
            return results.data
        });
}