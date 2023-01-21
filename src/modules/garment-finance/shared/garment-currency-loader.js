import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";
import { result } from 'underscore';

const resource = 'master/garment-currencies';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("core");
    var order = {
        "Date": "desc"
    };
    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), order: JSON.stringify(order), size: 10 })
        .then(results => {
            return results.data.map((currency) => {
                currency.Id = currency.Id;
                currency.Code = currency.code;
                currency.Rate = currency.rate;
                return currency;
            })
        });
}
