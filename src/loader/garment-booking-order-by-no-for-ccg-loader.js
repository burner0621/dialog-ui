import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'sales/garment-booking-orders/read-by-no-for-ccg';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("sales");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), size: 100 })
        .then(results => {
            return results.data
        });
}