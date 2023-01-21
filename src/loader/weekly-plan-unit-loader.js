import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'garment-master-plan/weekly-plans';

module.exports = function (keyword, filter, select) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("sales");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), select: select, size: 10 })
        .then(results => {
            var list = results.data.map(d => d.Unit);
            var unit = [];
            for (var data of list) {
                if (unit.length == 0) {
                    unit.push(data);
                }
                else {
                    var dup = unit.find(a => a.Code == data.Code);
                    if (!dup) {
                        unit.push(data);
                    }
                }
            }
            return unit;
        });
}