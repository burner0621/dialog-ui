import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'garment-master-plan/weekly-plans';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("sales");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), size: 10 })
        .then(results => {
            var weeks = [];
            if (results.data.length > 0) {
                for (var a of results.data[0].Items) {
                    if (a.WeekNumber.toString().indexOf(keyword.toString()) >= 0)
                        weeks.push(a);
                }
            }
            return weeks;
        });
}