import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";
import _ from "underscore";
const resource = 'master/garment-currencies';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("core");
    var order = {
        "Date": "desc"
    };
    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), order: JSON.stringify(order), size: 10 })
        .then(results => {
            var oneResult = [];
            // if (results.data.length > 0)
            //     oneResult.push(results.data[0]);
            
            var resultGroup =_.groupBy(results.data,function(item){return item.code});
            Object.keys(resultGroup).forEach(function(k){
                oneResult.push(resultGroup[k][0]);
            });
            // return oneResult;

            return oneResult.map((currency) => {
                currency.Id = currency.Id;
                currency.Code = currency.code;
                currency.Rate = currency.rate;
                return currency;
            })
        });
}
