import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'purchasing-dispositions/memo-spb-loader';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("purchasing-azure");

    console.log(filter);

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), size: 10, currencyCode: filter.currencyCode, divisionId: filter.divisionId, supplierIsImport: filter.supplierIsImport })
        .then(results => {
            return results.data
        });
}