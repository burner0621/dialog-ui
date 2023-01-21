import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'garment-unit-receipt-notes';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("purchasing-azure");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), size: 10 })
        .then(results => {
            var data = results.data;
            var array = [];
            for (var a of data) {
                if (array.length <= 0) {
                    array.push(a);
                }
                else {
                    var dup = array.find(u => u.DONo == a.DONo);
                    if (!dup) {
                        array.push(a);
                    }
                }
            }
            return array;
        });
}
