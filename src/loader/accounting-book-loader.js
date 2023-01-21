import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'accounting-book';

module.exports = function (keyword, filter) {

  var config = Container.instance.get(Config);
  var endpoint = config.getEndpoint("finance");
  return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), select: ["id", "accountingBookType", "code", "remarks"], size: 10 })
    .then(results => {
      return results.data.map(x => {
        return {
          Id: x.Id,
          Code: x.Code,
          Type: x.AccountingBookType,
          AccountingBookType: x.AccountingBookType,
          Remarks: x.Remarks
        };
      });
    });
}