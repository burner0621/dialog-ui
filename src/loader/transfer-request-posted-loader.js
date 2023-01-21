import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'transfer-requests/posted';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("int-purchasing");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), size: 10 })
        .then(results => {
            return results.data.map(transferRequest => {
                transferRequest.toString = function () {
                    return `${this.TRNo}`;
                }
                return transferRequest;
            });
        });
}