import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'machine-spinnings';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("core");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), size: 10 })
        .then(results => {
            return results.data.map((v) => (v.Name))
                .filter((v, i, a) => a.indexOf(v) === i)
                .sort()
                .map((v) => ({ Name: v }));
        });
}